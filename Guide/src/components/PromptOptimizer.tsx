import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Copy, Check, ChevronRight, Wand2, ShieldAlert, Sparkles, AlertCircle } from 'lucide-react';

interface PromptScenario {
  id: string;
  title: string;
  category: string;
  badPrompt: string;
  optimizedPrompt: string;
  explanation: string;
  breakdown: {
    role: string;
    context: string;
    rules: string[];
    format: string;
  };
}

const SCENARIOS: PromptScenario[] = [
  {
    id: 'scen-01',
    title: "Refuser une prise en charge (sinistre exclu)",
    category: "Gestion de Sinistre",
    badPrompt: "rédige un mail au client pour lui dire que son bris de glace est pas couvert car c'est exclu de son contrat.",
    optimizedPrompt: `Tu es un gestionnaire sinistres chevronné, réputé pour ton tact, ton empathie et ta rigueur juridique.

CONTEXTE :
L'assuré M. Martin vient de déclarer un bris de glace sur sa véranda (sinistre n°2026-0814). Après étude, cette vitre spécifique relève d'une exclusion explicite mentionnée à l'article 4.2 des conditions générales (exclut les vérandas et verrières non déclarées à la souscription).

CONSIGNES STRICTES :
1. Rédige un e-mail courtois et extrêmement structuré de refus de prise en charge.
2. Évite absolument les tournures froides ou agressives. Exprime d'abord du regret quant à la situation.
3. Cite expressément l'article 4.2 des CG rédigé ainsi : "Sont exclues de la garantie Bris de Glace les surfaces vitrées horizontales, verrières et vérandas sauf option spécifique souscrite."
4. Propose une solution d'accompagnement constructive : orienter vers notre réseau d'artisans partenaires avec nos tarifs négociés exclusifs (remise de 15% à sa charge).

FORMAT ATTENDU :
- Salutation courtoise.
- Regret initial et rappel bienveillant de la demande.
- Explication claire et rigoureuse du point d'exclusion contractuel (citation exacte du texte).
- Proposition rassurante d'orientation artisan partenaire.
- Signature d'équipe professionnelle.`,
    explanation: "Le mauvais prompt produit un mail court, froid, voire culpabilisant. Le super-prompt donne du style, protège d'un point de vue juridique grâce aux citations exactes, et préserve la relation client grâce à l'empathie structurée.",
    breakdown: {
      role: "Gestionnaire sinistres chevronné (empathie + rigueur)",
      context: "M. Martin, sinistre bris de glace n°2026-0814 exclu par l'article 4.2",
      rules: [
        "Régler par citation exacte de l'article contractuel",
        "Eviter l'agressivité ou la froideur",
        "Proposer l'alternative solidaire (réseau artisans à tarif pro)"
      ],
      format: "Salutation → Regrets → Cadre contrat → Solution partenaire → Signature"
    }
  },
  {
    id: 'scen-02',
    title: "Synthèse de rapport d'expertise complexe",
    category: "Technique",
    badPrompt: "fais moi un résumé court de ce rapport d'expertise décennale de 40 pages stp.",
    optimizedPrompt: `Tu es un ingénieur conseil senior et actuaire d'assurance spécialisé dans la construction décennale.

CONTEXTE :
Tu dois rédiger une note de synthèse exécutive pour le Directeur Indemnisation à partir du rapport d'expertise ci-joint.

CONSIGNES DE SYNTHÈSE :
1. Identifie en priorité les causes techniques réelles des désordres (ex: fissuration due à une sécheresse exceptionnelle ou un défaut de ferraillage).
2. Estime l'imपुटabilité des différentes parties prenantes (architecte, maçon, terrasseur) en pourcentages de responsabilité.
3. Souligne directement s'il y a des garanties optionnelles applicables dans le contrat (ex: Dommages Ouvrage).
4. Alerte immédiatement s'il y a un risque de dépassement de plafond de garantie ou de recours tardif (proche prescription).

FORMAT EXIGÉ :
- SYNTHÈSE RAPIDE : 3 lignes max pour un comité.
- VICES ET SINISTRES : Liste à puces des désordres majeurs.
- RESPONSABILITÉS ET RECOURS : Liste des intervenants et parts de responsabilité estimées.
- POINTS DE VIGILANCE : Focus financiers et juridiques bloquants.`,
    explanation: "Le prompt initial produit un résumé plat qui oublie les enjeux cruciaux de l'assurance (responsabilités de recours, plafonds, garanties d'option). Le super-prompt force l'IA à analyser en expert de l'indemnisation.",
    breakdown: {
      role: "Ingénieur conseil senior et actuaire décennale",
      context: "Rapport d'expertise de 40 pages à résumer pour le Directeur Indemnisation",
      rules: [
        "Isoler les causes réelles",
        "Calculer l'imputabilité en %",
        "Signaler les risques financiers/délais"
      ],
      format: "Synthèse exécutive (3 lignes) → Désordres majeurs → Responsabilités → Vigilance financière"
    }
  },
  {
    id: 'scen-03',
    title: "Interprétation sémantique de CG",
    category: "Support Juridique",
    badPrompt: "cherche dans les CG si un dégât des eaux causé par un aquarium qui éclate est remboursé.",
    optimizedPrompt: `Tu es l'analyste juridique de référence de notre direction des garanties assurance habitation.

CONTEXTE :
Un assuré réclame le remboursement de la détérioration de son parquet massif suite au bris accidentel de son aquarium de 300 litres. Nous devons analyser si ce sinistre entre dans le cadre défini par nos Conditions Générales.

CONSIGNES :
1. Analyse minutieusement la définition sémantique de "Dégât des Eaux" et de "Contenu des locaux" dans nos CG.
2. Détermine si le débordement ou la rupture brutale d'un conteneur d'eau domestique (comme un aquarium) est contractuellement assimilable à une "fuite de canalisation ou d'appareil à effet d'eau".
3. Identifie s'il existe une clause d'exclusion spécifique concernant l'aquariophilie ou les dommages aux revêtements de sol de luxe (parquet massif).
4. Explique pas à pas ton raisonnement juridique en distinguant "les dommages immobiliers" (parquet) et "les dommages meubles" (perte de l'aquarium lui-même).

FORMAT REQUIS :
- CLASSIFICATION DU SINISTRE (Garantie acquise ou non)
- ARGUMENTAIRE SÉMANTIQUE ET CONTRACTUEL
- CLAUSES COMPLÉMENTAIRES OU EXCLUSIONS À VÉRIFIER
- RECOMMANDATION DE GESTION (Payer ou Repousser)`,
    explanation: "L'IA risque de répondre à la va-vite sans regarder les détails sémantiques. Ce super-prompt invite l'IA à disséquer la notion 'effet d'eau' et à distinguer le contenant (aquarium) du parterre (parquet), ce qui est le b-a-ba de la gestion.",
    breakdown: {
      role: "Analyste juridique de la direction des garanties",
      context: "Rupture d'un aquarium de 300 litres ayant détruit du parquet massif",
      rules: [
        "Vérifier s'accorde au 'dégât des eaux' (fuite d'appareil à effet d'eau)",
        "Distinguer immobilier (parquet) et mobilier (perte de l'aquarium)",
        "Identifier toute exclusion de luxe ou aquariophilie"
      ],
      format: "Classification → Argumentaire sémantique → Risques exclusions → Recommandation finale"
    }
  }
];

export default function PromptOptimizer() {
  const [selectedScen, setSelectedScen] = useState<PromptScenario>(SCENARIOS[0]);
  const [copied, setCopied] = useState(false);

  // Custom prompting playground state
  const [customBrief, setCustomBrief] = useState('');
  const [customStructuredPrompt, setCustomStructuredPrompt] = useState('');

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const generateCustomTemplate = () => {
    if (!customBrief.trim()) return;
    const template = `Tu es un expert d'assurance spécialisé dans la gestion de : "${customBrief}"

CONTEXTE :
[Rédige en 2 phrases de quoi il s'agit exactement : clients concernés, historique, enjeux.]

CONSIGNES MÉTIER STRICTES :
1. Précise le premier point de vérification essentiel lié à cette tâche.
2. Identifie les risques d'erreur à éviter absolument selon nos règles d'assurance.
3. Propose une alternative ou une solution constructive si le cas de base échoue.

FORMAT CONTRACTUEL ATTENDU :
- ANALYSE RAPIDE DE CONCORDANCE
- MÉTHODE D'ACTION RECOMMANDÉE
- FORMULATION PROMPTE SÉCURISÉE (Prêt à copier)`;
    
    setCustomStructuredPrompt(template);
  };

  return (
    <section id="prompt-builder" className="py-24 px-6 md:px-12 lg:px-24 bg-[#0A1428] text-[#FAF6EE] border-b-4 border-[#0A1428]">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center md:text-left mb-16">
          <span className="font-mono text-xs text-[#FFC420] font-black uppercase tracking-widest block mb-4">
            03.5 — L'outil magique
          </span>
          <h2 className="font-display font-black text-4xl md:text-7xl leading-none mb-6">
            Le prompt-o-mètre <span className="font-serif italic font-normal text-[#FFD93D]">du manager</span>.
          </h2>
          <p className="text-xl text-[#FAF6EE]/80 max-w-3xl leading-relaxed">
            Un bon prompt, c'est comme un brief de stagiaire : si vous dites juste "fait un résumé", attendez-vous à un travail approximatif. Testez ces cas réels assurance et apprenez à structurer des consignes de pro.
          </p>
        </div>

        {/* COMPONENT INTERACTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          
          {/* Left panel: Selector and Bad Prompt */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-[#FAF6EE] text-[#0A1428] border-2 border-[#0A1428] rounded-2xl p-6 shadow-[4px_4px_0_#FFD93D]">
              <h3 className="font-display font-black text-lg mb-4 flex items-center gap-2">
                <Sparkles size={18} className="text-[#FF5A36]" />
                Choisissez un scénario :
              </h3>
              <div className="flex flex-col gap-2.5">
                {SCENARIOS.map((scen) => (
                  <button
                    key={scen.id}
                    onClick={() => { setSelectedScen(scen); setCopied(false); }}
                    className={`w-full text-left p-3.5 rounded-xl border-2 transition-all flex items-center justify-between font-sans text-sm font-bold ${
                      selectedScen.id === scen.id
                        ? 'bg-[#FF5A36] text-white border-[#0A1428] translate-y-0.5'
                        : 'bg-white text-[#0A1428] border-gray-200 hover:border-[#0A1428]'
                    }`}
                  >
                    <span>{scen.title}</span>
                    <ChevronRight size={16} />
                  </button>
                ))}
              </div>
            </div>

            {/* Bad Prompt Box */}
            <div className="bg-red-500/10 border-2 border-red-500/30 rounded-2xl p-6 relative overflow-hidden">
              <span className="absolute top-4 right-4 text-red-400 opacity-60">
                <ShieldAlert size={28} />
              </span>
              <span className="font-mono text-[10px] text-red-400 font-bold uppercase tracking-wider block mb-2">
                ❌ LE BRIEF FAIBLE (Aucun résultat structurant)
              </span>
              <p className="font-mono text-sm text-[#FAF6EE]/90 italic bg-black/35 p-3.5 rounded-lg border border-red-500/20">
                "{selectedScen.badPrompt}"
              </p>
              <p className="text-xs text-red-300 mt-3 font-sans leading-relaxed">
                <strong>Pourquoi il échoue :</strong> Aucun rôle défini, aucun contexte sémantique, aucune clause juridique précise fournie. L'IA va répondre sur Wikipedia de manière stérile.
              </p>
            </div>
          </div>

          {/* Right panel: Comparative Super-Prompt */}
          <div className="lg:col-span-7 bg-[#FAF6EE] text-[#0A1428] border-4 border-[#0A1428] rounded-2xl p-8 shadow-[8px_8px_0_#FF5A36] flex flex-col justify-between self-stretch">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-dashed border-[#0A1428]/20 pb-4 mb-6">
                <div>
                  <span className="font-mono text-[10px] bg-[#00C49A] text-[#0A1428] font-black px-2.5 py-1 rounded uppercase tracking-wider">
                    ★ LE SUPER-PROMPT OPTIMISÉ (Garantie de qualité)
                  </span>
                  <h4 className="font-display font-black text-xl text-[#0A1428] mt-2">
                    {selectedScen.title}
                  </h4>
                </div>
                
                <button
                  onClick={() => handleCopy(selectedScen.optimizedPrompt)}
                  className="flex items-center gap-2 bg-[#FF5A36] text-white py-2 px-3.5 rounded-lg font-mono text-xs font-bold border-2 border-[#0A1428] shadow-[2px_2px_0_#0A1428] hover:-translate-y-0.5 active:translate-y-0.5 transition-all w-fit"
                >
                  {copied ? (
                    <>
                      <Check size={14} className="text-[#00C49A]" /> Copié !
                    </>
                  ) : (
                    <>
                      <Copy size={14} /> Copier le Prompt
                    </>
                  )}
                </button>
              </div>

              {/* Anatomy Breakdown */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-white border border-[#0A1428]/15 p-4 rounded-xl mb-6">
                <div className="border-r border-[#0A1428]/10 pr-2">
                  <span className="block text-[8px] font-mono text-gray-400 uppercase tracking-widest leading-none mb-1">
                    01. Rôle requis
                  </span>
                  <span className="font-sans font-bold text-xs text-[#0A1428] leading-tight block">
                    {selectedScen.breakdown.role}
                  </span>
                </div>
                <div className="border-r border-[#0A1428]/10 px-2">
                  <span className="block text-[8px] font-mono text-gray-400 uppercase tracking-widest leading-none mb-1">
                    02. Contexte
                  </span>
                  <span className="font-sans font-bold text-xs text-[#2E1B7A] leading-tight block">
                    {selectedScen.breakdown.context}
                  </span>
                </div>
                <div className="border-r border-[#0A1428]/10 px-2 col-span-2 sm:col-span-1">
                  <span className="block text-[8px] font-mono text-gray-400 uppercase tracking-widest leading-none mb-1">
                    03. Règles assurance
                  </span>
                  <span className="font-sans font-medium text-[10px] text-[#FF5A36] leading-none block">
                    {selectedScen.breakdown.rules.length} règles métier intégrées
                  </span>
                </div>
                <div className="px-2">
                  <span className="block text-[8px] font-mono text-gray-400 uppercase tracking-widest leading-none mb-1">
                    04. Format cible
                  </span>
                  <span className="font-mono text-xs text-[#00C49A] font-black block">
                    Défini pas à pas
                  </span>
                </div>
              </div>

              {/* Real Prompt Content display */}
              <div className="bg-white border-2 border-[#0A1428] p-5 rounded-xl font-mono text-xs leading-relaxed max-h-[280px] overflow-y-auto block relative">
                <pre className="whitespace-pre-wrap font-mono text-[#0A1428]">
                  {selectedScen.optimizedPrompt}
                </pre>
              </div>
            </div>

            <p className="font-sans text-xs text-gray-500 mt-6 pt-3 border-t border-dashed border-[#0A1428]/20 italic">
              💡 <strong>L'Impact :</strong> {selectedScen.explanation}
            </p>
          </div>

        </div>

        {/* CUSTOM BRIEF GENERATOR */}
        <div className="bg-[#FAF6EE]/5 border-2 border-white/20 rounded-3xl p-8 max-w-4xl mx-auto backdrop-blur">
          <div className="flex items-center gap-3 mb-4">
            <span className="p-2.5 bg-[#FFD93D] rounded-xl text-[#0A1428]">
              <Wand2 size={20} />
            </span>
            <div>
              <h4 className="font-display font-black text-xl text-white">
                Besoin d'un prompt métier personnalisé ?
              </h4>
              <p className="text-xs text-[#FAF6EE]/70 font-sans">
                Entrez votre tâche métier d'assurance ci-dessous, notre générateur de structure calibrera le prompt idéal.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <input
              type="text"
              placeholder="ex: Rédiger un médaillon d'exclusion PJ ou modérer une réclamation assurance vie..."
              value={customBrief}
              onChange={(e) => setCustomBrief(e.target.value)}
              className="flex-1 bg-white/10 text-white placeholder:text-white/40 border border-white/20 rounded-xl px-4 py-3 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-[#FF5A36] focus:border-transparent"
            />
            <button
              onClick={generateCustomTemplate}
              className="bg-[#00C49A] text-[#0A1428] font-mono text-xs font-black border-2 border-[#0A1428] py-3 px-6 rounded-xl hover:-translate-y-0.5 active:translate-y-0.5 shadow-[3px_3px_0_white] transition-all"
            >
              GÉNÉRER MÉTARIULE
            </button>
          </div>

          {customStructuredPrompt && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white text-[#0A1428] border-2 border-[#0A1428] p-6 rounded-2xl relative shadow-[3px_3px_0_#00C49A]"
            >
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={() => handleCopy(customStructuredPrompt)}
                  className="bg-[#FF5A36] text-white text-[10px] font-mono py-1.5 px-3 rounded-lg border border-[#0A1428]"
                >
                  Copier ce modèle
                </button>
              </div>
              <h5 className="font-display font-black text-sm text-[#0A1428] mb-3 flex items-center gap-1.5 uppercase tracking-wide">
                <AlertCircle size={14} className="text-[#FF5A36]" /> Votre canevas prêt-à-configurer :
              </h5>
              <pre className="font-mono text-xs whitespace-pre-wrap max-h-[300px] overflow-y-auto leading-relaxed bg-[#FAF6EE]/70 p-4 border rounded border-gray-200">
                {customStructuredPrompt}
              </pre>
            </motion.div>
          )}
        </div>

      </div>
    </section>
  );
}
