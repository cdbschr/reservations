# Application de reservation de bureaux
## Description
Actuellement en phase de développement, cette application permettra de réserver un bureau dans un de nos locaux. 
Pour l'instant en version mobile.

Pourquoi avoir utilisé Supabase au lieu de faire un back en NodeJS ?
- Par manque de temps, je n'avais que 5 jours pour faire une application fonctionnelle
- Pour tester cette technologie
- Pour avoir un back en moins à gérer (authentification, base de données, etc.)

## Fonctionnalités
- [x] Authentification :
   - [x] Connexion
   - [x] Déconnexion
- [x] Récupération des bureaux :
   - [x] Tous les bureaux non réservés
   - [x] Un bureau non réservé
- [x] Récupération des réservations :
   - [x] Toutes les réservations de l'utilisateur connecté classé par date
- [x] Création d'une réservation
- [x] Suppression d'une réservation

## Fonctionnalités à venir
- [ ] Création d'un compte
- [ ] Modification du compte
- [ ] Mot de passe oublié
- [ ] Modification d'une réservation
- [ ] Récupération des réservations d'un utilisateur
- [ ] Récupération des bureaux d'un utilisateur

## Stack technique
- Pnpm
- VueJS
- TailwindCSS
- Typescript
- Pinia
- Supabase
- Docker

## Installation
### Front
- Cloner le projet
```sh
git clone 
```
- Installer les dépendances
```sh
pnpm i
```

### Back
Préalable : avoir installé Docker sur sa machine

- Lancer le shell d'installation de Supabase en local
```sh
chmod +x setup_supabase.sh
```

- Pour accéder au front de supabase
```md
[http://localhost:8000](http://localhost:8000)
```

- Les logins à l'installation :
```js
{
   username: 'supabase'
   password: 'this_password_is_insecure_and_should_be_updated'
}
```

## Lancer le projet
- Copier le fichier .env.example et le renommer en .env
- Compléter les variables d'environnement

- Lancer le projet
```sh
pnpm dev
```
