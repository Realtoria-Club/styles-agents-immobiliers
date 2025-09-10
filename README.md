# Système de Sondage - Styles d'Agents Immobiliers

## Description
Système de sondage autonome pour analyser les préférences des clients concernant les différents styles d'agents immobiliers. Interface web moderne et responsive avec stockage local des données.

## Fonctionnalités

### 🎯 Sondage Interactif
- Interface multi-étapes avec barre de progression
- Validation des réponses en temps réel
- Design moderne et responsive
- Animation fluide entre les sections

### 📊 Analyse des Données
- Stockage local automatique des réponses
- Statistiques en temps réel avec graphiques
- Calcul de moyennes et pourcentages
- Visualisation des tendances

### 💾 Gestion des Données
- Export des résultats en format CSV
- Sauvegarde automatique dans le navigateur
- Possibilité de réinitialiser le sondage
- Données persistantes entre les sessions

## Structure du Projet

```
Sondage-Agents-Immobiliers/
├── index.html          # Interface principale
├── styles.css          # Styles et design
├── script.js           # Logique JavaScript
└── README.md           # Documentation
```

## Utilisation

### Démarrage
1. Ouvrir `index.html` dans un navigateur web
2. Le sondage se lance automatiquement

### Navigation
- **Suivant/Précédent** : Navigation entre les sections
- **Validation** : Vérification automatique des réponses requises
- **Soumission** : Sauvegarde automatique des données

### Consultation des Résultats
- **Voir les résultats** : Statistiques agrégées avec graphiques
- **Exporter** : Téléchargement des données en CSV
- **Nouveau sondage** : Réinitialisation pour un nouveau participant

## Sections du Sondage

### 1. Informations Générales
- Tranche d'âge du participant
- Expérience en immobilier

### 2. Styles d'Agents
- Choix parmi 4 styles d'agents personnalisables
- Cartes visuelles avec descriptions détaillées

### 3. Préférences Détaillées
- Priorités principales (max 3 sélections)
- Mode de communication préféré

### 4. Évaluation
- Échelle d'importance (1-10)
- Commentaires libres optionnels

## Personnalisation

### Modifier les Styles d'Agents
Pour personnaliser les 4 styles d'agents, utilisez la fonction JavaScript :

```javascript
updateAgentStyles([
    {
        title: "Nom du Style 1",
        description: "Description détaillée du premier style..."
    },
    {
        title: "Nom du Style 2", 
        description: "Description détaillée du deuxième style..."
    },
    // ... styles 3 et 4
]);
```

### Ajouter des Questions
Modifiez le fichier `index.html` pour ajouter de nouvelles sections ou questions, puis adaptez la logique dans `script.js`.

## Données Exportées

Le fichier CSV contient les colonnes suivantes :
- **Timestamp** : Date et heure de soumission
- **Age** : Tranche d'âge sélectionnée
- **Experience** : Niveau d'expérience immobilière
- **Style** : Style d'agent préféré
- **Priorities** : Priorités sélectionnées (séparées par ;)
- **Communication** : Mode de communication préféré
- **Importance** : Note d'importance (1-10)
- **Comments** : Commentaires libres

## Compatibilité
- Tous navigateurs modernes (Chrome, Firefox, Safari, Edge)
- Responsive design pour mobile et desktop
- Stockage local HTML5 (localStorage)

## Sécurité et Confidentialité
- Aucune donnée envoyée vers des serveurs externes
- Stockage local uniquement dans le navigateur
- Possibilité de supprimer les données à tout moment

---

**Prêt à personnaliser avec vos 4 styles d'agents immobiliers !**
