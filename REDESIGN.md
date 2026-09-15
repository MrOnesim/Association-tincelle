# Association Étincelle — Refonte visuelle « Éditoriale chaleureuse »

Note de design accompagnant la refonte complète du site (toutes pages).
Aperçu live : serveur Vite sur le port 5173.

## 1. Direction artistique

**Concept :** prolonger la signalétique officielle de l'association (fond charbon,
magenta « vin », or) dans un rendu **éditorial chaleureux et premium** — lumineux et
humain en page courante, ponctué de **bandes encre profonde** pour les moments forts
(impact, processus, appels à l'action, pied de page).

**Signature graphique :** l'**étincelle** du logotype (étoile à 4 branches) devient un
motif récurrent — marqueur de section, puce de lien, scintillement décoratif animé,
indice de navigation. Composant : `src/components/Spark.jsx`.

## 2. Jetons de design (`tailwind.config.js`)

| Rôle | Jeton | Valeur |
| --- | --- | --- |
| Fond de page | `porcelain` | `#FAF7F2` |
| Fond alterné | `ivory` | `#F3EDE3` |
| Encre (sections sombres) | `ink`, `ink-soft`, `ink-line` | `#171119`, `#221A26`, `#3A2F3D` |
| Marque (magenta) | `wine-50…900` | `#B54772` (500), `#A63263` (600) |
| Accent or | `gold-100…700` | `#E0AC55` (400), `#D2913A` (500) |
| Texte / secondaire | `body`, `muted` | `#241B26`, `#6E6472` |

- **Typographies :** `Fraunces` (display serif éditorial) + `Manrope` (sans de lecture).
- **Dégradés :** `brand-grad` (vin → or), `gold-grad`, `ink-grad`.
- **Ombres :** `soft`, `lift`, `glow`, `ink-card`.
- **Rayons :** `card` (24 px), `frame` (32 px).
- **Textures :** grain (bruit SVG) via la classe `.grain`, halos radiaux magenta/or.

## 3. Composants & motion

- `Reveal` : apparitions au scroll avec variantes `up / left / right / scale` + délais.
- `Hero` : entrée en cascade, Ken Burns sur le visuel, cadre doré décalé, cartes flottantes.
- `Programs` : mise en page éditoriale **deux colonnes** (titre collant + grille de cartes numérotées).
- `Stats` / `Process` / `CtaBanner` / `Footer` / `PageHeader` / `NotFound` : bandes encre + grain + étincelles.
- `Testimonials` : avatars « initiales » générés localement (`Avatar.jsx`), plus de requête externe.
- `Gallery` : marquee WebP local, pause au survol.
- Micro-interactions : soulignement de nav animé, flèches qui glissent, cartes qui se soulèvent,
  accordéon FAQ, barre de progression de lecture (`ScrollProgress` dans `Layout`).
- **Accessibilité :** tout le motion est neutralisé sous `prefers-reduced-motion` ;
  labels de formulaire reliés (`htmlFor`/`id`), `aria-*` sur les boutons et menus.

## 4. Performance

- Images converties en **WebP optimisé** (`public/assets/opt/`, ~2,7 Mo au lieu de 33 Mo),
  `loading="lazy"` + `decoding="async"`.
- Suppression des dépendances d'images distantes (Unsplash, pravatar).
- Polices préconnectées ; CSS ~8,7 Ko gzip.

## 5. Corrections fonctionnelles

- Liens légaux du pied de page désormais routés (`/mentions-legales`, `/confidentialite`, …).
- Tagline harmonisée : « Votre liberté financière, notre objectif ».
- Boutons flottants clarifiés (assistant à gauche, WhatsApp uniquement sur la page Demande).

## 6. Photo d'équipe réelle (`Team.jsx`)

La vraie photo d'équipe (réunion, signalétique à l'écran) est intégrée via la section
`Team` (Accueil, À propos, Galerie) et en tête du carrousel `Gallery`.

- Chemin attendu : **`public/assets/equipe.jpeg`**.
- Composant `SmartImage.jsx` : si le fichier est absent, un visuel de repli local
  s'affiche (aucune image cassée) ; dès que `equipe.jpeg` est déposé, la vraie photo
  apparaît automatiquement, sans modification de code.

## 7. Localisation (`Location.jsx`)

Fiche Google Maps officielle intégrée : **Association Étincelle — 2D Av. des Étangs,
78170 La Celle-Saint-Cloud, France** (plus code R4WJ+5M, tél. +33 6 72 03 96 14).

- Section « Nous trouver » : coordonnées (adresse, téléphone, e-mail, horaires, plus code)
  + carte intégrée sans clé API (`output=embed`) + boutons « Ouvrir dans Google Maps »
  et « Itinéraire ».
- Données centralisées dans `src/data/contact.js` (`mapsUrl`, `mapsDirections`, `mapsEmbed`).
- Adresse également reprise dans le bandeau contact (en-tête) et le pied de page.
- Visible sur : Accueil, page Demande (et adresse partout via en-tête/pied de page).
