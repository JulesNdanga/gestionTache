
# Projet de Gestion de Tâches

Ce projet est une application de gestion de tâches simple où les utilisateurs peuvent s'inscrire, se connecter, créer, éditer et supprimer des tâches. L'application utilise Laravel pour le backend et React.js pour le frontend.

## Table des Matières

- [Technologies Utilisées](#technologies-utilisées)
- [Prérequis](#prérequis)
- [Installation](#installation)
  - [Installation Backend](#installation-backend)
  - [Installation Frontend](#installation-frontend)
- [Configuration](#configuration)
  - [Configuration Backend](#configuration-backend)
  - [Configuration Frontend](#configuration-frontend)
- [Utilisation](#utilisation)
- [API Endpoints](#api-endpoints)
- [Tests](#tests)
  - [Tests Backend](#tests-backend)
  - [Tests Frontend](#tests-frontend)
- [Conclusion](#conclusion)

## Technologies Utilisées

- **Backend** : Laravel
- **Frontend** : React.js
- **Base de données** : MySQL
- **Authentification** : Laravel Sanctum
- **State Management** : React Context API

## Prérequis

- PHP 7.4+
- Composer
- Node.js 14+
- NPM ou Yarn
- MySQL

## Installation

### Installation Backend

1. Clonez le dépôt backend :
   ```bash
   git clone <votre-repo-backend-url>
   cd <votre-repo-backend>
   ```

2. Installez les dépendances :
   ```bash
   composer install
   ```

3. Créez une copie du fichier `.env.example` et renommez-la `.env` :
   ```bash
   cp .env.example .env
   ```

4. Générez une clé d'application Laravel :
   ```bash
   php artisan key:generate
   ```

5. Configurez votre fichier `.env` avec les informations de votre base de données MySQL et d'autres configurations nécessaires :
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=nom_de_votre_base_de_donnees
   DB_USERNAME=votre_nom_d_utilisateur
   DB_PASSWORD=votre_mot_de_passe
   ```

6. Exécutez les migrations pour créer les tables dans votre base de données :
   ```bash
   php artisan migrate
   ```

7. Installez Laravel Sanctum :
   ```bash
   php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
   php artisan migrate
   ```

8. Démarrez le serveur Laravel :
   ```bash
   php artisan serve
   ```

### Installation Frontend

1. Clonez le dépôt frontend :
   ```bash
   git clone <votre-repo-frontend-url>
   cd <votre-repo-frontend>
   ```

2. Installez les dépendances :
   ```bash
   npm install
   # ou
   yarn install
   ```

3. Démarrez l'application React :
   ```bash
   npm start
   # ou
   yarn start
   ```

## Configuration

### Configuration Backend

1. Configurez Laravel Sanctum dans le fichier `config/sanctum.php` :
   ```php
   'stateful' => explode(',', env('SANCTUM_STATEFUL_DOMAINS', 'localhost,localhost:3000')),
   ```

2. Ajoutez le middleware Sanctum dans `app/Http/Kernel.php` :
   ```php
   protected $middlewareGroups = [
       'api' => [
           \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
           'throttle:api',
           \Illuminate\Routing\Middleware\SubstituteBindings::class,
       ],
   ];
   ```

### Configuration Frontend

1. Configurez les variables d'environnement dans un fichier `.env` à la racine du projet React :
   ```env
   REACT_APP_API_URL=http://localhost:8000/api
   ```

## Utilisation

- Visitez `http://localhost:3000` pour accéder à l'application frontend.
- Utilisez les routes d'authentification pour vous inscrire et vous connecter.
- Gérer vos tâches depuis l'interface utilisateur.

## API Endpoints

### Authentification

- **POST** `/api/register` : Inscription d'un nouvel utilisateur.
- **POST** `/api/login` : Connexion d'un utilisateur.
- **POST** `/api/logout` : Déconnexion de l'utilisateur.

### Tâches

- **GET** `/api/tasks` : Récupérer les tâches de l'utilisateur connecté.
- **POST** `/api/tasks` : Créer une nouvelle tâche.
- **PUT** `/api/tasks/{id}` : Mettre à jour une tâche existante.
- **DELETE** `/api/tasks/{id}` : Supprimer une tâche.

## Tests

### Tests Backend

Pour exécuter les tests backend avec PHPUnit :

```bash
php artisan test
```

Exemples de tests dans `tests/Feature/AuthTest.php` et `tests/Feature/TaskTest.php`.

### Tests Frontend

Pour exécuter les tests frontend avec Jest :

```bash
npm test
# ou
yarn test
```

Exemple de test dans `src/components/__tests__/Register.test.js`.
