# Context du Projet : Passeport Fidélité Viteos

## 1. Contexte & Enjeux

**Viteos** est le principal fournisseur d'énergie et de solutions durables dans le canton de Neuchâtel (Suisse). Engagée dans la transition énergétique et l'économie circulaire locale, l'entreprise est partenaire d'événements majeurs du canton :
- **Clubs sportifs** : NUC Volleyball (Neuchâtel Université Club), HCC (Hockey Club La Chaux-de-Fonds), Neuchâtel Hockey Academy.
- **Événements populaires** : Fête des Vendanges de Neuchâtel, Braderie de La Chaux-de-Fonds.

### Problématique
Lors des événements festifs et sportifs, la distribution massive de goodies publicitaires en plastique à usage unique génère des déchets inutiles et va à l'encontre des valeurs d'éco-responsabilité portées par Viteos.

### Solution : Le Passeport Fidélité Viteos
Une application web mobile-first interactive et ludique permettant aux citoyens et supporters de :
1. **Gagner des points d'engagement** en scannant des QR codes lors d'événements partenaires et en participant à des **quiz gamifiés** sur l'énergie durable et le sport local.
2. **Échanger leurs points** dans une **Boutique des Saisons** contre des récompenses tangibles durables (sablier de douche pour économiser l'eau, protège-gobelet réutilisable, chaussettes thermiques d'hiver, bandana rafraîchissant d'été) ou des **Bons d'achat locaux (CID Neuchâtel)** et des billets de match.
3. **Découvrir le Manifeste / Vision** de Viteos pour une économie circulaire neuchâteloise.

---

## 2. Architecture Technique

- **Type d'application** : Single Page Application (SPA) **Totalement Responsive** (optimisée aussi bien pour smartphones que pour ordinateurs de bureau et tablettes).
- **Technologies utilisées** :
  - **Framework UI** : React 18 Vanilla natif (zéro compilation Babel au runtime, chargement instantané en local ou sur serveur).
  - **Architecture des Vues** :
    - **Page d'Accueil (Dashboard)** :
      - En haut : Profil unifié (Avatar, Nom, Progression des points vers 150 pts).
      - En dessous :
        - Colonne gauche : Trophées / participations récentes & Prochains événements en liste verticale.
        - Colonne droite : **Catalogue saisonnier complet de récompenses** avec sélecteur d'onglets (Collection Hiver / Collection Été) et boutons d'échange instantanés.
    - **Quiz Interactif** : 5 questions (5 points par réponse exacte = 25 points par quiz complet), score récapitulatif à la fin.
    - **Vision & Manifeste** : Engagements durables et zéro déchet Viteos.
    - **Scanner QR Code** : Viseur épuré pour validation de présence.

---

## 3. Structure des Fichiers

```text
viteos-fidelite/
├── assets/
│   ├── viteos-icon.png       # Icône officielle (V sombre + feuille orange)
│   ├── viteos-logo.png       # Logo complet officiel
│   └── profile.png           # Photo de profil utilisateur
├── src/
│   ├── styles/
│   │   ├── base.css          # Reset, variables CSS strictes, typographie, layout global
│   │   ├── components.css    # Header, Drawer, Bottom Nav, Modales, Toast
│   │   └── views.css         # Vues Dashboard, Quiz, Boutique, Vision
│   ├── data.js               # Données des événements, quiz (6 pts/q) et récompenses
│   ├── state.js              # Gestionnaire d'état et persistance LocalStorage
│   └── app.js                # Composants React de l'application
├── index.html                # Point d'entrée HTML épuré (chargement CSS + JS séparés)
├── context.md                # Documentation de contexte & vision métier
└── README.md                 # Guide de démarrage
```

---

## 4. Parcours Utilisateur & Vues

### A. Dashboard / Accueil (Conforme à la maquette)
- **Carte Profil & Jauge de points** :
  - Avatar utilisateur, nom (ex: *Jean-Félicien Martigny* ou personnalisé).
  - Jauge de progression animée (0 à 150+ points) avec message contextuel (*"Plus que X avant votre prochain cadeau"*).
  - **Derniers trophées obtenus** sous forme d'étoiles orange (Fête des Vendanges, Playoffs NUC, Saison HCC).
- **Prochains événements** :
  - Calendrier neuchâtelois (Fête des vendanges 2026, NUC - Colombier, HCC - HC Ajoie, Braderie de CDF) avec bouton direct pour simuler la présence.
- **Récompenses phares** :
  - Grille des 4 articles de la maquette (Sablier économique, Protège-gobelet, Chaussettes chaudes, Bandana rafraîchissant) avec prix en points (150 pts) et bouton d'échange rapide.

### B. Quiz Gamifié (Le cœur de l'interaction)
- 5 questions interactives mêlant culture neuchâteloise et transition énergétique :
  - Part d'énergie renouvelable fournie par Viteos.
  - Nom de la patinoire du HCC (Les Mélèzes).
  - Gestes d'économie d'énergie au quotidien (douche 4min).
  - Engagement et rayonnement du Viteos NUC Volleyball.
  - Raison d'être de la démarche éco-circulaire Viteos.
- **Barème éco-responsable & Pondération** :
  - **6 points** par bonne réponse (soit **30 points** pour un quiz complet de 5 questions).
  - Un quiz complet rapporte exactement **1/5ème** des 150 points requis pour un goodie.
  - Il faut donc accomplir **5 quiz complets** (ou combiner quiz et présences événements) pour débloquer une première récompense.
- Feedback visuel sobre et instantané (lueur verte pulsée).
- Écran de fin épuré avec bouton direct **"Retourner à l'accueil"** pour consulter sa progression sur la jauge.

### C. Boutique des Saisons (Shop Éco-responsable)
- **Toggle animé Hiver ❄️ / Été ☀️** modifiant dynamiquement le catalogue.
- **Produits Hiver** : Chaussettes thermiques en laine recyclée, Sablier de douche 4min, Bonnet polaire Neuchâtel, Bon Chauffage Éco.
- **Produits Été** : Bandana rafraîchissant microfibre, Protège-gobelet festival lavable, Gourde isotherme inox Viteos, Entrée Piscine du Nid-du-Crô.
- **Bons & Expériences** : Bons d'achat CID Neuchâtel (Commerces locaux), Billets de match NUC & HCC.
- **Modale d'achat & Déduction** : Confirmation animée avec déduction en direct des points de la jauge.

### D. Scanner QR Code
- Détection via caméra du smartphone pour tester en conditions réelles d'événement.
- Boutons de simulation rapide (ex: *"Scanner au stand Viteos Fête des Vendanges (+50 pts)"*, *"Scanner à la Riveraine NUC (+40 pts)"*).

### E. Notre Vision & Manifeste Écologique
- Page immersive expliquant la démarche zéro-goodies plastiques et le soutien à l'économie circulaire du canton de Neuchâtel.

---

## 5. Guide de Démonstration (Pour Pitch / Jury)

1. **Lancement** : Ouvrir simplement `index.html` dans un navigateur moderne (Chrome, Safari Mobile, Firefox, Edge).
2. **Tester sur Mobile** : Scanner le QR code local ou utiliser le mode Device Toolbar (`F12` > icône smartphone iPhone 14/15 ou Galaxy) pour une expérience tactile native.
3. **Scénario Démo recommandé** :
   - *Étape 1* : Montrer le Dashboard conforme à la maquette originale (Jauge, Trophées, Événements, Récompenses).
   - *Étape 2* : Cliquer sur l'onglet **Quiz**, répondre aux questions pour déclencher l'animation confettis et gagner +60 points.
   - *Étape 3* : Aller sur l'onglet **Scanner**, simuler un scan à la Fête des Vendanges (+50 points).
   - *Étape 4* : Aller sur la **Boutique**, basculer le sélecteur **Hiver / Été**, échanger 150 points contre un cadeau et admirer la déduction automatique sur la jauge du profil !
   - *Étape 5* : Afficher l'onglet **Vision** pour souligner l'impact écologique du projet.
   - *Optionnel* : Cliquer sur le menu haut-droit (☰) pour changer de prénom ou réinitialiser les données de démo à zéro.
