# 🧩 Générateur de CV Dynamique — JavaScript Vanilla

## 📖 Contexte du projet
Ce projet consiste à concevoir et développer une **application web interactive** permettant aux utilisateurs de **créer, personnaliser et télécharger leur CV** à partir d’un **formulaire à étapes** (stepper form) dynamique.  
L’objectif est d’offrir une **expérience fluide, moderne et intuitive** tout en garantissant la **validation des données** et la **personnalisation du design du CV**.

---

## 🚀 Fonctionnalités clés

### 1. Formulaire à étapes (Stepper Form)
Le processus de création du CV est divisé en plusieurs étapes pour une saisie structurée et claire :
- **Informations personnelles** : nom complet, photo, email, téléphone, adresse, LinkedIn, GitHub, portfolio, etc.
- **Détails professionnels** : titre du poste et résumé du profil.
- **Compétences** :
    - *Hard skills* (techniques)
    - *Soft skills* (personnelles)
    - Ajout et suppression dynamiques des compétences.
- **Langues** : ajout dynamique des langues avec niveau.
- **Loisirs et intérêts** : ajout de plusieurs entrées.
- **Formation académique** : possibilité d’ajouter plusieurs cursus.
- **Expériences professionnelles** : ajout dynamique d’expériences.
- **Certifications** : ajout de plusieurs certifications avec liens.

---

### 2. Suivi de l’avancement
- Barre de progression indiquant l’état d’avancement à chaque étape.
- Mise à jour dynamique lors de la navigation entre les étapes.

---

### 3. Modèles de CV personnalisables
- Deux modèles de CV au choix.
- Possibilité de **prévisualiser** et **personnaliser** le design avant le téléchargement.
- Rendu **en temps réel** des informations saisies.

---

### 4. Sauvegarde et réutilisation
- Option de sauvegarde des CV créés dans le navigateur pour réutilisation ou modification ultérieure.

---

### 5. Validation des champs
Chaque champ est contrôlé pour garantir la cohérence des données :
- Email valide
- Format du téléphone
- Liens LinkedIn et GitHub valides
- Tous les champs obligatoires doivent être correctement remplis avant de passer à l’étape suivante.

---

## 🧠 User Stories

### 1. Création du CV
> En tant qu'utilisateur, je souhaite pouvoir créer un CV clair et structuré via un formulaire à étapes.

### 2. Navigation fluide
> Je peux naviguer entre les étapes sans perdre mes données.

### 3. Entrées dynamiques
> Je peux ajouter ou supprimer des compétences, langues, formations, expériences et certifications facilement.

### 4. Validation interactive
> Je suis averti en cas d'erreur de saisie avant de soumettre le CV.

### 5. Suivi de progression
> Je peux visualiser mon avancement grâce à une barre de progression dynamique.

### 6. Choix du modèle
> Je peux choisir le modèle de CV qui me plaît et le visualiser avant le téléchargement.

### 7. Téléchargement / Impression
> Je peux télécharger mon CV en **PDF** ou l’imprimer directement depuis l’application.

---

## 🧰 Technologies utilisées

| Catégorie | Technologie |
|------------|--------------|
| **Langages** | HTML5, CSS3, JavaScript (Vanilla DOM) |
| **Framework CSS** | TailwindCSS |
| **Gestion du DOM** | JavaScript natif |
| **Export PDF** | jsPDF ou équivalent (selon implémentation) |
| **Stockage local** | LocalStorage |
| **Contrôle de version** | Git / GitHub |
| **Hébergement** | GitHub Pages |

---

## 📈 Critères de performance

- Navigation fluide entre les étapes sans latence perceptible.
- Validation **client-side** (JavaScript) rapide et réactive.
- Optimisation des médias et scripts (compression/minification).
- Application responsive et compatible mobile/tablette.
- Score d’accessibilité ≥ 90/100 (Lighthouse).
- Génération PDF optimisée (< 1 Mo).
- Code JavaScript léger et sans fuites mémoire.
---

## 🧾 Auteur

**👤 Hamza Hajjaji**  
📅 *Projet réalisé dans le cadre d’un brief pédagogique – Novembre 2025*  
📫 [Lien GitHub](https://github.com/hajjvero) *(à compléter)*

---

