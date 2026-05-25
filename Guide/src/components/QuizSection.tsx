import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { QUIZ_QUESTIONS } from '../data';
import { CheckCircle2, XCircle, Award, RefreshCw, ChevronRight, Bookmark, ShieldCheck, Ticket } from 'lucide-react';

export default function QuizSection() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOptIdx, setSelectedOptIdx] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [userName, setUserName] = useState('');
  const [quizFinished, setQuizFinished] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);

  const currentQuestion = QUIZ_QUESTIONS[currentIdx];

  const handleSubmit = () => {
    if (selectedOptIdx === null) return;
    
    if (selectedOptIdx === currentQuestion.correctAnswer) {
      setScore((prev) => prev + 1);
    }
    setIsSubmitted(true);
  };

  const handleNext = () => {
    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOptIdx(null);
      setIsSubmitted(false);
    } else {
      setQuizFinished(true);
      setShowCertificate(true);
    }
  };

  const resetQuiz = () => {
    setCurrentIdx(0);
    setSelectedOptIdx(null);
    setIsSubmitted(false);
    setScore(0);
    setQuizFinished(false);
    setShowCertificate(false);
  };

  // Generate a mock unique cert ID
  const certID = `IA-MGR-2026-${Math.floor(100000 + Math.random() * 900000)}`;

  // Qualifiers for final score
  const getScoreTranslation = () => {
    if (score === 5) return { label: 'Mention Très Bien — Expert Absolu', desc: 'Vous parlez IA sémantiquement couramment et démasquez les charlatans du secteur !' };
    if (score === 4) return { label: 'Mention Bien — Prêt pour le CoDir', desc: 'Le jargon et les schémas RAG n’ont plus de secret pour de futurs projets d’assurance.' };
    return { label: 'Mention Curieux — En apprentissage et progression', desc: 'Prenez le temps de revoir le glossaire et ses métaphores pour votre prochaine séance.' };
  };

  return (
    <section id="quiz" className="py-24 px-6 md:px-12 lg:px-24 bg-[#FF5A36] text-[#0A1428] relative overflow-hidden">
      {/* Decorative neobrutalist offset background lines */}
      <div className="absolute top-[-20%] left-[-20%] w-[600px] h-[600px] bg-[#2E1B7A]/10 rounded-full border border-dashed border-[#0A1428]/20" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* QUIZ HEADING */}
        <div className="text-center mb-16">
          <span className="font-mono text-xs uppercase tracking-widest font-black bg-[#0A1428] text-white py-1 px-3.5 rounded-full inline-block mb-4 shadow-[2px_2px_0_white]">
            Prêt à briller en CoDir ?
          </span>
          <h2 className="font-display font-black text-4xl md:text-7xl leading-none tracking-tight text-[#0A1428] mb-6">
            Testez vos <br />
            <span className="font-serif italic font-normal text-white">connaissances</span>.
          </h2>
          <p className="text-lg md:text-xl font-medium text-[#0A1428]/90 max-w-xl mx-auto">
            Vérifiez en 5 questions rapides si vous êtes prêt à piloter sereinement un projet IA dans l’assurance.
          </p>
        </div>

        {/* QUIZ INTERFACE */}
        <div className="bg-white border-4 border-[#0A1428] rounded-3xl p-6 md:p-10 shadow-[8px_8px_0_#0A1428] relative">
          
          <AnimatePresence mode="wait">
            {!quizFinished ? (
              <motion.div
                key={currentIdx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col h-full"
              >
                {/* Progress Indicators */}
                <div className="w-full flex justify-between items-center mb-8 border-b-2 border-dashed border-[#0A1428]/10 pb-4">
                  <span className="font-mono text-xs tracking-wider font-black text-[#FF5A36]">
                    QUESTION {currentIdx + 1} / {QUIZ_QUESTIONS.length}
                  </span>
                  
                  {/* Dynamic mini dots */}
                  <div className="flex gap-1.5">
                    {QUIZ_QUESTIONS.map((_, i) => (
                      <div
                        key={i}
                        className={`h-2.5 w-2.5 rounded-full border border-[#0A1428] ${
                          i === currentIdx
                            ? 'bg-[#FF5A36]'
                            : i < currentIdx
                            ? 'bg-[#00C49A]'
                            : 'bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Question */}
                <h3 className="font-display font-black text-2xl md:text-3xl text-[#0A1428] mb-8 leading-snug">
                  {currentQuestion.question}
                </h3>

                {/* Options List */}
                <div className="flex flex-col gap-3.5 mb-8">
                  {currentQuestion.options.map((option, idx) => {
                    const isSelected = selectedOptIdx === idx;
                    const isCorrectAnswer = idx === currentQuestion.correctAnswer;
                    
                    let bgBorderColor = 'bg-white border-gray-200 hover:border-[#0A1428]';
                    if (isSelected) {
                      bgBorderColor = 'bg-[#FFD93D] border-[#0A1428] font-bold shadow-[2px_2px_0_#0A1428] translate-y-[-1px]';
                    }
                    if (isSubmitted) {
                      if (isCorrectAnswer) {
                        bgBorderColor = 'bg-[#C8F3E6] border-[#00C49A] font-bold shadow-[2px_2px_0_#00C49A] text-[#0A1428]';
                      } else if (isSelected) {
                        bgBorderColor = 'bg-[#FFE4DC] border-[#FF5A36] text-black';
                      } else {
                        bgBorderColor = 'bg-white/40 border-gray-100 opacity-60 pointer-events-none';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        disabled={isSubmitted}
                        onClick={() => setSelectedOptIdx(idx)}
                        className={`w-full text-left p-4.5 rounded-xl border-2 transition-all flex items-start gap-4 text-sm font-sans md:text-base outline-none cursor-pointer ${bgBorderColor}`}
                      >
                        <span className="font-mono text-xs bg-[#0A1428] text-white px-2 py-0.5 rounded shrink-0">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{option}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Actions & Feedback */}
                <div>
                  {isSubmitted ? (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-5 rounded-2xl border-2 mb-8 flex items-start gap-4 ${
                        selectedOptIdx === currentQuestion.correctAnswer
                          ? 'bg-[#C8F3E6] border-[#00C49A] text-[#0A1428]'
                          : 'bg-[#FFE4DC] border-[#FF5A36] text-[#0A1428]'
                      }`}
                    >
                      <div className="pt-0.5">
                        {selectedOptIdx === currentQuestion.correctAnswer ? (
                          <CheckCircle2 className="text-[#00C49A] animate-bounce" size={24} />
                        ) : (
                          <XCircle className="text-[#FF5A36]" size={24} />
                        )}
                      </div>
                      <div>
                        <strong className="block font-display text-lg mb-1 leading-none">
                          {selectedOptIdx === currentQuestion.correctAnswer ? 'Exact !' : 'Oups...'}
                        </strong>
                        <p className="text-sm font-medium leading-relaxed">
                          {currentQuestion.explanation}
                        </p>
                      </div>
                    </motion.div>
                  ) : null}

                  <div className="flex justify-end">
                    {!isSubmitted ? (
                      <button
                        disabled={selectedOptIdx === null}
                        onClick={handleSubmit}
                        className={`font-mono text-xs uppercase tracking-widest font-black py-3.5 px-8 rounded-xl border-2 border-[#0A1428] transition-all ${
                          selectedOptIdx !== null
                            ? 'bg-[#FF5A36] text-white shadow-[4px_4px_0_#0A1428] hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#0A1428]'
                            : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                        }`}
                      >
                        Valider ma réponse
                      </button>
                    ) : (
                      <button
                        onClick={handleNext}
                        className="bg-[#0A1428] text-white font-mono text-xs uppercase tracking-widest font-black py-3.5 px-8 rounded-xl border-2 border-[#0A1428] shadow-[4px_4px_0_#0A1428] hover:-translate-y-0.5 active:translate-y-0.5 hover:shadow-[5px_5px_0_#0A1428] transition-all flex items-center gap-2"
                      >
                        {currentIdx === QUIZ_QUESTIONS.length - 1 ? 'Terminer l\'évaluation' : 'Question suivante'}
                        <ChevronRight size={14} />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6"
              >
                <div className="inline-flex p-4.5 bg-[#FFD93D] rounded-full border-2 border-[#0A1428] mb-6 shadow-[3px_3px_0_#0A1428]">
                  <Award size={48} className="text-[#0A1428] text-yellow-500" />
                </div>
                
                <h3 className="font-display font-black text-4xl text-[#0A1428] mb-2">
                  Évaluation terminée !
                </h3>
                <p className="font-mono text-sm uppercase tracking-wider font-extrabold text-[#FF5A36] mb-8">
                  Votre Score : <span className="text-3xl text-[#0A1428] ml-1">{score} / 5</span>
                </p>

                {/* Score Commentary */}
                <div className="bg-[#FAF6EE] border-2 border-[#0A1428] p-6 rounded-2xl max-w-lg mx-auto mb-8 shadow-[4px_4px_0_#0A1428]">
                  <span className="font-mono text-[10px] bg-[#2E1B7A] text-white px-2.5 py-1 rounded font-black uppercase tracking-wider block mb-1.5 w-fit mx-auto">
                    {getScoreTranslation().label}
                  </span>
                  <p className="text-sm font-medium text-[#0A1428]/85 leading-relaxed">
                    {getScoreTranslation().desc}
                  </p>
                </div>

                {/* Personalized Cert Input if user got >= 3 */}
                {score >= 3 ? (
                  <div className="bg-[#C8F3E6] border-2 border-[#00C49A] p-6 rounded-2xl max-w-lg mx-auto mb-10 text-left">
                    <h4 className="font-display font-black text-base text-[#0A1428] mb-2 flex items-center gap-2">
                      <Ticket size={16} /> Demandez votre Brevet de compétences :
                    </h4>
                    <p className="text-xs text-[#0A1428]/80 mb-4 leading-relaxed font-sans">
                      Félicitations ! Votre score vous qualifie pour obtenir le <strong>Brevet officiel de Manager IA-Ready 2026</strong>. Saisissez votre prénom et nom pour générer le diplôme :
                    </p>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="M./Mme Prénom Nom"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="flex-1 bg-white border-2 border-[#0A1428] px-4 py-2.5 rounded-xl font-sans text-sm outline-none focus:ring-2 focus:ring-[#FF5A36]"
                      />
                      <button
                        onClick={() => {
                          if (userName.trim()) {
                            setShowCertificate(true);
                          }
                        }}
                        className="bg-[#0A1428] text-white font-mono text-xs font-black py-2.5 px-6 rounded-xl shadow-[2px_2px_0_white]"
                      >
                        Générer
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-gray-500 italic mb-6">
                    Pour générer le Brevet de compétences officiel, effectuez un score minimal de 3/5.
                  </p>
                )}

                {/* Try again */}
                <button
                  onClick={resetQuiz}
                  className="bg-[#FF5A36] text-white font-mono text-xs uppercase tracking-widest font-black py-3 px-6 rounded-xl border-2 border-[#0A1428] shadow-[3px_3px_0_#0A1428] hover:-translate-y-0.5 active:translate-y-0.5 hover:shadow-[4px_4px_0_#0A1428] transition-all flex items-center gap-2 mx-auto"
                >
                  <RefreshCw size={13} /> Recommencer le test
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* PERSONAL DIPLOMA CARD */}
        <AnimatePresence>
          {showCertificate && userName.trim() && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="mt-12 bg-[#FAF6EE] text-[#0A1428] border-type border-4 border-[#0A1428] rounded-3xl p-8 relative shadow-[10px_10px_0_#2E1B7A] overflow-hidden"
              id="certificate-print"
            >
              {/* Premium Background Guillochage effect */}
              <div className="absolute inset-0 opacity-5 pointer-events-none select-none flex flex-wrap gap-2 text-[10px] font-mono whitespace-nowrap overflow-hidden">
                {Array(20).fill("IA DECODEE - MANAGER ASSURANCE 2026 - CONFIDENTIAL - ACCULTURATION ").map((txt, index) => (
                  <div key={index} className="transform rotate-[12deg] tracking-widest">{txt}</div>
                ))}
              </div>

              {/* Inside Double Border Lines */}
              <div className="border-2 border-dashed border-[#0A1428]/25 p-6 rounded-2xl relative">
                {/* Vintage stamp / seal in top corner */}
                <div className="absolute top-2 right-4 flex items-center gap-2 z-10">
                  <div className="w-14 h-14 rounded-full bg-[#FFD93D] border-2 border-[#0A1428] flex items-center justify-center font-black rotate-[-12deg] shadow-[2px_2px_0_#0A1428]">
                    <span className="font-mono text-[9px] text-[#0A1428] uppercase text-center font-bold tracking-tight leading-[11px]">
                      DECIDÉ<br />2026<br />★
                    </span>
                  </div>
                </div>

                {/* Cert Content */}
                <div className="text-center relative">
                  <span className="font-mono text-[10px] text-[#FF5A36] font-black uppercase tracking-widest block mb-1">
                    CERTIFICATION DE HAUT NIVEAU
                  </span>
                  
                  <h4 className="font-display font-black text-2xl md:text-3.5xl text-[#0A1428] tracking-tight leading-none mb-4 uppercase">
                    Brevet de compétences IA Clinique
                  </h4>

                  <p className="text-xs text-gray-400 font-sans tracking-wide leading-relaxed max-w-md mx-auto mb-6">
                    Décerné solennellement suite au passage avec succès de l’évaluation de synthèse consacrée à <strong>l'acculturation technologique sans jargon des managers</strong>.
                  </p>

                  <div className="border-t border-b border-[#0A1428]/15 py-6 mb-6">
                    <span className="text-[10px] font-mono text-gray-500 block uppercase tracking-wider mb-2">
                      Récipiendaire agréé
                    </span>
                    <h5 className="font-serif italic font-semibold text-3xl md:text-4xl text-[#2E1B7A] tracking-wide py-1 text-center font-display leading-tight">
                      {userName}
                    </h5>
                    <p className="text-[11px] font-mono text-gray-500 font-bold tracking-wider mt-2.5">
                      Cadre et Dirigeant · Secteur Assurance & Réassurance
                    </p>
                  </div>

                  {/* Competencies Mastered Checklist */}
                  <div className="text-left max-w-md mx-auto mb-8 bg-white/70 p-4 rounded-xl border border-[#0A1428]/10">
                    <span className="font-mono text-[9px] text-gray-400 font-black uppercase tracking-widest block mb-2.5">
                      ✓ Notions acquises à cette date ({new Date().toLocaleDateString('fr-FR')}) :
                    </span>
                    <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5 font-mono text-[10px] font-bold text-[#0A1428]">
                      <li className="flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 bg-[#00C49A] rounded-full shrink-0" />
                        Prompting (Briefer un IA)
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 bg-[#00C49A] rounded-full shrink-0" />
                        Biais sémantique (RAG)
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 bg-[#00C49A] rounded-full shrink-0" />
                        Génération vs Prédictif
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 bg-[#00C49A] rounded-full shrink-0" />
                        Limitation des risques
                      </li>
                    </ul>
                  </div>

                  {/* Cert metadata */}
                  <div className="flex justify-between items-end font-mono text-[9px] uppercase tracking-wider text-gray-500">
                    <div className="text-left">
                      <span>Unique ID : </span>
                      <strong className="text-[#0a1428] block">{certID}</strong>
                    </div>
                    <div className="text-center bg-[#0A1428] text-white py-1 px-3 rounded shadow-[2px_2px_0_#FF5A36]">
                      <span className="font-black text-xs">{score}/5</span>
                    </div>
                    <div className="text-right">
                      <span>Valide pour l'année : </span>
                      <strong className="text-[#2e1b7a] block">2026 — 2027</strong>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-center gap-4">
                    <button
                      onClick={() => window.print()}
                      className="bg-white hover:bg-gray-100 text-[#0A1428] font-mono text-[10px] font-bold px-4 py-2 rounded-lg border border-[#0A1428] shadow-[2px_2px_0_#0a1428]"
                    >
                      Imprimer mon Diplôme
                    </button>
                    <button
                      onClick={() => {
                        alert(`Dossier partagé à florent.caste@gmail.com ! Partagez l'URL de l'application ou imprimez l'interface.`);
                      }}
                      className="bg-[#2E1B7A] text-white font-mono text-[10px] font-black px-4 py-2 rounded-lg border border-[#0A1428] shadow-[2px_2px_0_#FFD93D]"
                    >
                      Envoyer par E-mail
                    </button>
                  </div>

                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
