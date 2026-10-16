-- Schéma de la table des articles du blog.
-- À exécuter dans Supabase → SQL Editor → New query.
-- Idempotent : peut être relancé sans erreur.

create table if not exists public.articles (
  id            uuid primary key default gen_random_uuid(),
  slug          text not null unique,
  title         text not null,
  excerpt       text not null default '',
  -- Corps au format Markdown simplifié : « ## Titre » puis paragraphes
  -- séparés par une ligne vide.
  body          text not null default '',
  cover_image   text,
  cover_alt     text,
  author        text not null default 'Association Étincelle',
  category      text not null default 'Général',
  status        text not null default 'draft'
                  check (status in ('draft', 'published')),
  published_at  timestamptz,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists articles_status_idx
  on public.articles (status, published_at desc);

-- ============================================================
-- Sécurité (RLS)
-- ============================================================

alter table public.articles enable row level security;

-- Lecture publique : uniquement les articles publiés, et uniquement
-- les colonnes utiles à l'affichage.
drop policy if exists "articles: lecture publique" on public.articles;
create policy "articles: lecture publique"
  on public.articles
  for select
  to anon, authenticated
  using (status = 'published');

-- Écriture : réservée aux comptes authentifiés. La session est celle
-- créée par Supabase Auth, et non une clé cachée dans le code.
drop policy if exists "articles: ecriture admin" on public.articles;
create policy "articles: ecriture admin"
  on public.articles
  for all
  to authenticated
  using (true)
  with check (true);

-- ============================================================
-- Compte administrateur
-- ============================================================

-- 1. Créer l'utilisateur dans Supabase → Authentication → Users
--    → « Add user », puis renseigner email et mot de passe.
-- 2. Vérifier son rôle (remplacer l'identifiant) :
--
--    select id, email, role from auth.users
--     where email = 'aideassociationetincelle@gmail.com';
--
-- 3. Passer administrateur (exécuter une seule fois) :
--
--    update auth.users
--       set role = 'authenticated'
--     where email = 'aideassociationetincelle@gmail.com';

-- ============================================================
-- Variables d'environnement Vercel
-- ============================================================
--
-- Dans Vercel → Project → Settings → Environment Variables :
--   VITE_SUPABASE_URL    = https://<référence>.supabase.co
--   VITE_SUPABASE_ANON_KEY = clé « anon public »
--
-- Les deux sont nécessaires au build, car le script de pré-rendu
-- interroge Supabase pour connaître les articles à générer.
-- Après ajout, un redéploiement est requis pour qu'elles soient prises
-- en compte.