const { contextBridge, ipcRenderer } = require('electron')

// API exposée de façon sécurisée au renderer (index.html).
// Le renderer n'a jamais accès direct à `fs` ou `require` : il passe
// uniquement par ces fonctions, qui elles-mêmes déclenchent un IPC
// vers le main process (seul endroit où fs est utilisé).
contextBridge.exposeInMainWorld('electronAPISupport', {
  saveSupportFile: (content, defaultName) =>
    ipcRenderer.invoke('save-support-file', content, defaultName)
});

contextBridge.exposeInMainWorld('electronAPIXMLHistoricImportExport', {
  transformHistoric: (content, xmlToJson) =>
    ipcRenderer.invoke('transform-historic', content, xmlToJson)
});

contextBridge.exposeInMainWorld('electronAPISaveHistoricalFile', {
  saveHistoricFile: (content) =>
    ipcRenderer.invoke('save-historic-file', content)
});

contextBridge.exposeInMainWorld('appInfo', {
  isElectron: true
})
