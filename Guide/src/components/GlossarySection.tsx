import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GLOSSARY } from '../data';
import { Search, Filter, Clipboard, Check, Shuffle, RefreshCw } from 'lucide-react';
import { GlossaryItem } from '../types';

export default function GlossarySection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'Tous' | 'Fondations' | 'Architecture' | 'Fiabilité'>('Tous');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Filter glossary items based on search and selected category
  const filteredItems = GLOSSARY.filter((item) => {
    const matchesCategory = selectedCategory === 'Tous' || item.category === selectedCategory;
    const searchString = `${item.term} ${item.acronym} ${item.description} ${item.metaphor}`.toLowerCase();
    const matchesSearch = searchString.includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  // Categories helper
  const categories: ('Tous' | 'Fondations' | 'Architecture' | 'Fiabilité')[] = [
    'Tous',
    'Fondations',
    'Architecture',
    'Fiabilité',
  ];

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Fondations': return 'bg-[#FFE4DC] text-[#FF5A36] border-[#FF5A36]';
      case 'Architecture': return 'bg-[#FAF6EE] text-[#4F2EBD] border-[#4F2EBD]';
      case 'Fiabilité': return 'bg-[#C8F3E6] text-[#00C49A] border-[#00C49A]';
      default: return 'bg-white border-[#0A1428]';
    }
  };

  return (
    <section id="jargon" className="py-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
      <div className="text-center md:text-left mb-16">
        <span className="font-mono text-xs text-[#FF5A36] font-black uppercase tracking-widest block mb-4">
          03 — Le jargon décrypté
        </span>
        <h2 className="font-display font-black text-4xl md:text-7xl leading-none text-[#0A1428] mb-6">
          14 notions clés pour <span className="font-serif italic font-normal text-[#FF5A36]">survivre</span><br />
          en réunion IA.
        </h2>
        <p className="text-xl text-[#2A3142] max-w-3xl leading-relaxed">
          Le jargon technique est une barrière inutile. Retenez ces 14 concepts à l'aide de métaphores simples, pensées pour l'assurance.
        </p>
      </div>

      {/* FILTER & SEARCH TOOLS */}
      <div className="bg-white border-2 border-[#0A1428] rounded-2xl p-6 mb-12 shadow-[6px_6px_0_#0A1428] flex flex-col md:flex-row gap-6 items-center justify-between">
        
        {/* Search Bar */}
        <div className="relative w-full md:w-96">
          <span className="absolute inset-y-0 left-4 flex items-center text-[#2A3142]">
            <Search size={18} />
          </span>
          <input
            type="text"
            placeholder="Rechercher LLM, RAG, prompt, token..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border-2 border-[#0A1428] rounded-xl font-sans font-medium text-sm outline-none bg-[#FAF6EE]/50 focus:bg-white focus:ring-4 focus:ring-[#FFD93D]/30 focus:border-[#FF5A36] transition-all placeholder:text-[#2A3142]/50 text-[#0A1428]"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2.5 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg border-2 font-mono text-xs uppercase tracking-wider font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-[#0A1428] text-white border-[#0A1428] translate-y-0.5'
                  : 'bg-white text-[#0A1428] border-[#0A1428] hover:bg-[#FAF6EE]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* GLOSSAIRE GRID */}
      {filteredItems.length === 0 ? (
        <div className="bg-[#FFE4DC] border-2 border-[#0A1428] rounded-2xl p-12 text-center shadow-[4px_4px_0_#0A1428]">
          <p className="font-display font-medium text-xl text-[#0A1428]">
            Aucune notion ne correspond à vos critères de recherche.
          </p>
          <button 
            onClick={() => { setSearchQuery(''); setSelectedCategory('Tous'); }}
            className="mt-4 font-mono text-xs text-[#FF5A36] font-bold underline"
          >
            Réinitialiser les filtres
          </button>
        </div>
      ) : (
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => {
              const isIndigo = item.bgColorClass.includes('bg-indigo');
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className={`relative p-8 rounded-2xl transition-all border-2 border-[#0A1428] shadow-[5px_5px_0_#0A1428] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[8px_8px_0_#0A1428] flex flex-col justify-between ${
                    isIndigo ? 'bg-[#2E1B7A] text-[#FAF6EE]' : item.bgColorClass.replace('border-2 border-ink', '')
                  }`}
                >
                  <div>
                    {/* Upper corner index */}
                    <span className={`absolute top-6 right-8 font-mono text-sm font-bold opacity-45`}>
                      {item.num}
                    </span>

                    {/* Term Title */}
                    <div className="mb-4">
                      <h3 className="font-display font-black text-3xl tracking-tight text-inherit mb-0.5">
                        {item.term}
                      </h3>
                      <p className={`font-mono text-[11px] tracking-wider uppercase ${isIndigo ? 'text-[#FFD93D]/80' : 'text-[#2A3142]/70'} font-bold`}>
                        {item.acronym}
                      </p>
                    </div>

                    {/* Definition */}
                    <p className={`text-sm mb-6 ${isIndigo ? 'text-[#FAF6EE]/90' : 'text-[#0A1428]'} leading-relaxed`}>
                      {item.description}
                    </p>

                    {/* Metaphor Block */}
                    <div className={`p-4 border-l-4 rounded-r-lg mb-6 text-sm font-serif italic ${
                      isIndigo 
                        ? 'bg-white/10 border-[#FFD93D] text-[#FAF6EE]' 
                        : 'bg-black/[0.04] border-[#0A1428] text-[#2A3142]'
                    }`}>
                      <span className="block font-mono text-[9px] uppercase tracking-widest not-italic opacity-60 mb-1">
                        ⚡ Métaphore :
                      </span>
                      {item.metaphor.replace("Comme ", "")}
                    </div>
                  </div>

                  {/* Example tag and footer */}
                  <div className={`mt-auto pt-4 border-t ${isIndigo ? 'border-white/10' : 'border-black/10'} flex flex-col sm:flex-row sm:items-center justify-between gap-4`}>
                    <div className="flex-1">
                      <span className={`inline-block text-[9px] font-mono uppercase tracking-widest px-2.5 py-1 rounded font-black mb-1.5 ${
                        isIndigo ? 'bg-[#FF5A36] text-[#0A1428]' : 'bg-[#0A1428] text-white'
                      }`}>
                        {item.exampleTag}
                      </span>
                      <p className={`text-xs ${isIndigo ? 'text-[#FAF6EE]/80' : 'text-[#2A3142]/85'}`}>
                        {item.exampleText}
                      </p>
                    </div>

                    {/* Quick copy metaphor button */}
                    <button
                      onClick={() => copyToClipboard(item.metaphor, item.id)}
                      className={`h-9 w-9 flex items-center justify-center rounded-lg border-2 border-current hover:-translate-y-0.5 transition-all outline-none bg-white text-ink shadow-[2px_2px_0_#0A1428] active:translate-y-0.5 shrink-0`}
                      title="Copier la métaphore"
                    >
                      {copiedId === item.id ? (
                        <Check size={14} className="text-[#00C49A]" />
                      ) : (
                        <Clipboard size={14} />
                      )}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      )}
    </section>
  );
}
