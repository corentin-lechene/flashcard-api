# FlashCard api

L’application se basera sur le fonctionnement du système de Leitner en mettant en place les principes de “répétition
espacée” et ”d’auto-évaluation”.

## Installation

### Prérequis

- Node.js
- npm

### Étapes d'installation

1. Clonez ce dépôt:
   ```bash
   git clone https://github.com/corentin-lechene/flashcard-api.git
   ```
2. Installez les dépendances:
   ```bash
    cd .\flashcard-api\
    npm install
    ```
3. Créez un fichier `.env` à la racine du projet et ajoutez les variables d'environnement suivantes:
    ```env
   # default : 8080
   PORT=8080

   # default : http://localhost:5173
   CLIENT_URL=http://localhost:5173
   ```

4. Lancez le serveur:
    ```bash
    npm run dev
    ```

5. Pour tester si l'api fonctionne, taper dans votre navigateur:
    ```bash
    http://localhost:8080/ping
    ```
   Si "pong" s'affiche, l'api fonctionne.

## Tests

Pour lancer les tests, exécutez la commande suivante:

```bash
npm test
```

Voir le coverage 
```bash
npm test:coverage
```
