# Administration du blog

Guide pour publier un article depuis le téléphone.

## Se connecter

1. Ouvrir `https://association-tincelle.vercel.app/admin`
2. Saisir l'adresse e-mail et le mot de passe de l'administrateur.

L'écran reste en `noindex` : cette page n'apparaît pas dans Google.

## Écrire un article

- **Titre** — le nom de l'article.
- **Identifiant d'URL** — se remplit tout seul à partir du titre. Ne plus
  le modifier ensuite : changer l'identifiant d'un article déjà en ligne
  casse son adresse et le désindexe.
- **Chapô** — le résumé affiché dans la liste et sur les réseaux sociaux.
  Deux phrases suffisent.
- **Contenu** — un sous-titre s'écrit en commençant la ligne par `##`.
  Un paragraphe est une ou plusieurs lignes, une ligne vide entre chaque.

Exemple :

```
## Préparer son dossier

Rassemblez votre pièce d'identité et un justificatif de domicile.

La demande est étudiée sous 48 heures.
```

## Modifier ou supprimer un article

La liste en haut de l'écran montre tous les articles, brouillons compris.

- **Modifier** charge l'article dans le formulaire.
- La corbeille le supprime définitivement, après confirmation.

Ne changez plus l'identifiant d'URL d'un article déjà publié : son adresse
changerait et son référencement serait perdu. L'identifiant se remplit tout
seul à partir du titre lors de la création, et reste ensuite modifiable tant
que l'article n'est pas publié.

## Ajouter une image

Le champ **Image de couverture** accepte un fichier de votre téléphone ou de
votre ordinateur. JPEG, PNG ou WebP, 4 Mo maximum.

Le texte alternatif est pré-rempli avec le nom du fichier ; corrigez-le pour
décrire réellement l'image, c'est ce texte que lisent les aveugles et que les
moteurs de recherche utilisent pour comprendre l'image.

Le type du fichier est vérifié sur son contenu réel, pas sur son nom : renommer
une image en `.jpg` ne la fait pas passer pour une image.

## Statut

- **Brouillon** — invisible sur le site.
- **Publié** — visible après le prochain déploiement.

## Important : délai de publication

Un article enregistré dans la base n'apparaît pas immédiatement sur le site.

Le site est **pré-rendu au moment du build** : chaque page est un fichier
HTML figé au déploiement. C'est ce qui permet à Google de lire les articles
sans exécuter de JavaScript, donc de les indexer réellement.

Conséquence : après avoir enregistré un article, il faut **redéployer** pour
qu'il soit visible. Dans Vercel : onglet Deployments, puis redeploy du
dernier commit.

## Changer le mot de passe

Le mot de passe n'est stocké que sous forme d'empreinte, jamais en clair.

```bash
node --env-file=.env scripts/create-admin.mjs "nouveau-mot-de-passe-solide"
```

Toutes les sessions ouvertes sont alors fermées.

## Organisation retenue

Trois tables, trois rôles distincts :

| Table | Rôle `blog_app` (utilisé par l'API) | Rôle `neondb_owner` |
| --- | --- | --- |
| `articles` | lecture, écriture, suppression | tout |
| `admin_users` | **lecture seule** | tout |
| `admin_sessions` | lecture, insertion, suppression | tout |
| `images` | lecture, insertion, mise à jour | tout |

L'API peut donc gérer les articles et les sessions, mais **ne peut pas**
changer un mot de passe ni créer un compte, même si elle était compromise.

Un risque assumé : l'API peut supprimer toutes les sessions. Cela déconnecterait
l'administrateur, sans permettre aucune fuite ni publication non autorisée.
Refuser ce droit empêcherait la déconnexion d'invalider réellement un jeton,
ce qui serait bien plus grave.

## Vérifications

```bash
# API : authentification, sessions, brouillons invisibles
node --env-file=.env scripts/test-handlers.mjs "mot-de-passe"

# Nouvelles routes : liste, édition d'un brouillon, envoi d'image
node --env-file=.env scripts/test-admin-new.mjs "mot-de-passe"

# Permissions réellement appliquées par PostgreSQL
node --env-file=.env scripts/test-permissions.mjs

# Site déployé : lisibilité, fonctionnalités, structure SEO
node scripts/check-interactive.mjs
node scripts/check-seo.mjs

# Écriture réelle en production, sans rien laisser derrière
node scripts/e2e-prod.mjs https://association-tincelle.vercel.app "mot-de-passe"
```