import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Brain, BookOpen, Clock, Menu, X, CheckCircle } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

  // Calculate scroll progress for the top bar indicator
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setReadingProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of sticky nav
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      {/* Sticky Top Nav */}
      <nav className="sticky top-0 z-50 bg-[#FAF6EE]/92 backdrop-blur-md border-b-2 border-[#0A1428] py-4 px-6 md:px-12 flex justify-between items-center transition-all">
        {/* Progress Bar */}
        <div 
          className="absolute bottom-0 left-0 h-1 bg-[#FF5A36] transition-all duration-100" 
          style={{ width: `${readingProgress}%` }}
        />

        <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <span className="font-display font-black text-xl tracking-tight text-[#0A1428] flex items-center gap-2">
            L'IA décodée <span className="text-[#FF5A36]">/</span>
          </span>
          <span className="hidden sm:inline-block font-mono text-[10px] bg-[#2E1B7A] text-[#FAF6EE] px-2 py-0.5 rounded uppercase font-bold tracking-wider">
            Édition Assurance 2026
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 font-mono text-xs text-[#0A1428] font-bold tracking-wider">
          <button onClick={() => scrollToSection('intro')} className="hover:text-[#FF5A36] transition-colors focus:outline-none">
            01 — INTRO
          </button>
          <button onClick={() => scrollToSection('familles')} className="hover:text-[#FF5A36] transition-colors focus:outline-none">
            02 — FAMILLES
          </button>
          <button onClick={() => scrollToSection('jargon')} className="hover:text-[#FF5A36] transition-colors focus:outline-none">
            03 — GLOSSAIRE
          </button>
          <button onClick={() => scrollToSection('prompt-builder')} className="hover:text-[#FF5A36] transition-colors focus:outline-none select-none text-[#2E1B7A] bg-[#FFD93D] px-2.5 py-1 border-2 border-[#0A1428] rounded shadow-[2px_2px_0_#0A1428] transition-all hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[3px_3px_0_#0A1428]">
            03.5 — PROMPT PLAYGROUND
          </button>
          <button onClick={() => scrollToSection('cas')} className="hover:text-[#FF5A36] transition-colors focus:outline-none">
            04 — CAS CONCRETS
          </button>
          <button onClick={() => scrollToSection('pieges')} className="hover:text-[#FF5A36] transition-colors focus:outline-none">
            05 — PIÈGES
          </button>
          <button onClick={() => scrollToSection('quiz')} className="bg-[#FF5A36] text-[#FAF6EE] border-2 border-[#0A1428] px-4 py-1.5 rounded shadow-[3px_3px_0_#0A1428] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0_#0A1428] uppercase font-mono text-[11px] tracking-widest font-black">
            TESTER MON NIVEAU
          </button>
        </div>

        {/* Mobile Menu Trigger */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-[#0A1428] p-1 border-2 border-[#0A1428] bg-[#FAF6EE] rounded shadow-[2px_2px_0_#0A1428] active:translate-y-0.5"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[65px] z-40 bg-[#FAF6EE] border-b-4 border-[#0A1428] p-6 shadow-xl flex flex-col gap-4 font-mono text-sm uppercase tracking-wider font-bold"
          >
            <button onClick={() => scrollToSection('intro')} className="text-left py-2 hover:text-[#FF5A36] border-b border-gray-200">
              01 — Introduction
            </button>
            <button onClick={() => scrollToSection('familles')} className="text-left py-2 hover:text-[#FF5A36] border-b border-gray-200">
              02 — Les 3 Familles d'IA
            </button>
            <button onClick={() => scrollToSection('jargon')} className="text-left py-2 hover:text-[#FF5A36] border-b border-gray-200">
              03 — Glossaire Décrypté
            </button>
            <button onClick={() => scrollToSection('prompt-builder')} className="text-left py-2 text-[#2E1B7A] bg-[#FFD93D] px-2 py-1 rounded border border-[#0A1428] text-xs font-bold w-fit">
              ★ Prompt Playground
            </button>
            <button onClick={() => scrollToSection('cas')} className="text-left py-2 hover:text-[#FF5A36] border-b border-gray-200">
              04 — 4 Cas Pratiques Assurance
            </button>
            <button onClick={() => scrollToSection('pieges')} className="text-left py-2 hover:text-[#FF5A36] border-b border-gray-200">
              05 — Idées Reçues / Pièges
            </button>
            <button 
              onClick={() => scrollToSection('quiz')} 
              className="bg-[#FF5A36] text-[#FAF6EE] text-center py-3 border-2 border-[#0A1428] rounded shadow-[4px_4px_0_#0A1428]"
            >
              Testez vos connaissances
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <header className="relative bg-[#0A1428] text-[#FAF6EE] py-20 px-6 md:px-12 lg:px-24 overflow-hidden border-b-4 border-[#0A1428]">
        {/* Glow Spheres */}
        <div className="absolute top-[-10%) right-[-10%] w-[500px] h-[500px] bg-gradient-to-br from-[#FF5A36]/40 via-transparent to-transparent rounded-full filter blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-15%] left-[-10%] w-[600px] h-[600px] bg-gradient-to-tr from-[#4F2EBD]/50 via-transparent to-transparent rounded-full filter blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 font-mono text-xs text-[#0A1428] font-black uppercase tracking-widest bg-[#FF5A36] py-1.5 px-3.5 rounded-full mb-8 shadow-[3px_3px_0_#FAF6EE]"
          >
            <Sparkles size={13} className="animate-pulse" />
            Guide Décryptage · Édition 2026
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-display font-black text-6xl md:text-8xl lg:text-[110px] leading-[0.9] tracking-tight text-white mb-8"
          >
            L'IA <span className="font-serif italic font-normal text-[#FF5A36]">décodée</span>,<br />
            sans <span className="text-[#FFD93D]">jargon</span><br />
            ni <span className="font-serif italic font-normal text-cream">blabla</span>.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-[#FAF6EE]/85 text-lg md:text-2xl max-w-2xl leading-relaxed mb-12"
          >
            Tout ce qu'un manager dans l'assurance doit savoir pour parler IA en réunion <span className="font-serif italic text-[#FFD93D]">sans bluffer</span>. Métaphores acérées, exemples concrets, schémas vectoriels et outils interactifs. 15 minutes de lecture.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex gap-6 flex-wrap font-mono text-xs uppercase tracking-wider text-[#FAF6EE]/60 border-t border-[#FAF6EE]/15 pt-8"
          >
            <div className="flex items-center gap-2.5">
              <Brain size={16} className="text-[#00C49A]" />
              <div>
                <span className="block text-[#FAF6EE]/45 text-[10px]">Cible de l'école</span>
                <strong className="text-white text-sm font-black">Managers Assurance</strong>
              </div>
            </div>
            <div className="w-[1px] bg-white/10 hidden sm:block" />
            <div className="flex items-center gap-2.5">
              <BookOpen size={16} className="text-[#FFD93D]" />
              <div>
                <span className="block text-[#FAF6EE]/45 text-[10px]">Exigence technique</span>
                <strong className="text-white text-sm font-black">Curieux non-tech</strong>
              </div>
            </div>
            <div className="w-[1px] bg-white/10 hidden sm:block" />
            <div className="flex items-center gap-2.5">
              <Clock size={16} className="text-[#FF5A36]" />
              <div>
                <span className="block text-[#FAF6EE]/45 text-[10px]">Format d'apprentissage</span>
                <strong className="text-white text-sm font-black">Synthèse interactive</strong>
              </div>
            </div>
          </motion.div>
        </div>
      </header>
    </>
  );
}
