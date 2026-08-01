const { app, BrowserWindow, Menu, shell, dialog, ipcMain } = require('electron')
const path = require('path')
const fs = require('fs')
const { spawn } = require('child_process')
const json2xml = require('json2xml');
const parseString = require('xml2js').parseString;

let mainWindow = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 850,
    minWidth: 800,
    minHeight: 600,
    title: "Boite d'outils AnyERP",
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false
    },
    autoHideMenuBar: true
  })

  mainWindow.loadFile('index.html');

  // Décommenter la ligne suivante pour ouvrir les DevTools au démarrage
  // mainWindow.webContents.openDevTools()

  // Ouvre les liens externes (http/https) dans le navigateur par défaut
  // plutôt que dans une nouvelle fenêtre Electron
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      shell.openExternal(url)
    }
    return { action: 'deny' }
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

function createMenu() {
  const template = [
    {
      label: 'Fichier',
      submenu: [
        { role: 'reload', label: 'Recharger' },
        { role: 'toggleDevTools', label: 'Outils de développement' },
        { type: 'separator' },
        { role: 'quit', label: 'Quitter' }
      ]
    },
    {
      label: 'Édition',
      submenu: [
        { role: 'undo', label: 'Annuler' },
        { role: 'redo', label: 'Rétablir' },
        { type: 'separator' },
        { role: 'cut', label: 'Couper' },
        { role: 'copy', label: 'Copier' },
        { role: 'paste', label: 'Coller' },
        { role: 'selectAll', label: 'Tout sélectionner' }
      ]
    },
    {
      label: 'Affichage',
      submenu: [
        { role: 'resetZoom', label: 'Zoom réel' },
        { role: 'zoomIn', label: 'Zoom avant' },
        { role: 'zoomOut', label: 'Zoom arrière' },
        { type: 'separator' },
        { role: 'togglefullscreen', label: 'Plein écran' }
      ]
    }
  ]

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}

// Reçoit le contenu depuis le renderer (via preload.js), propose une boîte
// de dialogue "Enregistrer sous...", puis écrit le fichier sur le disque.
ipcMain.handle('save-support-file', async (event, content, defaultName) => {
  const win = BrowserWindow.fromWebContents(event.sender)

  const { canceled, filePath } = await dialog.showSaveDialog(win, {
    title: 'Enregistrer le fichier de support',
    defaultPath: defaultName || 'support.txt',
    filters: [
	  { name: 'Fichiers xml', extensions: ['xml'] },
      { name: 'Fichiers texte', extensions: ['txt'] },
      { name: 'Tous les fichiers', extensions: ['*'] }
    ]
  });

  if (canceled || !filePath) {
    return { success: false, canceled: true }
  }

  try {
    await fs.promises.writeFile(filePath, content, 'utf-8')
    return { success: true, filePath }
  } catch (err) {
    return { success: false, error: err.message }
  }
});

ipcMain.handle('transform-historic', async (event, content, xmlToJson) => {
  let json = null;
  
  if (xmlToJson) {
    parseString(content, (err, result) => {
      if (!err) json = result;
      if (err) console.log("erreur : ", err);
    });
  } else json = {finalContent: json2xml(content)};

  return {
    isOk: json != null,
    json
  };
});

ipcMain.handle('save-historic-file', async (event, datas) => {
  const win = BrowserWindow.fromWebContents(event.sender);

  const { canceled, filePath } = await dialog.showSaveDialog(win, {
    title: 'Enregistrer le fichier d\'historique',
    defaultPath: 'historic.xml',
    filters: [
	  { name: 'Fichiers xml', extensions: ['xml'] },
      { name: 'Fichiers texte', extensions: ['txt'] },
      { name: 'Tous les fichiers', extensions: ['*'] }
    ]
  });

  if (canceled || !filePath) {
    return { success: false, canceled: true }
  }

  try {
    await fs.promises.writeFile(filePath, datas.json.finalContent, 'utf-8')
    return { success: true, filePath }
  } catch (err) {
    return { success: false, error: err.message }
  }
});

ipcMain.handle('launch-ubl-inspector', async (event, filePath) => {
  const child = spawn("py", ["../other_scripts/valider_ubl_1.1.py", filePath]);
  let stderr = "";
  let stdout = "";

  child.stderr.on("data", (data) => {
    stderr += data.toString();
    console.error(`Python stderr:\n${data.toString()}`);
  });

  child.stdout.on("data", (data) => {
    stdout += data.toString();
    console.log(`Python stdout:\n${data.toString()}`);
  });

  child.on("error", (err) => {
    console.error(`Erreur de lancement: ${err.message}`);
  });

  child.on("close", (code) => {
    if (code !== 0) {
      console.error(`Python a échoué avec le code ${code}`);
      console.error("Stacktrace Python :\n" + stderr);
    }
  });
});

app.whenReady().then(() => {
  createMenu()
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
