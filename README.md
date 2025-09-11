# Système de Sondage - Styles d'Agents Immobiliers

## 🌐 Visualisation en ligne
**Accédez directement au sondage :** [https://realtoria-club.github.io/styles-agents-immobiliers/](https://realtoria-club.github.io/styles-agents-immobiliers/)

## Description
Système de sondage autonome pour analyser les préférences des clients concernant les différents styles d'agents immobiliers. Interface web moderne et responsive avec stockage local des données et fiches de style détaillées.

## Fonctionnalités

### Sondage Interactif
- Interface multi-étapes avec barre de progression
- Validation des réponses en temps réel
- Design moderne et responsive
- Animation fluide entre les sections
- 4 sections complètes d'analyse comportementale

### Fiches de Style Détaillées
- **4 fiches professionnelles** pour chaque profil d'agent
- **Design cohérent** avec couleurs spécifiques par style
- **Navigation intuitive** entre les fiches
- **Format professionnel** adapté à la formation et au coaching
- **Accès direct** depuis le sondage principal

### Analyse des Données
- Calcul automatique du style dominant
- Génération de profils personnalisés avec conseils
- Export PDF des résultats individuels
- Stockage local automatique des réponses
- Visualisation des scores par style

### Gestion des Données
- Export des résultats en format PDF
- Sauvegarde automatique dans le navigateur
- Possibilité de réinitialiser le sondage
- Données persistantes entre les sessions

## Structure du Projet

```
Sondage-Agents-Immobiliers/
├── index.html              # Interface principale du sondage
├── styles.css              # Styles du sondage principal
├── script.js               # Logique JavaScript du sondage
├── fiches-index.html       # Page d'accueil des fiches
├── fiche-styles.css        # Styles dédiés aux fiches
├── fiche-sniper.html       # Fiche détaillée Le Sniper
├── fiche-observateur.html  # Fiche détaillée L'Observateur
├── fiche-constructeur.html # Fiche détaillée Le Constructeur
├── fiche-attentiste.html   # Fiche détaillée L'Attentiste
├── deploy-guide.md         # Guide de déploiement
└── README.md               # Documentation
```

## Les 4 Styles d'Agents

### Le Sniper - "Cible et conquiert"
- **Couleur** : Rouge
- **Profil** : Agent audacieux et déterminé
- **Forces** : Décisif, focalisé, sens du résultat
- **Applications** : Prospection ciblée, mandats qualifiés

### L'Observateur - "Écoute et comprend"
- **Couleur** : Violet
- **Profil** : Agent empathique et réfléchi
- **Forces** : Écoute exceptionnelle, empathie naturelle
- **Applications** : Analyse approfondie, relation client

### Le Constructeur - "Bâtit et structure"
- **Couleur** : Gris foncé
- **Profil** : Agent méthodique et organisé
- **Forces** : Organisation exemplaire, méthode éprouvée
- **Applications** : Planning structuré, relations durables

### L'Attentiste - "Observe et patiente"
- **Couleur** : Orange
- **Profil** : Agent stratégique et patient
- **Forces** : Analyse stratégique, patience et persévérance
- **Applications** : Réflexion stratégique, relations de confiance

## Utilisation

### Démarrage
1. Ouvrir `index.html` dans un navigateur web
2. Le sondage se lance automatiquement
3. Accéder aux fiches via le bouton " Voir les fiches détaillées"

### Navigation
- **Sondage principal** : Navigation entre 4 sections d'analyse
- **Fiches détaillées** : Accès via `fiches-index.html`
- **Validation** : Vérification automatique des réponses requises
- **Résultats** : Profil personnalisé avec conseils spécifiques

### Consultation des Résultats
- **Profil personnalisé** : Style dominant avec description complète
- **Conseils pratiques** : Recommandations spécifiques au profil
- **Export PDF** : Téléchargement du profil complet
- **Fiches de référence** : Consultation des 4 styles détaillés

## Sections du Sondage

### 1. Approche Commerciale
- Stratégies de prospection
- Gestion des mandats

### 2. Organisation et Méthodes
- Organisation quotidienne
- Valorisation des biens

### 3. Négociation et Closing
- Style de négociation
- Techniques de closing

### 4. Résultats et Performance
- Approche des résultats
- Forces principales

## Fiches de Style

Chaque fiche contient :
- **Header coloré** avec emoji et titre du style
- **Résumé** du profil d'agent
- **Points forts naturels** spécifiques
- **Axes de vigilance** à développer
- **Applications concrètes** dans le métier immobilier
- **Citation inspirante** du style

## Données Exportées

Le profil PDF contient :
- **Style dominant** avec description
- **Forces principales** détaillées
- **Axes de progression** personnalisés
- **Conseil pratique** spécifique
- **Citation** du style
- **Date de génération**

## Déploiement

### GitHub Pages (Recommandé)
1. Créer un repository GitHub
2. Uploader tous les fichiers
3. Activer GitHub Pages dans les paramètres
4. Site accessible via `https://username.github.io/repository-name`

Voir `deploy-guide.md` pour les instructions détaillées.

## Compatibilité
- Tous navigateurs modernes (Chrome, Firefox, Safari, Edge)
- Responsive design pour mobile et desktop
- Stockage local HTML5 (localStorage)
- Export PDF avec jsPDF

## Sécurité et Confidentialité
- Aucune donnée envoyée vers des serveurs externes
- Stockage local uniquement dans le navigateur
- Possibilité de supprimer les données à tout moment

---

**Système complet de sondage et de fiches professionnelles pour l'analyse des styles d'agents immobiliers !**
