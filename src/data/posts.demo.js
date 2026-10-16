/**
 * Articles de démonstration, utilisés tant que Supabase n'est pas
 * configuré. Ils servent aussi de référence de mise en forme pour
 * les futurs articles écrits depuis l'espace d'administration.
 */
export const localPosts = [
  {
    id: 'demo-1',
    slug: 'comment-deposer-une-demande-aide',
    title: 'Comment déposer une demande d’aide en cinq étapes',
    excerpt:
      'Études, entrepreneuriat, soutien aux familles : voici la marche à suivre complète pour constituer un dossier solide et recevoir une réponse rapide.',
    body: [
      {
        h: 'Préparer les pièces justificatives',
        p: [
          'Une demande aboutit rarement à un refus pour une raison de fond, mais presque toujours à cause d’un dossier incomplet. Avant de remplir le formulaire, rassemblez ce qui permet de comprendre votre situation en une seule lecture.',
          'La pièce d’identité en cours de validité, un justificatif de domicile, et les documents liés à votre besoin : devis, factures, attestation de scolarité, statuts d’entreprise, ou justificatif de frais médicaux.',
        ],
      },
      {
        h: 'Décrire le besoin avec précision',
        p: [
          'Un montant exact vaut mieux qu’une estimation. « 3 200 € de frais de scolarité pour l’année universitaire » permet une décision ; « une aide pour mes études » ne le permet pas.',
          'Indiquez aussi ce qui a déjà été sollicité et pourquoi le projet n’a pas pu avancer. Cette information rassure l’équipe qui étudie votre dossier.',
        ],
      },
      {
        h: 'Choisir le bon dispositif',
        p: [
          'Six dispositifs existent : aide aux études, création d’entreprise, projet personnel, accompagnement, financement pour les familles, soutien aux personnes âgées ou malades.',
          'Choisir le bon dispositif dès le départ évite un aller-retour. Le formulaire vous en propose la liste ; l’équipe reste disponible pour vous orienter si vous avez un doute.',
        ],
      },
      {
        h: 'Envoyer et suivre',
        p: [
          'Le formulaire ne prend que quelques minutes. Une fois envoyé, vous recevez un accusé de réception et l’équipe vous recontacte, généralement sous 48 heures ouvrées.',
          'Chaque dossier est traité de façon confidentielle, et la décision vous est expliquée, y compris lorsqu’elle est négative.',
        ],
      },
      {
        h: 'La suite de la procédure',
        p: [
          'Après l’étude du dossier et l’accord écrit, l’aide est versée selon l’échéancier convenu. Un suivi est ensuite mis en place pour s’assurer que le projet aboutit.',
          'Toute information complémentaire vous sera transmise par le canal indiqué lors de la dépôt de la demande.',
        ],
      },
    ],
    coverImage: '/assets/opt/encaisser.webp',
    coverAlt: 'Remise d’une aide financière à un bénéficiaire',
    author: 'Association Étincelle',
    category: 'Démarches',
    status: 'published',
    publishedAt: '2026-09-28',
  },
  {
    id: 'demo-2',
    slug: 'financement-non-remboursable-questions',
    title: 'Financement non remboursable : les questions qui reviennent le plus',
    excerpt:
      'Un dispositif non remboursable, qu’est-ce que cela change concrètement ? Ni intérêts, ni échéances, ni investigations bancaires.',
    body: [
      {
        h: 'Un accompagnement, pas un prêt',
        p: [
          'L’aide proposée n’est pas un prêt : elle n’est pas remboursable et ne génère aucun intérêt. Il ne s’agit donc pas d’endetter votre structure, mais de financer un besoin identifié.',
          'Toute prestation fait l’objet d’un accord écrit distinct, qui précise le montant, les modalités de versement et les conditions d’accompagnement.',
        ],
      },
      {
        h: 'Qui peut être bénéficiaire',
        p: [
          'Les étudiants, les entrepreneurs, les porteurs de projet et les familles peuvent solliciter l’association, sous réserve de correspondre à l’un des six dispositifs proposés.',
          'Il n’y a pas de condition de ressources unique : l’étude porte sur le projet et sur la cohérence du besoin avec le dispositif demandé.',
        ],
      },
      {
        h: 'Usage des fonds',
        p: [
          'Les fonds servent aux besoins décrits dans la demande : frais de scolarité, achat de matériel, communication, frais médicaux, dépenses de logement.',
          'Un usage différent de celui déclaré peut remettre en cause l’accord. En cas d’évolution du besoin, il vaut mieux nous consulter que d’attendre.',
        ],
      },
      {
        h: 'Les frais de dossier',
        p: [
          'L’établissement du dossier donne lieu à des frais uniques, indiqués lors de la dépôt de la demande et nécessaires au traitement de celle-ci.',
          'Ces frais ne conditionnent pas l’examen de la demande : un dossier n’est pas rejeté pour ce seul motif.',
        ],
      },
    ],
    coverImage: '/assets/opt/administration.webp',
    coverAlt: 'Accueil administratif des bénéficiaires',
    author: 'Association Étincelle',
    category: 'Transparence',
    status: 'published',
    publishedAt: '2026-09-12',
  },
  {
    id: 'demo-3',
    slug: 'art-des-finances-non-remboursables',
    title: 'Art des finances non remboursables',
    excerpt:
      'Comment l’accompagnement transforme une aide ponctuelle en autonomie durable : méthode, transparence et suivi après versement.',
    body: [
      {
        h: 'Une aide n’est pas une fin en soi',
        p: [
          'L’accompagnement ne s’arrête pas au versement. L’équipe suit l’avancement du projet, aide à ajuster les décisions et reste mobilisée après le dépôt des fonds.',
          'C’est ce qui distingue une aide financière d’un simple versement, et c’est ce qui permet au bénéficiaire de construire une autonomie durable.',
        ],
      },
      {
        h: 'Évaluer sans figer',
        p: [
          'Le processus d’évaluation est conçu pour être rapide et transparent. Chaque dossier est étudié selon les mêmes critères, et la décision est motivée.',
          'Cette régularité évite les situations où un projet équivalent serait traité différemment selon l’interlocuteur ou le moment.',
        ],
      },
      {
        h: 'La place du demandeur',
        p: [
          'Le demandeur n’est pas passif. Il fournit les informations, pose ses questions et participe aux décisions qui concernent son projet.',
          'Cette posture fait souvent la différence entre un dossier qui avance et un dossier qui reste en attente : plus un demandeur est précis, plus la réponse est rapide.',
        ],
      },
    ],
    coverImage: '/assets/opt/finance-ia.webp',
    coverAlt: 'Atelier de gestion financière',
    author: 'Association Étincelle',
    category: 'Accompagnement',
    status: 'published',
    publishedAt: '2026-08-24',
  },
]