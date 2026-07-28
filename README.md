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
└── test
    └── package.json
    └── main.js
    └── preload.js
    └── index.html
```

## Installation

Prérequis : [Node.js](https://nodejs.org/) installé en version portable.
Système Windows uniquement

## Lancer l'application en développement

```bash
npm start
```

## Lancer l'application

Il existe deux fichiers batch pour lancer le projet.
run.bat pour lancer l'application sans être en test
runTest.bat pour lancer l'application en test

## Notes

Il est impératif de travailler dans le dossier test avant de faire un copier coller du fichier index.html dans le dossier parent
