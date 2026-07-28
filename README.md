# AnyERP Tools (Electron)

Application de bureau Electron générée à partir du fichier `AnyERPTools.html`.

## Structure du projet

```
AnyERPTools-electron/
├── package.json     # Configuration du projet et dépendances
├── main.js          # Processus principal Electron (création de la fenêtre, menu)
├── preload.js        # Script preload (isolation de contexte sécurisée)
├── index.html         # Votre interface d'origine (inchangée)
└── .gitignore
```

## Installation

Prérequis : [Node.js](https://nodejs.org/) installé.

```bash
cd AnyERPTools-electron
npm install
```

## Lancer l'application en développement

```bash
npm start
```

## Générer un exécutable (Windows / macOS / Linux)

```bash
npm run dist
```

Le résultat sera disponible dans le dossier `dist/`.

## Notes

- L'interface (`index.html`) charge Bootstrap, jQuery et Toastr depuis des CDN externes (jsdelivr / cloudflare). Une connexion internet est donc nécessaire au lancement. Si vous souhaitez une application 100% hors-ligne, il faudra télécharger ces librairies et les référencer en local dans `index.html`.
- Aucune fonctionnalité de sauvegarde sur disque n'était présente dans le fichier HTML d'origine (l'outil utilise uniquement le presse-papier et la lecture de fichiers via `FileReader`), donc le `preload.js` n'expose rien de plus pour l'instant. Il est prêt à être étendu si vous souhaitez par exemple ajouter un bouton "Enregistrer le code généré dans un fichier".
