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

# Permissions réellement appliquées par PostgreSQL
node --env-file=.env scripts/test-permissions.mjs
```