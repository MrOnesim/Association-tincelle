// Réponses du chatbot (assistant FAQ autonome, sans backend)
const qa = [
  {
    keywords: ['bonjour', 'salut', 'hello', 'coucou'],
    answer:
      "Bonjour 👋 Je suis l'assistant de l'Association Étincelle. Comment puis-je vous aider ? Vous pouvez me demander comment déposer une demande, les conditions, les délais ou les frais.",
  },
  {
    keywords: ['demande', 'deposer', 'déposer', 'formulaire', 'aide financière', 'aide'],
    answer:
      "Pour déposer une demande, rendez-vous sur la page « Contact / Demande » et remplissez le formulaire (informations personnelles, situation financière, montant et coordonnées bancaires). Votre demande nous parvient ensuite sur WhatsApp.",
  },
  {
    keywords: ['condition', 'conditions', 'critère', 'criteres', 'éligible', 'eligible'],
    answer:
      "Les conditions : identité vérifiée, projet clairement défini, documents justificatifs, informations fiables et respect des engagements de l'association.",
  },
  {
    keywords: ['délai', 'delai', 'temps', 'attente', 'réponse'],
    answer:
      "Notre équipe traite chaque dossier rapidement, avec un retour sous 48 heures ouvrables après réception de votre demande complète.",
  },
  {
    keywords: ['frais', 'payant', 'coût', 'cout', 'gratuit', 'tarif'],
    answer:
      "Des frais uniques sont requis pour l'établissement de votre dossier. Après paiement, votre demande est traitée rapidement.",
  },
  {
    keywords: ['pays', 'zone', 'geographique', 'géographique', 'europe'],
    answer:
      "Nous accompagnons des bénéficiaires dans de nombreux pays (France, Allemagne, Belgique, Espagne, Italie, Pays-Bas, etc.). La liste complète est disponible dans le formulaire.",
  },
  {
    keywords: ['document', 'documents', 'piece', 'pièce', 'identité', 'rib', 'justificatif'],
    answer:
      "Documents à joindre : une pièce d'identité en cours de validité (recto/verso), un justificatif de domicile récent, et tout document justifiant votre situation financière (fiches de paie, avis d'imposition).",
  },
  {
    keywords: ['remboursable', 'remboursement', 'famille', 'non remboursable'],
    answer:
      "Nous proposons notamment un financement non remboursable pour soutenir les familles (éducation, santé, logement, projets essentiels).",
  },
  {
    keywords: ['contact', 'whatsapp', 'téléphone', 'telephone', 'joindre', 'mail', 'email'],
    answer:
      "Vous pouvez nous contacter par e-mail à aideassociationetincelle@gmail.com ou directement via le bouton WhatsApp en bas à droite de l'écran.",
  },
  {
    keywords: ['qui', 'association', 'étincelle', 'mission', 'à propos'],
    answer:
      "L'Association Étincelle est une organisation à but non lucratif qui accompagne étudiants, entrepreneurs et familles grâce à des solutions financières accessibles, transparentes et humaines.",
  },
  {
    keywords: ['horaire', 'horaires', 'ouvert', 'disponible'],
    answer:
      "Notre équipe vous répond du lundi au samedi. Le moyen le plus rapide est le bouton WhatsApp en bas à droite.",
  },
]

export function getBotReply(message) {
  const text = (message || '').toLowerCase()
  for (const item of qa) {
    if (item.keywords.some((k) => text.includes(k))) return item.answer
  }
  return (
    "Je n'ai pas la réponse précise, mais vous pouvez consulter notre page FAQ ou nous contacter directement via le bouton WhatsApp en bas à droite de l'écran. 💬"
  )
}

export const quickQuestions = [
  'Comment déposer une demande ?',
  'Quelles sont les conditions ?',
  'Quels sont les délais ?',
  'Quels sont les frais ?',
  'Comment vous contacter ?',
]
