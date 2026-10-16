/**
 * Conversion du corps d'un article.
 *
 * L'espace d'administration saisit du Markdown simplifié (voir
 * AdminEditor) ; la base le stocke comme texte. Ce module le transforme
 * en blocs exploitables par BlogPostPage.
 *
 * Format accepté :
 *   « ## Titre » en début de ligne ouvre un sous-titre
 *   une ligne vide sépare deux paragraphes
 */

/** Transforme le corps stocké en tableau de blocs { h, p }. */
export function parseBody(raw) {
  if (Array.isArray(raw)) return raw.filter(Boolean)
  if (typeof raw !== 'string' || !raw.trim()) return []

  const blocks = []
  let heading = null
  let paragraph = []

  const flushParagraph = () => {
    const text = paragraph.join(' ').trim()
    if (!text) return
    if (heading) {
      blocks.push({ h: heading, p: [text] })
      heading = null
    } else {
      // Un bloc sans sous-titre réutilise le dernier, ou reste orphelin.
      const last = blocks[blocks.length - 1]
      if (last && !last.h) last.p.push(text)
      else blocks.push({ h: null, p: [text] })
    }
    paragraph = []
  }

  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim()

    if (!trimmed) {
      flushParagraph()
      continue
    }

    const headingMatch = trimmed.match(/^#{2,3}\s+(.*)$/)
    if (headingMatch) {
      // Un sous-titre encountered ferme le paragraphe en cours.
      if (paragraph.length) {
        const text = paragraph.join(' ').trim()
        if (heading) blocks.push({ h: heading, p: [text] })
        else blocks.push({ h: null, p: [text] })
        paragraph = []
      }
      heading = headingMatch[1].trim()
      continue
    }

    paragraph.push(trimmed)
  }

  flushParagraph()

  return blocks
}

/**
 * Met en forme un paragraphe : **gras**, *italique* et [lien](url).
 * Le contenu provient de l'administration, donc d'une source de confiance,
 * mais on n'injecte jamais de HTML brut.
 */
export function formatInline(text) {
  return String(text || '')
    .split(/(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g)
    .filter(Boolean)
    .map((part) => {
      const bold = part.match(/^\*\*(.+)\*\*$/)
      if (bold) return { type: 'bold', value: bold[1] }

      const italic = part.match(/^\*(.+)\*$/)
      if (italic) return { type: 'italic', value: italic[1] }

      const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
      if (link) return { type: 'link', value: link[1], href: link[2] }

      return { type: 'text', value: part }
    })
}

/** Retire la mise en forme, pour les meta descriptions et le chapô. */
export function stripFormatting(text) {
  return String(text || '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_#]/g, '')
    .trim()
}