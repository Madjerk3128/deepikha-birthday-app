import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Heart, 
  Sparkles, 
  HelpCircle, 
  Smile,
  Volume2, 
  VolumeX, 
  ArrowRight, 
  AlertCircle, 
  RotateCcw, 
  CheckCircle,
  Radio,
  Headphones,
  Flame,
  Award
} from 'lucide-react';
import { sound } from '../utils/audio';

export default function CuteQuizStage({ onCompleteAllQuestions, onBackToPortal, isMuted, toggleAudio }) {
  // Current active question index (1, 2, or 3)
  const [questionStep, setQuestionStep] = useState(1);

  // States for Question 1
  const [hasClickedNo, setHasClickedNo] = useState(false);
  const [q1Answered, setQ1Answered] = useState(false);
  const [shakeCard, setShakeCard] = useState(false);

  // States for Question 2
  const [q2Answer, setQ2Answer] = useState(null);
  const [q2Completed, setQ2Completed] = useState(false);

  // States for Question 3
  const [q3Answer, setQ3Answer] = useState(null);
  const [q3Completed, setQ3Completed] = useState(false);

  // ---------- QUESTION 1 HANDLERS ----------
  const handleNoClick = () => {
    sound.playCryingSound();
    setShakeCard(true);
    setTimeout(() => setShakeCard(false), 600);
    setHasClickedNo(true);

    confetti({
      particleCount: 18,
      spread: 45,
      origin: { y: 0.6 },
      colors: ['#60a5fa', '#93c5fd', '#38bdf8']
    });
  };

  const handleQ1YesClick = () => {
    sound.playCuteYay();
    setQ1Answered(true);

    confetti({
      particleCount: 75,
      spread: 85,
      origin: { y: 0.5 },
      colors: ['#f43f5e', '#fbbf24', '#ec4899', '#a855f7']
    });
  };

  const proceedToQ2 = () => {
    sound.playPop();
    setQuestionStep(2);
  };

  // ---------- QUESTION 2 HANDLERS ----------
  const handleQ2Select = (choice) => {
    sound.playCuteYay();
    setQ2Answer(choice);
    setQ2Completed(true);

    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.55 },
      colors: ['#fbbf24', '#f472b6', '#34d399', '#c084fc']
    });
  };

  const proceedToQ3 = () => {
    sound.playPop();
    setQuestionStep(3);
  };

  // ---------- QUESTION 3 HANDLERS ----------
  const handleQ3Select = (choice) => {
    sound.playFanfare();
    setQ3Answer(choice);
    setQ3Completed(true);

    // Grand explosion
    const end = Date.now() + 2 * 1000;
    const colors = ['#f43f5e', '#fbbf24', '#c084fc', '#38bdf8', '#f472b6'];

    (function frame() {
      confetti({
        particleCount: 6,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 6,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  const handleFinalUnlock = () => {
    sound.playPop();
    onCompleteAllQuestions();
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-full py-5 px-4 text-center z-10 select-none">
      {/* Top Controls Bar */}
      <div className="w-full flex justify-between items-center px-1">
        <button
          onClick={onBackToPortal}
          className="flex items-center gap-1 text-xs text-pink-300 hover:text-white glass-pill px-3 py-1.5 rounded-full transition-all active:scale-95"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Back to Portal</span>
        </button>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-pill text-xs font-semibold text-amber-300 border border-amber-400/30">
          <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
          <span>Question {questionStep} of 3</span>
        </div>

        <button
          onClick={toggleAudio}
          className="p-2 rounded-full glass-pill text-rose-300 hover:text-white transition-all active:scale-95"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-300" />}
        </button>
      </div>

      {/* Main Question Arena */}
      <div className="w-full flex-1 flex flex-col items-center justify-center my-auto py-2">
        {/* Progress Pills (3 Steps) */}
        <div className="flex items-center gap-2 mb-3">
          <div className={`w-8 h-2 rounded-full transition-all duration-300 ${
            questionStep >= 1 ? 'bg-gradient-to-r from-amber-400 to-rose-500 shadow-sm' : 'bg-white/10'
          }`} />
          <div className={`w-8 h-2 rounded-full transition-all duration-300 ${
            questionStep >= 2 ? 'bg-gradient-to-r from-amber-400 to-rose-500 shadow-sm' : 'bg-white/10'
          }`} />
          <div className={`w-8 h-2 rounded-full transition-all duration-300 ${
            questionStep >= 3 ? 'bg-gradient-to-r from-amber-400 to-rose-500 shadow-sm' : 'bg-white/10'
          }`} />
        </div>

        {/* ------------------------------------------------------------- */}
        {/* ===================== QUESTION 1 ============================ */}
        {/* ------------------------------------------------------------- */}
        {questionStep === 1 && (
          <div className={`w-full glass-panel rounded-3xl p-5 border border-pink-500/25 shadow-2xl transition-all duration-300 relative overflow-hidden ${
            shakeCard ? 'animate-shake ring-2 ring-red-500' : ''
          }`}>
            <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/15 rounded-full blur-2xl pointer-events-none" />

            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-[11px] font-semibold border border-rose-500/30 mb-2">
              <Heart className="w-3 h-3 text-rose-400 fill-rose-400" />
              <span>Truth Protocol: Q1</span>
            </div>

            <h2 className="text-2xl md:text-3xl font-extrabold text-white mt-1 mb-2 tracking-tight">
              Do you like meee? <span className="inline-block text-rose-400 animate-pulse-heart">🥺👉👈</span>
            </h2>

            <p className="text-xs text-pink-200/70 mb-5">
              Please select the most honest option below:
            </p>

            {/* Q1: Initial Two 'No' Options */}
            {!hasClickedNo && !q1Answered && (
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={handleNoClick}
                    className="w-full py-3.5 px-4 rounded-2xl font-bold text-sm bg-white/10 hover:bg-rose-950/40 text-pink-200 border border-white/15 hover:border-rose-400/50 transition-all duration-200 active:scale-95 shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>No 😒</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleNoClick}
                    className="w-full py-3.5 px-4 rounded-2xl font-bold text-sm bg-white/10 hover:bg-rose-950/40 text-pink-200 border border-white/15 hover:border-rose-400/50 transition-all duration-200 active:scale-95 shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>No, not at all 🙄</span>
                  </button>
                </div>
                <p className="text-[11px] text-pink-300/40 italic pt-1">
                  (Choose wisely... consequences may be dramatic!)
                </p>
              </div>
            )}

            {/* Q1: Crying Reaction & Prompt to Click Yes */}
            {hasClickedNo && !q1Answered && (
              <div className="space-y-4 animate-fade-in">
                <div className="bg-rose-950/60 border-2 border-rose-500/50 rounded-2xl p-4 shadow-xl text-center space-y-2 relative overflow-hidden">
                  <div className="text-5xl animate-bounce">
                    😭💔🌧️
                  </div>
                  <h3 className="text-base font-extrabold text-rose-300">
                    NOOO! Why do you hate meee?! 😭😭
                  </h3>
                  <p className="text-xs text-pink-100/90 leading-relaxed font-medium">
                    "How could you click No?! My heart is shattered into 10,000 tiny pieces! I'm crying buckets of tears right now!"
                  </p>
                  <div className="bg-red-500/20 border border-red-500/40 rounded-xl py-1.5 px-2.5 flex items-center justify-center gap-1.5 text-[11px] text-rose-200 font-bold">
                    <AlertCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    <span>ERROR: 'No' is strictly forbidden in this relationship!</span>
                  </div>
                </div>

                <div className="space-y-2 pt-1">
                  <div className="flex items-center justify-center gap-1.5 text-xs text-amber-300 font-semibold animate-pulse">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Now tell the truth and click below:</span>
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>

                  <button
                    type="button"
                    onClick={handleQ1YesClick}
                    className="w-full mt-3 py-3 px-4 sm:px-5 rounded-2xl font-bold text-xs sm:text-sm tracking-wide bg-gradient-to-r from-amber-400 via-rose-500 to-pink-500 text-white shadow-lg shadow-rose-500/30 gold-border-glow hover:scale-[1.02] active:scale-95 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Heart className="w-4 h-4 text-amber-200 fill-amber-200 animate-pulse shrink-0" />
                    <span>YES, MORE THAN YOU THINK! 🥰💖</span>
                    <Sparkles className="w-4 h-4 text-amber-200 shrink-0" />
                  </button>
                </div>
              </div>
            )}

            {/* Q1: Success State */}
            {q1Answered && (
              <div className="space-y-4 animate-fade-in text-center py-2">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-pink-500 to-amber-400 p-0.5 shadow-[0_0_25px_rgba(244,63,94,0.5)]">
                  <div className="w-full h-full rounded-full bg-[#1e0e2e] flex items-center justify-center text-3xl">
                    🥰
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-black text-white gold-shimmer-text">
                    YAYYY! I KNEW IT! ❤️
                  </h3>
                  <p className="font-handwriting text-2xl text-rose-300">
                    You love me the most, Amma! 🥰
                  </p>
                  <p className="text-xs text-pink-200/80 pt-1">
                    Question 1 Passed with 100% honesty score!
                  </p>
                </div>

                <button
                  type="button"
                  onClick={proceedToQ2}
                  className="w-full py-3 px-5 rounded-2xl font-bold text-xs sm:text-sm bg-gradient-to-r from-amber-400 via-rose-500 to-pink-500 text-white gold-border-glow shadow-lg hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer mt-3"
                >
                  <span>Shall we proceed? ✨</span>
                  <ArrowRight className="w-4 h-4 text-amber-200" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* ===================== QUESTION 2 ============================ */}
        {/* ------------------------------------------------------------- */}
        {questionStep === 2 && (
          <div className="w-full glass-panel rounded-3xl p-5 border border-pink-500/25 shadow-2xl transition-all duration-300 relative overflow-hidden animate-fade-in">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/15 rounded-full blur-2xl pointer-events-none" />

            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[11px] font-semibold border border-amber-500/30 mb-2">
              <Smile className="w-3 h-3 text-amber-400" />
              <span>Happiness Check: Q2</span>
            </div>

            <h2 className="text-2xl md:text-3xl font-extrabold text-white mt-1 mb-2 tracking-tight">
              Are you happy with mee? <span className="inline-block text-amber-300">🌸✨</span>
            </h2>

            <p className="text-xs text-pink-200/70 mb-5">
              Tell me honestly how your heart feels with me:
            </p>

            {!q2Completed ? (
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => handleQ2Select('1000')}
                  className="w-full py-4 px-4 rounded-2xl font-bold text-sm bg-gradient-to-r from-rose-500/30 to-pink-500/20 hover:from-rose-500/50 hover:to-pink-500/40 text-pink-100 border border-pink-400/40 hover:border-pink-300 transition-all duration-200 active:scale-95 shadow-md flex items-center justify-between px-5 group cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-xl">🥰</span>
                    <span>1000% Happiest Girl Ever!</span>
                  </span>
                  <Heart className="w-4 h-4 text-rose-400 fill-rose-400 group-hover:scale-125 transition-transform" />
                </button>

                <button
                  type="button"
                  onClick={() => handleQ2Select('infinite')}
                  className="w-full py-4 px-4 rounded-2xl font-bold text-sm bg-gradient-to-r from-amber-500/30 to-rose-500/20 hover:from-amber-500/50 hover:to-rose-500/40 text-amber-100 border border-amber-400/40 hover:border-amber-300 transition-all duration-200 active:scale-95 shadow-md flex items-center justify-between px-5 group cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-xl">👑</span>
                    <span>Beyond Infinity Happy with You!</span>
                  </span>
                  <Sparkles className="w-4 h-4 text-amber-300 group-hover:scale-125 transition-transform" />
                </button>
              </div>
            ) : (
              <div className="space-y-4 animate-fade-in text-center py-2">
                {/* Happiness Meter */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-rose-300">Happiness Level</span>
                    <span className="text-amber-300">1000% INFINITE ♾️</span>
                  </div>
                  <div className="w-full h-3 bg-black/40 rounded-full overflow-hidden p-0.5 border border-pink-500/30">
                    <div className="w-full h-full bg-gradient-to-r from-amber-400 via-rose-500 to-pink-500 rounded-full animate-pulse" />
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-white gold-shimmer-text">
                    My Heart is So Full! 💖
                  </h3>
                  <p className="font-handwriting text-2xl text-pink-300">
                    Making my Amma smile is my greatest joy!
                  </p>
                  <p className="text-xs text-pink-200/80 pt-1">
                    "I promise to keep giving you reasons to smile every single day!"
                  </p>
                </div>

                <button
                  type="button"
                  onClick={proceedToQ3}
                  className="w-full py-3 px-5 rounded-2xl font-bold text-xs sm:text-sm bg-gradient-to-r from-amber-400 via-rose-500 to-pink-500 text-white gold-border-glow shadow-lg hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer mt-3"
                >
                  <span>Shall we proceed? ✨</span>
                  <ArrowRight className="w-4 h-4 text-amber-200" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* ===================== QUESTION 3 ============================ */}
        {/* ------------------------------------------------------------- */}
        {questionStep === 3 && (
          <div className="w-full glass-panel rounded-3xl p-5 border border-pink-500/25 shadow-2xl transition-all duration-300 relative overflow-hidden animate-fade-in">
            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/15 rounded-full blur-2xl pointer-events-none" />

            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[11px] font-semibold border border-purple-500/30 mb-2">
              <Headphones className="w-3 h-3 text-purple-400" />
              <span>Special Birthday Transmission: Q3</span>
            </div>

            <h2 className="text-xl md:text-2xl font-extrabold text-white mt-1 mb-2 tracking-tight leading-snug">
              I am going to wish for your birthday... <br />
              <span className="gold-shimmer-text font-serif text-2xl block mt-1">
                Can you hear that wishes please? 🎂💌🥺
              </span>
            </h2>

            <p className="text-xs text-pink-200/70 mb-5">
              I poured my entire heart into these birthday wishes for you:
            </p>

            {!q3Completed ? (
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => handleQ3Select('ready')}
                  className="w-full py-4 px-4 rounded-2xl font-bold text-sm bg-gradient-to-r from-pink-500/30 via-rose-500/30 to-amber-500/30 hover:from-pink-500/50 hover:to-amber-500/50 text-white border border-pink-400/40 hover:border-pink-300 transition-all duration-200 active:scale-95 shadow-lg flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <Heart className="w-4 h-4 text-rose-400 fill-rose-400 group-hover:scale-125 transition-transform" />
                  <span>Yes, I want to hear your wishes! 🥹💖</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleQ3Select('urgent')}
                  className="w-full py-4 px-4 rounded-2xl font-bold text-sm bg-gradient-to-r from-amber-400/30 via-rose-500/30 to-purple-500/30 hover:from-amber-400/50 hover:to-purple-500/50 text-amber-200 border border-amber-400/40 hover:border-amber-300 transition-all duration-200 active:scale-95 shadow-lg flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-300 group-hover:scale-125 transition-transform" />
                  <span>YES YES YES, tell me right now! 👑✨</span>
                </button>
              </div>
            ) : (
              <div className="space-y-4 animate-fade-in text-center py-2">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-500 p-0.5 shadow-[0_0_30px_rgba(251,191,36,0.6)]">
                  <div className="w-full h-full rounded-full bg-[#1e0e2e] flex items-center justify-center text-3xl">
                    🎁
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-black text-white gold-shimmer-text">
                    WISHES UNLOCKED! 🎉✨
                  </h3>
                  <p className="font-handwriting text-2xl text-rose-300">
                    Entering Amma's Grand Birthday Arena! ❤️
                  </p>
                  <p className="text-xs text-pink-200/80 pt-1">
                    Get ready to receive all the love, wishes, and royal pampering you deserve!
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleFinalUnlock}
                  className="w-full py-3 px-5 rounded-2xl font-bold text-xs sm:text-sm tracking-wide bg-gradient-to-r from-amber-400 via-rose-500 to-pink-500 text-white shadow-lg shadow-rose-500/30 gold-border-glow hover:scale-[1.02] active:scale-95 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 mt-3"
                >
                  <span>Shall we proceed? ✨</span>
                  <ArrowRight className="w-4 h-4 text-amber-200" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="w-full text-center pb-2">
        <p className="text-[11px] text-pink-300/40">
          The Amma Special Birthday Edition ✨
        </p>
      </div>
    </div>
  );
}
