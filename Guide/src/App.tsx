import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Brain, 
  Sparkles, 
  Calculator, 
  PenTool, 
  Search, 
  ChevronRight, 
  ChevronDown, 
  Check, 
  Copy, 
  AlertTriangle, 
  HelpCircle, 
  ArrowRight,
  ShieldCheck, 
  Info,
  Layers,
  Zap,
  BookOpen,
  ClipboardList
} from 'lucide-react';

import Header from './components/Header';
import GlossarySection from './components/GlossarySection';
import PromptOptimizer from './components/PromptOptimizer';
import QuizSection from './components/QuizSection';

import { USE_CASES, PITFALLS, GLOSSARY } from './data';

export default function App() {
  const [cheatSearch, setCheatSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'essential' | 'advanced'>('all');
  const [copiedTerm, setCopiedTerm] = useState<string | null>(null);

  const handleCopy = (text: string, term: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedTerm(term);
      setTimeout(() => setCopiedTerm(null), 2000);
    });
  };

  // Filter cheat sheet items
  const filteredCheatSheet = GLOSSARY.filter(item => {
    const searchStr = `${item.term} ${item.acronym} ${item.metaphor}`.toLowerCase();
    const matchesSearch = searchStr.includes(cheatSearch.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'essential') {
      return matchesSearch && (item.category === 'Fondations');
    }
    return matchesSearch && (item.category === 'Architecture' || item.category === 'Fiabilité');
  });

  return (
    <div className="min-h-screen bg-[#FAF6EE] text-[#0A1428] selection:bg-[#FFD93D] selection:text-[#0A1428]">
      {/* 1. HEADER & HERO */}
      <Header />

      {/* ============== 01. INTRODUCTION ============== */}
      <section id="intro" className="py-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto border-b-2 border-[#0A1428]/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Section Left Title column */}
          <div className="lg:col-span-5">
            <span className="font-mono text-xs text-[#FF5A36] font-black uppercase tracking-widest block mb-4">
              01 — Commençons par le début
            </span>
            <h2 className="font-display font-black text-4xl md:text-7xl leading-none text-[#0A1428] mb-8">
              C'est quoi l'IA,<br />
              <span className="font-serif italic font-normal text-[#FF5A36]">au juste</span> ?
            </h2>
            <div className="text-xl text-[#2A3142] leading-relaxed mb-6 space-y-4 font-sans">
              <p>
                Oublions le fantasme des robots de science-fiction. L'IA d'aujourd'hui est avant tout une formidable <strong>machine à repérer des motifs sémantiques</strong> dans des gigaoctets de données.
              </p>
              <p className="text-base text-gray-500 font-normal leading-relaxed">
                Depuis fin 2022, elle s'est démocratisée sous forme d'une <strong>IA générative</strong> capable de rédiger, synthétiser et analyser du texte ou de l'image aussi bien qu'un collaborateur humain, en seulement quelques secondes.
              </p>
            </div>
          </div>

          {/* Section Right Metaphors & Cards */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            {/* Main Metaphor Box */}
            <div className="bg-[#FF5A36] text-[#0A1428] p-8 md:p-10 rounded-2xl border-4 border-[#0A1428] shadow-[6px_6px_0_#0A1428] relative overflow-hidden">
              <span className="font-mono text-[9px] font-black text-[#0A1428] uppercase tracking-widest bg-white border border-[#0A1428] py-1 px-3 rounded-full inline-block mb-4">
                → LA MÉTAPHORE DE RÉFÉRENCE
              </span>
              <p className="font-serif italic text-2xl md:text-3xl leading-snug text-[#0A1428] mb-6">
                "Imaginez un stagiaire surdoué qui aurait lu Wikipedia, la moitié d'Internet et tous vos manuels d'assurance. Il ne dort jamais, répond en 3 secondes, mais se trompe parfois avec aplomb."
              </p>
              <p className="font-sans text-xs font-bold uppercase text-[#FAF6EE] border-t border-[#0A1428]/25 pt-4">
                Tout votre rôle de manager tient là-dedans : savoir quand et comment lui faire confiance.
              </p>
            </div>

            {/* Split cards: Classic vs Generative */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Card 1: Classic */}
              <div className="bg-[#FFD93D] border-2 border-[#0A1428] rounded-2xl p-6.5 shadow-[4px_4px_0_#0A1428] hover:-translate-y-0.5 transition-transform flex flex-col justify-between">
                <div>
                  <span className="p-2 bg-white rounded-lg border border-[#0A1428] inline-block mb-4">
                    <Calculator size={18} className="text-[#FF5A36]" />
                  </span>
                  <h3 className="font-display font-black text-2xl mb-1 text-[#0A1428]">
                    L'IA classique
                  </h3>
                  <p className="font-serif italic text-xs text-[#0A1428]/70 mb-4 block">
                    — Le statisticien turbo
                  </p>
                  <p className="text-xs text-[#0A1428] mb-6 font-medium leading-relaxed">
                    Elle prédit, classe, score. Elle existe depuis des décennies et fait tourner vos outils de tarification internes au quotidien.
                  </p>
                </div>
                <ul className="space-y-2 border-t border-dashed border-[#0A1428]/20 pt-4 font-mono text-[11px] font-bold text-[#0A1428]">
                  <li className="flex gap-2 items-start">
                    <span className="text-red-500">→</span> Scorer un risque à la souscription
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="text-red-500">→</span> Détecter une fraude organisée
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="text-red-500">→</span> Estimer le coût moyen d'un sinistre
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="text-red-500">→</span> Segmenter le portefeuille client
                  </li>
                </ul>
              </div>

              {/* Card 2: Generative */}
              <div className="bg-[#C8F3E6] border-2 border-[#0A1428] rounded-2xl p-6.5 shadow-[4px_4px_0_#0A1428] hover:-translate-y-0.5 transition-transform flex flex-col justify-between">
                <div>
                  <span className="p-2 bg-white rounded-lg border border-[#0A1428] inline-block mb-4">
                    <PenTool size={18} className="text-[#2E1B7A]" />
                  </span>
                  <h3 className="font-display font-black text-2xl mb-1 text-[#0A1428]">
                    L'IA générative
                  </h3>
                  <p className="font-serif italic text-xs text-[#0A1428]/70 mb-4 block">
                    — Le rédacteur infatigable
                  </p>
                  <p className="text-xs text-[#0A1428] mb-6 font-medium leading-relaxed">
                    Elle crée du texte original, des synthèses, des mails de réponse ou du code à partir d'un brief verbal. Le saut technologique post-2022.
                  </p>
                </div>
                <ul className="space-y-2 border-t border-dashed border-[#0A1428]/20 pt-4 font-mono text-[11px] font-bold text-[#0A1428]">
                  <li className="flex gap-2 items-start">
                    <span className="text-[#2E1B7A]">→</span> Rédiger un courrier de refus motivé
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="text-[#2E1B7A]">→</span> Synthétiser un dossier contractuel
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="text-[#2E1B7A]">→</span> Traduire un rapport d'expert
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="text-[#2E1B7A]">→</span> Brainstormer des argumentaires
                  </li>
                </ul>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ============== 02. LES TROIS FAMILLES ============== */}
      <section id="familles" className="py-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto border-b-2 border-[#0A1428]/10">
        <div className="text-center md:text-left mb-16">
          <span className="font-mono text-xs text-[#FF5A36] font-black uppercase tracking-widest block mb-4">
            02 — Les grandes familles de l'IA
          </span>
          <h2 className="font-display font-black text-4xl md:text-7xl leading-none text-[#0A1428] mb-6">
            Trois <span className="font-serif italic font-normal text-[#FF5A36]">vagues</span> d'IA<br />
            en un coup d'œil.
          </h2>
          <p className="text-xl text-[#2A3142] max-w-2xl leading-relaxed">
            Lorsque l'on parle d'intégration d'intelligence artificielle dans l'assurance, on fait souvent l'amalgame. Voici comment situer le sujet précisément.
          </p>
        </div>

        {/* TIMELINE SCHÉMA VECTORIEL */}
        <div className="bg-white border-2 border-[#0A1428] rounded-3xl p-6 md:p-10 mb-16 shadow-[6px_6px_0_#0A1428] overflow-x-auto">
          <h4 className="font-display font-black text-xl mb-1 text-[#0A1428]">
            L'évolution en 3 vagues successives
          </h4>
          <p className="font-serif italic text-xs text-gray-500 mb-8">
            Chaque génération ne remplace pas la précédente — elle s'empile dessus, comme les strates d'un orchestre symphonique.
          </p>

          <div className="min-w-[700px]">
            <svg viewBox="0 0 900 280" className="w-full h-auto select-none" xmlns="http://www.w3.org/2000/svg">
              {/* Timeline line */}
              <line x1="80" y1="180" x2="820" y2="180" stroke="#0A1428" strokeWidth="4" />
              <line x1="80" y1="180" x2="820" y2="180" stroke="#FAF6EE" strokeWidth="4" strokeDasharray="3,12" />

              {/* Wave 1: Predictive */}
              <g className="cursor-pointer transform hover:translate-y-[-2px] transition-transform duration-200">
                <circle cx="180" cy="180" r="26" fill="#FFD93D" stroke="#0A1428" strokeWidth="3"/>
                <text x="180" y="186" textAnchor="middle" fontFamily="'Bricolage Grotesque'" fontWeight="800" fontSize="16" fill="#0A1428">1</text>
                <text x="180" y="130" textAnchor="middle" fontFamily="'Bricolage Grotesque'" fontWeight="800" fontSize="18" fill="#0A1428">Prédictive</text>
                <text x="180" y="105" textAnchor="middle" fontFamily="'JetBrains Mono'" fontSize="11" fontWeight="bold" fill="#FF5A36">DEPUIS 1990s</text>
                <text x="180" y="225" textAnchor="middle" fontFamily="'Fraunces'" fontStyle="italic" fontSize="13" fill="#2A3142">"Calcule, classe,</text>
                <text x="180" y="243" textAnchor="middle" fontFamily="'Fraunces'" fontStyle="italic" fontSize="13" fill="#2A3142">estime et scoring"</text>
              </g>

              {/* Wave 2: Generative */}
              <g className="cursor-pointer transform hover:translate-y-[-2px] transition-transform duration-200">
                <circle cx="450" cy="180" r="32" fill="#FF5A36" stroke="#0A1428" strokeWidth="3"/>
                <text x="450" y="187" textAnchor="middle" fontFamily="'Bricolage Grotesque'" fontWeight="800" fontSize="20" fill="#0A1428">2</text>
                <text x="450" y="125" textAnchor="middle" fontFamily="'Bricolage Grotesque'" fontWeight="800" fontSize="20" fill="#0A1428">Générative</text>
                <text x="450" y="100" textAnchor="middle" fontFamily="'JetBrains Mono'" fontSize="11" fontWeight="bold" fill="#0A1428">DEPUIS 2022</text>
                <text x="450" y="228" textAnchor="middle" fontFamily="'Fraunces'" fontStyle="italic" fontSize="13" fill="#2A3142">"Génère du texte,</text>
                <text x="450" y="246" textAnchor="middle" fontFamily="'Fraunces'" fontStyle="italic" fontSize="13" fill="#2A3142">du code, des images"</text>
              </g>

              {/* Wave 3: Agentic */}
              <g className="cursor-pointer transform hover:translate-y-[-2px] transition-transform duration-200">
                <circle cx="720" cy="180" r="36" fill="#00C49A" stroke="#0A1428" strokeWidth="3"/>
                <text x="720" y="188" textAnchor="middle" fontFamily="'Bricolage Grotesque'" fontWeight="800" fontSize="22" fill="#0A1428">3</text>
                <text x="720" y="122" textAnchor="middle" fontFamily="'Bricolage Grotesque'" fontWeight="800" fontSize="22" fill="#0A1428">Agentique</text>
                <text x="720" y="98" textAnchor="middle" fontFamily="'JetBrains Mono'" fontSize="11" fontWeight="bold" fill="#2E1B7A">DEPUIS 2025/2026</text>
                <text x="720" y="230" textAnchor="middle" fontFamily="'Fraunces'" fontStyle="italic" fontSize="13" fill="#2A3142">"Enchaîne les actions,</text>
                <text x="720" y="248" textAnchor="middle" fontFamily="'Fraunces'" fontStyle="italic" fontSize="13" fill="#2A3142">navigue et décide"</text>
              </g>

              {/* Direction arrow at end */}
              <path d="M 830 180 L 855 180" stroke="#0A1428" strokeWidth="4" />
              <path d="M 848 172 L 858 180 L 848 188" stroke="#0A1428" strokeWidth="4" fill="none" />
            </svg>
          </div>
        </div>

        {/* 3 FAMILY CARDS - ASSURANCES DETAILS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <div className="bg-[#FAF6EE] border-2 border-[#0A1428] rounded-2xl p-8 relative shadow-[4px_4px_0_#FFD93D] flex flex-col justify-between hover:translate-y-[-2px] transition-all">
            <div>
              <span className="h-10 w-10 bg-[#FFD93D] rounded-full flex items-center justify-center font-mono font-black text-lg text-[#0A1428] border-2 border-[#0A1428] mb-6">
                ∑
              </span>
              <h4 className="font-display font-black text-2xl text-[#0A1428] mb-1">
                L'IA Prédictive
              </h4>
              <p className="font-serif italic text-xs text-gray-500 mb-4">
                — L'aide-actuaire infatigable
              </p>
              <p className="text-sm text-[#2A3142] mb-6 leading-relaxed">
                Elle tire parti d'antécédents massifs et structurés pour attribuer un chiffre fiable à un événement futur : tarification de prime, probabilité sémantique de fraude.
              </p>
            </div>
            <div className="border-t border-[#0A1428]/10 pt-4 mt-4 bg-white/40 p-4 rounded-xl">
              <span className="block font-mono text-[9px] text-[#FF5A36] font-black uppercase tracking-widest mb-2">
                EXEMPLE PRATIQUE :
              </span>
              <p className="text-xs font-sans text-[#0A1428] font-semibold leading-relaxed">
                Calcul dynamique de tarification prédictive selon 120 critères (âge moyen de conduite, localisation, historique bonus ...).
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-[#FAF6EE] border-2 border-[#0A1428] rounded-2xl p-8 relative shadow-[4px_4px_0_#FF5A36] flex flex-col justify-between hover:translate-y-[-2px] transition-all">
            <div>
              <span className="h-10 w-10 bg-[#FF5A36] rounded-full flex items-center justify-center font-mono font-black text-lg text-white border-2 border-[#0A1428] mb-6">
                ✎
              </span>
              <h4 className="font-display font-black text-2xl text-[#0A1428] mb-1">
                L'IA Générative
              </h4>
              <p className="font-serif italic text-xs text-gray-500 mb-4">
                — Le secrétaire survolté
              </p>
              <p className="text-sm text-[#2A3142] mb-6 leading-relaxed">
                Elle crée des synthèses sémantiques ou du contenu de toutes pièces basés sur un cahier de consignes écrit. Sans programmation ardue.
              </p>
            </div>
            <div className="border-t border-[#0A1428]/10 pt-4 mt-4 bg-white/40 p-4 rounded-xl">
              <span className="block font-mono text-[9px] text-[#2E1B7A] font-black uppercase tracking-widest mb-2">
                EXEMPLE PRATIQUE :
              </span>
              <p className="text-xs font-sans text-[#0A1428] font-semibold leading-relaxed">
                Un gestionnaire tape : "Rédige le courrier de résiliation motivé suite au non-paiement pour le dossier 2026-X8". L'e-mail est rédigé en 15 secondes.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-[#FAF6EE] border-2 border-[#0A1428] rounded-2xl p-8 relative shadow-[4px_4px_0_#00C49A] flex flex-col justify-between hover:translate-y-[-2px] transition-all">
            <div>
              <span className="h-10 w-10 bg-[#00C49A] rounded-full flex items-center justify-center font-mono font-black text-lg text-[#0A1428] border-2 border-[#0A1428] mb-6">
                ⚡
              </span>
              <h4 className="font-display font-black text-2xl text-[#0A1428] mb-1">
                L'IA Agentique
              </h4>
              <p className="font-serif italic text-xs text-gray-500 mb-4">
                — L'assistant autonome
              </p>
              <p className="text-sm text-[#2A3142] mb-6 leading-relaxed">
                Elle ne se contente pas de converser : elle se connecte aux applications, remplit des formulaires, prend des décisions rationnelles et coordonne un workflow entier.
              </p>
            </div>
            <div className="border-t border-[#0A1428]/10 pt-4 mt-4 bg-white/40 p-4 rounded-xl">
              <span className="block font-mono text-[9px] text-[#00C49A] font-black uppercase tracking-widest mb-2">
                EXEMPLE PRATIQUE :
              </span>
              <p className="text-xs font-sans text-[#0A1428] font-semibold leading-relaxed">
                L'IA reçoit le devis bris de glace, interroge le contrat, appelle un artisan, bloque le rendez-vous dans le calendrier et envoie la validation.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ============== 03. LE JARGON (INJECTED SECTION + RAG CHART) ============== */}
      <GlossarySection />

      {/* RAG BONUS VISUALIZATION DESESCALADE */}
      <section className="py-12 px-6 md:px-12 lg:px-24 bg-white border-t border-b border-[#0A1428]/10">
        <div className="max-w-4xl mx-auto text-center">
          <span className="font-mono text-xs text-[#FF5A36] font-black uppercase tracking-widest block mb-1">
            SCHÉMA EXPLICATIF DE SYNTHÈSE
          </span>
          <h3 className="font-display font-black text-2xl md:text-4xl text-[#0A1428] mb-3">
            Comment fonctionne concrètement le RAG ?
          </h3>
          <p className="font-serif italic text-xs text-gray-500 mb-10 max-w-xl mx-auto">
            Le RAG permet de donner à l'IA un "bureau rangé" avec vos documents officiels, ce qui coupe court aux hallucinations et erreurs factuelles.
          </p>

          <div className="border-2 border-[#0A1428] rounded-2xl p-4 md:p-8 bg-[#FAF6EE] shadow-[4px_4px_0_#0A1428]">
            <svg viewBox="0 0 900 320" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              {/* Question card */}
              <g className="transform hover:scale-[1.01] transition-transform">
                <rect x="20" y="110" width="130" height="70" rx="10" fill="#FFD93D" stroke="#0A1428" strokeWidth="3.5"/>
                <text x="85" y="142" textAnchor="middle" fontFamily="'Bricolage Grotesque'" fontWeight="800" fontSize="14" fill="#0A1428">Question</text>
                <text x="85" y="160" textAnchor="middle" fontFamily="'Manrope'" fontWeight="600" fontSize="10" fill="#0A1428">"M. Martin couvert ?"</text>
              </g>

              {/* Arrow */}
              <path d="M 155 145 L 200 145" stroke="#0A1428" strokeWidth="3" fill="none" />
              <polygon points="195,140 205,145 195,150" fill="#0A1428" />

              {/* Vector space */}
              <g>
                <rect x="205" y="110" width="150" height="70" rx="10" fill="#FFE4DC" stroke="#0A1428" strokeWidth="3.5"/>
                <text x="280" y="140" textAnchor="middle" fontFamily="'Bricolage Grotesque'" fontWeight="800" fontSize="13" fill="#0A1428">Recherche</text>
                <text x="280" y="158" textAnchor="middle" fontFamily="'JetBrains Mono'" fontWeight="bold" fontSize="10" fill="#2A3142">poids sémantiques</text>
              </g>

              {/* Arrow */}
              <path d="M 360 145 L 405 145" stroke="#0A1428" strokeWidth="3" fill="none" />
              <polygon points="400,140 410,145 400,150" fill="#0A1428" />

              {/* Document Base */}
              <g>
                <rect x="410" y="70" width="180" height="150" rx="12" fill="#C8F3E6" stroke="#0A1428" strokeWidth="3.5"/>
                <text x="500" y="105" textAnchor="middle" fontFamily="'Bricolage Grotesque'" fontWeight="800" fontSize="15" fill="#0A1428">Base de Données</text>
                <text x="500" y="130" textAnchor="middle" fontFamily="'Fraunces'" fontStyle="italic" fontSize="12" fill="#0A1428">Conditions Générales</text>
                <text x="500" y="150" textAnchor="middle" fontFamily="'Fraunces'" fontStyle="italic" fontSize="12" fill="#00C49A">Tarifs Assurances</text>
                <text x="500" y="170" textAnchor="middle" fontFamily="'Fraunces'" fontStyle="italic" fontSize="12" fill="#0A1428">Règles internes</text>
                <text x="500" y="195" textAnchor="middle" fontFamily="'JetBrains Mono'" fontSize="9" fontWeight="bold" fill="#2E1B7A">Extrait contextualisé</text>
              </g>

              {/* Arrow */}
              <path d="M 595 145 L 640 145" stroke="#0A1428" strokeWidth="3" fill="none" />
              <polygon points="635,140 645,145 635,150" fill="#0A1428" />

              {/* Model processing */}
              <g>
                <rect x="645" y="70" width="180" height="150" rx="12" fill="#2E1B7A" stroke="#0A1428" strokeWidth="3.5"/>
                <text x="735" y="105" textAnchor="middle" fontFamily="'Bricolage Grotesque'" fontWeight="800" fontSize="16" fill="#FAF6EE">LLM "Le Cerveau"</text>
                <text x="735" y="130" textAnchor="middle" fontFamily="'Fraunces'" fontStyle="italic" fontSize="12" fill="#FFD93D">(Gemini/Claude)</text>
                <text x="735" y="160" textAnchor="middle" fontFamily="'Manrope'" fontSize="10" fill="#FAF6EE">Rédige la réponse</text>
                <text x="735" y="178" textAnchor="middle" fontFamily="'Manrope'" fontSize="10" fill="#FAF6EE">en se basant uniquement</text>
                <text x="735" y="196" textAnchor="middle" fontFamily="'Manrope'" fontSize="10" fill="#FAF6EE">sur les textes transmis</text>
              </g>

              {/* Desescalade dashed loop line to user */}
              <path d="M 735 220 L 735 270 L 85 270 L 85 185" stroke="#FF5A36" strokeWidth="3" strokeDasharray="6,6" fill="none" />
              <polygon points="90,195 85,183 80,195" fill="#FF5A36" />
              <text x="410" y="295" textAnchor="middle" fontFamily="'Fraunces'" fontStyle="italic" fontSize="14" fill="#FF5A36">Réponse fiable à 99% — pas d'invention d'articles !</text>
            </svg>
          </div>
        </div>
      </section>

      {/* ============== 03.5 PLAYGROUND PROMPT OPTIMIZER ============== */}
      <PromptOptimizer />

      {/* ============== 04. CAS CONCRETS ============== */}
      <section id="cas" className="py-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto border-b-2 border-[#0A1428]/10">
        <div className="text-center md:text-left mb-16">
          <span className="font-mono text-xs text-[#FF5A36] font-black uppercase tracking-widest block mb-4">
            04 — Au quotidien dans les équipes
          </span>
          <h2 className="font-display font-black text-4xl md:text-7xl leading-none text-[#0A1428] mb-6">
            4 cas concrets <span className="font-serif italic font-normal text-[#FF5A36]">déployés</span><br />
            dans l'assurance.
          </h2>
          <p className="text-xl text-[#2A3142] max-w-2xl leading-relaxed">
            Pas de théorie fumeuse. Voici comment l’Intelligence Artificielle est concrètement intégrée par les assureurs aujourd'hui.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {USE_CASES.map((uc) => (
            <div 
              key={uc.id}
              className="bg-white border-2 border-[#0A1428] rounded-2xl p-8 shadow-[5px_5px_0_#0A1428] relative hover:translate-y-[-2px] transition-all flex flex-col justify-between"
            >
              <div>
                <span className="font-display font-black text-5xl text-[#FF5A36] block mb-4 leading-none">
                  {uc.num}
                </span>
                <h4 className="font-display font-black text-2xl text-[#0A1428] mb-4">
                  {uc.title}
                </h4>
                <p className="text-sm text-[#2A3142] leading-relaxed mb-6">
                  {uc.description}
                </p>
              </div>

              <div className="border-t border-dashed border-[#0A1428]/15 pt-5 mt-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="h-4 w-4 rounded-full bg-[#00C49A] flex items-center justify-center text-[10px] text-[#0A1428]" />
                  <span className="font-mono text-[10px] text-[#0A1428] font-bold uppercase tracking-wider">
                    L'INGRÉDIENT DU JARGON REQUIS
                  </span>
                </div>
                <p className="text-xs text-gray-500 font-sans leading-relaxed italic">
                  {uc.mixTech}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============== 05. PIÈGES ============== */}
      <section id="pieges" className="py-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto border-b-2 border-[#0A1428]/10">
        <div className="text-center md:text-left mb-16">
          <span className="font-mono text-xs text-[#FF5A36] font-black uppercase tracking-widest block mb-4">
            05 — Pour ne pas se faire avoir
          </span>
          <h2 className="font-display font-black text-4xl md:text-7xl leading-none text-[#0A1428] mb-6">
            Les 6 <span className="font-serif italic font-normal text-[#FF5A36]">idées reçues</span><br />
            & pièges classiques.
          </h2>
          <p className="text-xl text-[#2A3142] max-w-2xl leading-relaxed">
            De nombreux projets IA se soldent par un échec à cause de ces 6 méprises fondamentales. Comprenez-les pour sécuriser vos budgets.
          </p>
        </div>

        {/* PIEGE GRILLE DOREE/JAUNE */}
        <div className="bg-[#FFD93D] border-4 border-[#0A1428] rounded-3xl p-8 md:p-12 shadow-[8px_8px_0_#0A1428]">
          <h3 className="font-display font-black text-3xl text-[#0A1428] mb-10 flex items-center gap-3">
            <span className="p-1 px-3.5 bg-white border-2 border-[#0A1428] rounded-xl text-xs font-mono font-bold tracking-widest">A RETENIR</span>
            Avant de valider un budget d'innovation
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PITFALLS.map((pit) => (
              <div 
                key={pit.id}
                className="bg-black/5 p-6 rounded-xl border-l-[6px] border-[#0A1428] hover:bg-black/10 transition-colors flex flex-col gap-2"
              >
                <span className="font-mono text-xs font-black text-[#FF5A36] mb-1">
                  ER-0{pit.num}
                </span>
                <h4 className="font-display font-black text-lg text-[#0A1428] leading-tight">
                  {pit.title}
                </h4>
                <p className="text-xs text-[#0A1428]/85 font-sans leading-relaxed">
                  {pit.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============== CHEAT SHEET FEUILLE DE TRICHE ============== */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-[#FAF6EE] max-w-7xl mx-auto">
        <div className="text-center md:text-left mb-16">
          <span className="font-mono text-xs text-[#FF5A36] font-black uppercase tracking-widest block mb-4">
            RÉPERTOIRE RAPIDE
          </span>
          <h2 className="font-display font-black text-4xl md:text-7xl leading-none text-[#0A1428] mb-4">
            La feuille de triche,<br />
            <span className="font-serif italic font-normal text-[#FF5A36]">pour la route</span>.
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl">
            Un outil rapide à dégainer en pleine réunion. Filtrez et cherchez une notion à l'aide de sa traduction et sa métaphore.
          </p>
        </div>

        {/* INTERACTIVE TABLE ACCENTS */}
        <div className="bg-white border-2 border-[#0A1428] rounded-2xl p-6 mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between shadow-[4px_4px_0_#0A1428]">
          
          {/* Quick Find Input */}
          <div className="relative w-full sm:w-80">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
              <Search size={16} />
            </span>
            <input
              type="text"
              placeholder="Chercher un concept de triche..."
              value={cheatSearch}
              onChange={(e) => setCheatSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs border-2 border-[#0A1428] rounded-xl outline-none focus:ring-2 focus:ring-[#FF5A36] text-[#0A1428] font-bold"
            />
          </div>

          {/* Quick Categories filter */}
          <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-lg border text-[10px] font-mono font-bold tracking-wider uppercase transition-all ${
                activeTab === 'all' ? 'bg-[#0A1428] text-white' : 'bg-gray-100 text-gray-500 border-gray-200'
              }`}
            >
              Tous ({GLOSSARY.length})
            </button>
            <button
              onClick={() => setActiveTab('essential')}
              className={`px-3 py-1.5 rounded-lg border text-[10px] font-mono font-bold tracking-wider uppercase transition-all ${
                activeTab === 'essential' ? 'bg-[#FF5A36] text-white' : 'bg-gray-100 text-gray-500 border-gray-200'
              }`}
            >
              Les Basiques
            </button>
            <button
              onClick={() => setActiveTab('advanced')}
              className={`px-3 py-1.5 rounded-lg border text-[10px] font-mono font-bold tracking-wider uppercase transition-all ${
                activeTab === 'advanced' ? 'bg-[#2E1B7A] text-white' : 'bg-gray-100 text-gray-500 border-gray-200'
              }`}
            >
              Architecture & Projets
            </button>
          </div>
        </div>

        {/* THE TABLE */}
        <div className="border-4 border-[#0A1428] rounded-3xl overflow-hidden shadow-[8px_8px_0_#0A1428]">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#0A1428] text-cream">
                  <th className="py-4.5 px-6 text-left font-mono text-[10px] tracking-widest uppercase text-[#FAF6EE]">Le concept</th>
                  <th className="py-4.5 px-6 text-left font-mono text-[10px] tracking-widest uppercase text-[#FFD93D]">La traduction</th>
                  <th className="py-4.5 px-6 text-left font-mono text-[10px] tracking-widest uppercase text-[#FAF6EE]">La métaphore mémorable</th>
                  <th className="py-4.5 px-6 text-right font-mono text-[10px] tracking-widest uppercase text-white/50">Outils</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {filteredCheatSheet.map((item, index) => (
                    <tr 
                      key={item.id}
                      className={`border-b-2 border-[#0A1428]/10 hover:bg-[#FAF6EE]/70 transition-colors bg-white`}
                    >
                      {/* Name */}
                      <td className="py-4 px-6 font-display font-black text-[#FF5A36] text-lg w-[20%]">
                        {item.term}
                      </td>

                      {/* Translation */}
                      <td className="py-4 px-6 text-xs font-mono font-bold text-[#2E1B7A] w-[25%]">
                        {item.acronym}
                      </td>

                      {/* Metaphor */}
                      <td className="py-4 px-6 font-serif italic text-sm text-[#2A3142] w-[45%]">
                        {item.metaphor}
                      </td>

                      {/* Action */}
                      <td className="py-4 px-6 text-right w-[10%] shrink-0">
                        <button
                          onClick={() => handleCopy(`${item.term} : ${item.metaphor}`, item.id)}
                          className="h-8 w-8 inline-flex items-center justify-center rounded border border-[#0A1428] bg-[#FAF6EE] shadow-[1px_1px_0_#0A1428] hover:-translate-y-0.5 active:translate-y-0.5 transition-all text-[#0A1428]"
                          title="Copier pour Slack ou mail"
                        >
                          {copiedTerm === item.id ? (
                            <Check size={13} className="text-[#00C49A]" />
                          ) : (
                            <Copy size={13} />
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ============== QUIZ SECTION ============== */}
      <QuizSection />

      {/* ============== FOOTER ============== */}
      <footer className="bg-[#0A1428] text-[#FAF6EE] py-24 px-6 md:px-12 lg:px-24 border-t-4 border-[#0A1428] relative text-center">
        <div className="absolute top-0 left-0 w-full h-1 bg-[#FF5A36]" />
        
        <div className="max-w-4xl mx-auto">
          <span className="h-12 w-12 bg-[#FFD93D] rounded-full flex items-center justify-center text-xl font-bold border-2 border-[#0A1428] mx-auto text-[#0A1428] mb-6">
            ✓
          </span>
          <h3 className="font-display font-black text-4xl md:text-6xl text-white mb-6 tracking-tight leading-none">
            Vous êtes maintenant <br />
            <span className="font-serif italic font-normal text-[#FF5A36]">opérationnel</span>.
          </h3>
          <p className="text-lg md:text-xl text-[#FAF6EE]/80 max-w-2xl mx-auto leading-relaxed mb-12 font-medium">
            Vous n'êtes pas devenu Data Scientist, et c'est très bien ainsi. Mais vous savez de quoi vous parlez en CoDir, vous repérez les bonimenteurs et posez précisément les bonnes questions critiques de rentabilité.
          </p>

          <div className="border-t border-[#FAF6EE]/15 pt-8 max-w-md mx-auto">
            <p className="font-mono text-[10px] uppercase tracking-widest text-[#FAF6EE]/45">
              Guide pédagogique & interactif d'acculturation · L'IA décodée · Millésime 2026
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
