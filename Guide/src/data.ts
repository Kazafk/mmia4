import { GlossaryItem, UseCase, Pitfall, QuizQuestion } from './types';

export const GLOSSARY: GlossaryItem[] = [
  {
    id: 'llm',
    num: '01',
    term: 'LLM',
    acronym: 'Large Language Model · modèle de langage',
    description: "Le moteur derrière ChatGPT, Claude, Gemini, Mistral. C'est un système entraîné sur des milliards de textes pour prédire le mot suivant dans une phrase. À force, il \"comprend\" et reformule très bien.",
    metaphor: "Comme un musicien de jazz qui aurait écouté tous les standards : il peut improviser parce qu'il a internalisé des milliers de patterns.",
    category: 'Fondations',
    exampleTag: 'Vie de tous les jours',
    exampleText: "ChatGPT qui vous résume un mail, c'est un LLM en action.",
    bgColorClass: 'bg-coral-soft border-2 border-ink'
  },
  {
    id: 'token',
    num: '02',
    term: 'Token',
    acronym: "L'unité de base de l'IA",
    description: "L'IA ne lit pas des mots, elle lit des morceaux de mots appelés tokens. \"Assurance\" = 2 tokens. \"Constat\" = 1 token. C'est aussi l'unité de facturation des IA payantes.",
    metaphor: "Comme les noires et les croches en musique : l'IA ne pense pas en \"chansons\" mais en notes. Plus la partition est longue, plus ça coûte cher à jouer.",
    category: 'Fondations',
    exampleTag: 'À retenir',
    exampleText: "1 page de contrat ≈ 500 tokens. C'est ce que votre DSI regarde sur la facture.",
    bgColorClass: 'bg-yellow-soft border-2 border-ink'
  },
  {
    id: 'prompt',
    num: '03',
    term: 'Prompt',
    acronym: "La consigne donnée à l'IA",
    description: "C'est ce que vous tapez dans la fenêtre de chat. Bon prompt = bonne réponse. C'est devenu un mini-métier : \"prompt engineering\".",
    metaphor: "Comme briefer un collègue : \"fais-moi un truc sympa\" vs \"rédige-moi un email de 5 lignes au client X pour lui expliquer le refus en restant chaleureux\". Le second prompt, vous gagnez 30 minutes.",
    category: 'Fondations',
    exampleTag: 'Règle d\'or',
    exampleText: "Donnez le contexte, le rôle, le format attendu et un exemple si possible.",
    bgColorClass: 'bg-mint-soft border-2 border-ink'
  },
  {
    id: 'rag',
    num: '04',
    term: 'RAG',
    acronym: 'Retrieval Augmented Generation',
    description: "L'IA va chercher dans vos documents avant de répondre. Au lieu de répondre depuis sa mémoire générale (qui ignore vos CG), elle pioche dans votre base documentaire en temps réel.",
    metaphor: "Comme un commentateur sportif qui consulte les stats du match en direct sur sa tablette au lieu de répondre de mémoire. Plus précis, moins d'erreurs.",
    category: 'Architecture',
    exampleTag: 'Cas typique',
    exampleText: "Chatbot conseiller qui répond en piochant dans vos conditions générales 2026, pas dans Wikipedia.",
    bgColorClass: 'bg-indigo text-cream border-2 border-indigo',
    textColorClass: 'text-cream'
  },
  {
    id: 'hallucination',
    num: '05',
    term: 'Hallucination',
    acronym: "Quand l'IA invente avec aplomb",
    description: "L'IA peut inventer des faits, des chiffres, des citations, des articles de loi… avec une assurance déconcertante. C'est le risque n°1.",
    metaphor: "Comme un joueur de jazz qui ajoute une note qui n'existe pas dans la partition. Sublime en musique, catastrophique sur un avis de droit.",
    category: 'Fiabilité',
    exampleTag: 'Le piège métier',
    exampleText: "Un LLM peut citer \"l'article L.113-12-3 du Code des assurances\" qui n'existe pas. Toujours vérifier les sources factuelles.",
    bgColorClass: 'bg-coral-soft border-2 border-ink'
  },
  {
    id: 'fine-tuning',
    num: '06',
    term: 'Fine-tuning',
    acronym: 'Spécialiser un modèle',
    description: "Prendre un modèle généraliste et le ré-entraîner sur vos propres données pour qu'il maîtrise votre jargon, vos process, votre style.",
    metaphor: "Comme un médecin généraliste qui suit une spécialisation en cardiologie : le socle est le même, mais il devient pointu sur un domaine.",
    category: 'Fiabilité',
    exampleTag: 'À savoir',
    exampleText: "Coûteux, et souvent moins efficace qu'un bon RAG. À envisager seulement quand le RAG ne suffit pas.",
    bgColorClass: 'bg-yellow-soft border-2 border-ink'
  },
  {
    id: 'agentique',
    num: '07',
    term: 'IA Agentique',
    acronym: "L'IA qui passe à l'action",
    description: "Au lieu de juste répondre, l'IA agit : elle ouvre votre CRM, remplit un formulaire, envoie un mail, attend une réponse, puis enchaîne l'étape suivante. Toute seule.",
    metaphor: "Comme un assistant à qui vous dites \"organise-moi un déjeuner pro mardi\" — et qui revient avec le restaurant réservé, l'invitation envoyée et le rappel calendrier posé.",
    category: 'Fiabilité',
    exampleTag: 'Le sujet 2026',
    exampleText: "C'est LE buzzword de l'année. Promesse : automatiser des process complets, pas juste des tâches.",
    bgColorClass: 'bg-mint-soft border-2 border-ink'
  },
  {
    id: 'multimodal',
    num: '08',
    term: 'Multimodal',
    acronym: "L'IA qui lit, voit, écoute",
    description: "Une IA multimodale ne traite plus que du texte : elle analyse aussi images, audio, vidéo, PDF. Le grand saut récent.",
    metaphor: "Un musicien qui ne sait plus seulement chanter, mais aussi jouer du piano, lire une partition et reconnaître un instrument à l'oreille.",
    category: 'Fondations',
    exampleTag: 'Cas concret',
    exampleText: "L'IA reçoit la photo d'un pare-choc + le constat amiable scanné + un audio du client : elle synthétise le sinistre.",
    bgColorClass: 'bg-indigo text-cream border-2 border-indigo',
    textColorClass: 'text-cream'
  },
  {
    id: 'open-source',
    num: '09',
    term: 'Open source / Open weights',
    acronym: 'Les IA "libres"',
    description: "Modèles dont les \"poids\" sont publics : on peut les télécharger, les faire tourner sur ses propres serveurs, les modifier. Llama (Meta), Mistral, Qwen.",
    metaphor: "La recette de cuisine vs le plat au restaurant. Avec l'open source, vous avez la recette : vous pouvez cuisiner chez vous, mais il faut une vraie cuisine.",
    category: 'Architecture',
    exampleTag: 'Pourquoi ça compte',
    exampleText: "Souveraineté + données qui restent chez vous. Mais plus complexe à opérer qu'un appel à ChatGPT.",
    bgColorClass: 'bg-coral-soft border-2 border-ink'
  },
  {
    id: 'context-window',
    num: '10',
    term: 'Context window',
    acronym: "La mémoire de travail de l'IA",
    description: "Combien de texte l'IA peut \"tenir en tête\" en même temps. Mesurée en tokens. Les modèles 2026 vont jusqu'à 1 million de tokens (≈ 2000 pages).",
    metaphor: "La taille de votre bureau. Petit bureau = vous traitez un dossier à la fois. Grand bureau = vous étalez 15 dossiers et faites des liens.",
    category: 'Fondations',
    exampleTag: 'Impact business',
    exampleText: "Plus la fenêtre est large, plus l'IA peut analyser un dossier complet sans découpage sémantique artificiel.",
    bgColorClass: 'bg-yellow-soft border-2 border-ink'
  },
  {
    id: 'embeddings',
    num: '11',
    term: 'Embeddings / Vector DB',
    acronym: 'Le GPS sémantique',
    description: "Transformer un texte en coordonnées numériques. Résultat : \"voiture\" et \"automobile\" se retrouvent côte à côte dans l'espace, alors que \"voiture\" et \"chocolat\" sont loin.",
    metaphor: "Comme classer une bibliothèque non pas par titre alphabétique, mais par sujet réel : un livre sur les chats et un livre sur les chiens sont voisins, même si les titres n'ont rien à voir.",
    category: 'Architecture',
    exampleTag: 'Usage',
    exampleText: "C'est ce qui fait marcher le RAG : retrouver les bons paragraphes par sens, pas par mots-clés.",
    bgColorClass: 'bg-mint-soft border-2 border-ink'
  },
  {
    id: 'api',
    num: '12',
    term: 'API',
    acronym: 'Application Programming Interface',
    description: "La prise électrique qui permet à vos applis maison d'appeler une IA. Pas d'API = pas d'intégration dans votre SI.",
    metaphor: "Comme la prise jack sur votre ampli : peu importe la marque de la guitare, ça se branche. Standardisation = liberté.",
    category: 'Architecture',
    bgColorClass: 'bg-indigo text-cream border-2 border-indigo',
    exampleTag: 'Tarification',
    exampleText: 'Vous payez à l\'usage (au token consommé), pas à l\'abonnement utilisateur.',
    textColorClass: 'text-cream'
  },
  {
    id: 'training-vs-inference',
    num: '13',
    term: 'Training vs Inference',
    acronym: 'Apprendre vs travailler',
    description: "Training : l'IA apprend (coûte des millions €, fait par OpenAI/Anthropic/Google). Inference : l'IA répond à une question (coûte quelques centimes, c'est ce que vous payez).",
    metaphor: "Training = les 10 ans d'études d'un actuaire. Inference = chaque dossier qu'il traite ensuite. Les études, c'est lourd ; chaque dossier, c'est rapide.",
    category: 'Fondations',
    exampleTag: 'Bon à savoir',
    exampleText: "Vous ne faites quasi jamais de training. 99% du temps, vous payez de l'inference.",
    bgColorClass: 'bg-coral-soft border-2 border-ink'
  },
  {
    id: 'guardrails',
    num: '14',
    term: 'Guardrails',
    acronym: 'Les garde-fous de l\'IA',
    description: "Mécanismes mis en place pour empêcher l'IA de dérailler : ne pas donner d'avis médical, ne pas inventer de chiffres, ne pas répondre hors-sujet.",
    metaphor: "Comme les barrières de sécurité d'un circuit de F1 : on laisse le pilote aller vite, mais on l'empêche de finir dans le mur.",
    category: 'Fiabilité',
    exampleTag: 'En pratique',
    exampleText: "Indispensables avant tout déploiement client. C'est ce qui distingue un POC d'une vraie mise en prod.",
    bgColorClass: 'bg-yellow-soft border-2 border-ink'
  }
];

export const USE_CASES: UseCase[] = [
  {
    id: 'case-01',
    num: '01',
    title: 'Souscription augmentée',
    description: "Le chargé de souscription reçoit un dossier entreprise complexe. L'IA lit les bilans, les rapports d'activité, les contrats existants et propose en 3 minutes une note de risque détaillée avec les points d'attention.",
    mixTech: "LLM multimodal (lit PDF + images) + RAG sur vos référentiels de tarification + guardrails pour ne pas s'aventurer hors cadre."
  },
  {
    id: 'case-02',
    num: '02',
    title: 'Gestion des sinistres simples',
    description: "Bris de glace, dégât des eaux mineur : l'IA traite le dossier de bout en bout. Lecture du constat, vérification de la garantie, demande de pièces complémentaires au client, calcul de l'indemnité, génération du courrier.",
    mixTech: "IA agentique (enchaîne les étapes) + multimodal (lit photos) + un humain en validation finale. Gain : 70% de temps gestionnaire sur ces dossiers."
  },
  {
    id: 'case-03',
    num: '03',
    title: 'Service client 24/7',
    description: "Un chatbot qui répond aux questions des assurés en s'appuyant sur vos conditions générales, votre jargon, vos processus. Pas un chatbot générique qui dit \"je vous transfère un conseiller\".",
    mixTech: "LLM + RAG sur votre documentation produit + escalade humaine intelligente sur les cas sensibles."
  },
  {
    id: 'case-04',
    num: '04',
    title: 'Conformité & lutte fraude',
    description: "L'IA croise les déclarations de sinistres avec les bases de données, repère les incohérences (deux véhicules au même endroit le même jour…), et alerte un enquêteur humain sur les cas suspects.",
    mixTech: "IA prédictive classique (scoring de fraude) + LLM pour analyser le récit du sinistre + revue humaine systématique avant toute action."
  }
];

export const PITFALLS: Pitfall[] = [
  {
    id: 'pit-01',
    num: '1',
    title: 'Confondre démo et production',
    text: "Une démo bluffante sur 10 cas ≠ un système qui marche sur 10 000 cas. Demandez les chiffres de fiabilité sur volume réel."
  },
  {
    id: 'pit-02',
    num: '2',
    title: 'Sous-estimer les hallucinations',
    text: "Le modèle invente, c'est sa nature. Sans citation des sources, sans contrôle humain sur les sujets sensibles, vous foncez dans le mur."
  },
  {
    id: 'pit-03',
    num: '3',
    title: 'Laisser sortir vos données',
    text: "Brancher un LLM public sur des données client = risque RGPD majeur. Soit anonymisation, soit modèle hébergé en interne (open source)."
  },
  {
    id: 'pit-04',
    num: '4',
    title: "Croire qu'on va remplacer les experts",
    text: "L'IA augmente, elle ne remplace pas. Le bon ROI vient quand un expert traite 3× plus de dossiers, pas quand on supprime l'expert."
  },
  {
    id: 'pit-05',
    num: '5',
    title: "Acheter de l'IA pour faire de l'IA",
    text: "Si vous ne savez pas dire en une phrase quel problème métier vous résolvez, ne lancez pas le projet. Point."
  },
  {
    id: 'pit-06',
    num: '6',
    title: "Oublier la conduite du changement",
    text: "Vos équipes n'utiliseront pas un outil qu'elles ne comprennent pas. Formation + acculturation = 30% du budget projet, pas une ligne en bas de devis."
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Qu'est-ce qu'une « hallucination » dans le contexte d'un LLM ?",
    options: [
      "Une coupure de courant sur les serveurs d'IA",
      "L'IA qui génère une fausse information (ex: un faux article de loi) avec une assurance totale",
      "Une mauvaise traduction automatique de l'anglais vers le français",
      "Une surchauffe de la carte graphique du serveur"
    ],
    correctAnswer: 1,
    explanation: "Exactement ! Les modèles de langage prédisent des mots et peuvent assembler des phrases parfaitement cohérentes grammaticalement mais factuellement inventées de toutes pièces. C'est le risque n°1."
  },
  {
    id: 2,
    question: "Dans l'assurance, à quoi sert principalement le motif d'architecture RAG ?",
    options: [
      "À générer des fausses photos d'accidents de voiture",
      "À crypter les données sensibles des assurés",
      "À forcer l'IA à piocher sa réponse dans vos propres Conditions Générales et documents internes en direct",
      "À traduire automatiquement vos contrats d'assurance en 45 langues"
    ],
    correctAnswer: 2,
    explanation: "Bravo ! Le RAG (Retrieval Augmented Generation) agit comme un assistant qui consulte vos Conditions Générales sur sa tablette avant de répondre, éliminant ainsi la plupart des hallucinations !"
  },
  {
    id: 3,
    question: "Quelle est la principale caractéristique d'une IA Agentique ?",
    options: [
      "Elle consomme 50% d'électricité en moins",
      "Elle ne fait que conseiller et rédiger des textes marketing",
      "Elle est capable de prendre des initiatives de bout en bout : ouvrir un CRM, envoyer un mail, demander des pièces manquantes",
      "Elle est réservée exclusivement au service juridique"
    ],
    correctAnswer: 2,
    explanation: "C'est ça ! Alors que l'IA Générative crée du texte ou du code suite à un prompt, l'IA Agentique enchaîne les actions sur les systèmes informatiques de manière autonome pour réaliser un processus complet."
  },
  {
    id: 4,
    question: "Qu'est-ce qu'un Token dans la tarification de l'IA ?",
    options: [
      "Un morceau de mot (unité de base lue et facturée par l'IA)",
      "Un jeton physique nécessaire pour lancer l'ordinateur",
      "Une devise de crypto-monnaie utilisée par les assureurs",
      "Un mot de passe à usage unique"
    ],
    correctAnswer: 0,
    explanation: "Tout à fait ! 1 page de contrat d'assurance équivaut à environ 500 tokens. Les API d'IA facturent précisément au nombre de tokens consommés en entrée et en sortie."
  },
  {
    id: 5,
    question: "Pour obtenir le meilleur résultat de l'IA, comment formuler un bon prompt ?",
    options: [
      "Écrire 'Fais-moi un truc sympa et rapide'",
      "Formuler la consigne en donnant un rôle clair, du contexte, des contraintes de format et idéalement un exemple",
      "Écrire exclusivement en anglais et en majuscules",
      "Insérer des formules de politesse multiples pour ne pas froisser l'IA"
    ],
    correctAnswer: 1,
    explanation: "Parfait ! Un bon prompt donne un cadre complet. C'est exactement comme briefer un collègue ou un stagiaire surdoué : plus la consigne est structurée, meilleur est le livrable."
  }
];
