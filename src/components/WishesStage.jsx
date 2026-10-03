import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Heart, 
  Sparkles, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Crown,
  ChevronRight,
  ChevronLeft,
  Stars,
  Shield,
  Sun,
  Flame
} from 'lucide-react';
import { sound } from '../utils/audio';

const WISHES = [
  {
    id: 1,
    title: "Wish #1 — Peace & Happiness",
    icon: Sparkles,
    text: "unnoda kastam sogam ella parandhu poidunum",
    tag: "May all your worries vanish into the air",
    gradient: "from-pink-500/20 via-rose-500/15 to-purple-500/20"
  },
  {
    id: 2,
    title: "Wish #2 — Forever Together",
    icon: Heart,
    text: "eppium na unkooda irrkunum",
    tag: "Always by your side, holding your hand",
    gradient: "from-rose-500/20 via-pink-500/15 to-amber-500/20"
  },
  {
    id: 3,
    title: "Wish #3 — You & Me Only",
    icon: Crown,
    text: "nee enna yarukangum vittu kooduka koodathu",
    tag: "Promise me you will never let me go",
    gradient: "from-purple-500/20 via-rose-500/15 to-pink-500/20"
  },
  {
    id: 4,
    title: "Wish #4 — 365 Days of Pure Love",
    icon: Sun,
    text: "indha day muttum ila ella day um special aa irrukunum na unna appidi pathupa",
    tag: "I will make every single day feel like your birthday",
    gradient: "from-amber-500/20 via-rose-500/15 to-pink-500/20"
  },
  {
    id: 5,
    title: "Wish #5 — En Thangomayyy",
    icon: Stars,
    text: "unnaku vara kastam la na eduthukara ennaku vara sandshom la nee vechukoooo en thangomayyy",
    tag: "All my happiness belongs to you, my precious treasure",
    gradient: "from-pink-500/25 via-amber-500/20 to-rose-500/25"
  },
  {
    id: 6,
    title: "Wish #6 — Absolute Protection",
    icon: Shield,
    text: "yarum avala kastam padutha koodathu panna oodanay ella kastam um avanguluku vandhurunum",
    tag: "Instant karma to anyone who upsets my Amma",
    gradient: "from-rose-600/25 via-purple-600/20 to-amber-500/25"
  }
];

export default function WishesStage({ onCompleteWishes, onBackToQuiz, isMuted, toggleAudio }) {
  const [currentWishIndex, setCurrentWishIndex] = useState(0);
  const currentWish = WISHES[currentWishIndex];
  const isLastWish = currentWishIndex === WISHES.length - 1;
  const WishIcon = currentWish.icon;

  const handleNextWish = () => {
    sound.playPop();
    if (isLastWish) {
      sound.playFanfare();
      confetti({
        particleCount: 90,
        spread: 100,
        origin: { y: 0.5 },
        colors: ['#f43f5e', '#fbbf24', '#c084fc', '#38bdf8', '#f472b6']
      });
      onCompleteWishes();
    } else {
      sound.playCuteYay();
      confetti({
        particleCount: 25,
        spread: 60,
        origin: { y: 0.65 },
        colors: ['#fda4af', '#fbbf24', '#f472b6']
      });
      setCurrentWishIndex((prev) => prev + 1);
    }
  };

  const handlePrevWish = () => {
    if (currentWishIndex > 0) {
      sound.playPop();
      setCurrentWishIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-full py-5 px-4 text-center z-10 select-none">
      {/* Top Header */}
      <div className="w-full flex justify-between items-center px-1">
        <button
          onClick={onBackToQuiz}
          className="flex items-center gap-1 text-xs text-pink-300 hover:text-white glass-pill px-3 py-1.5 rounded-full transition-all active:scale-95 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-pill text-xs font-semibold text-amber-300 border border-amber-400/30">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>My 6 Birthday Wishes for You</span>
        </div>

        <button
          onClick={toggleAudio}
          className="p-2 rounded-full glass-pill text-rose-300 hover:text-white transition-all active:scale-95 cursor-pointer"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-300" />}
        </button>
      </div>

      {/* Main Wish Display Card */}
      <div className="w-full flex-1 flex flex-col items-center justify-center my-auto py-2">
        {/* Step Indicator / Progress Tracker */}
        <div className="flex items-center justify-center gap-1.5 mb-3">
          {WISHES.map((_, idx) => (
            <div
              key={idx}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentWishIndex
                  ? 'w-8 bg-gradient-to-r from-amber-400 to-rose-500 shadow-[0_0_10px_rgba(251,191,36,0.6)]'
                  : idx < currentWishIndex
                  ? 'w-4 bg-rose-400/60'
                  : 'w-2 bg-white/10'
              }`}
            />
          ))}
        </div>

        <div className="text-xs text-amber-300/80 font-mono font-bold mb-2 tracking-widest uppercase">
          WISH {currentWishIndex + 1} OF {WISHES.length}
        </div>

        {/* The Luxury Wish Card */}
        <div 
          key={currentWish.id}
          className={`w-full glass-panel rounded-3xl p-6 sm:p-7 border border-pink-400/30 shadow-2xl relative overflow-hidden bg-gradient-to-b ${currentWish.gradient} transition-all duration-500 animate-fade-in`}
        >
          {/* Decorative Corner Glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-rose-500/15 rounded-full blur-3xl pointer-events-none" />

          {/* Wish Title Badge */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-black/30 border border-white/10 text-xs font-semibold text-rose-200 mb-4">
            <Crown className="w-3.5 h-3.5 text-amber-300" />
            <span>{currentWish.title}</span>
          </div>

          {/* Glowing Luxury Icon Avatar */}
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-amber-400/30 via-rose-500/30 to-pink-500/30 border border-amber-300/40 flex items-center justify-center shadow-[0_0_25px_rgba(251,191,36,0.3)] my-2">
            <WishIcon className="w-8 h-8 text-amber-300 animate-pulse" />
          </div>

          {/* Pure Clean Text in Elegant Luxury Typography */}
          <div className="min-h-[95px] flex items-center justify-center my-3 px-2">
            <h2 className="text-xl sm:text-2xl font-bold text-white leading-relaxed tracking-wide font-luxury gold-shimmer-text">
              "{currentWish.text}"
            </h2>
          </div>

          {/* Heartfelt Translation / Sweet Sub-message */}
          <div className="bg-black/25 rounded-2xl py-2 px-3 border border-white/5 mt-2">
            <p className="text-xs text-pink-200/90 font-handwriting text-lg leading-tight">
              {currentWish.tag}
            </p>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="w-full mt-5 space-y-2.5">
          <button
            type="button"
            onClick={handleNextWish}
            className="w-full py-3 px-5 rounded-2xl font-bold text-xs sm:text-sm tracking-wide bg-gradient-to-r from-amber-400 via-rose-500 to-pink-500 text-white shadow-lg shadow-rose-500/30 gold-border-glow hover:scale-[1.02] active:scale-95 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
          >
            <span>{isLastWish ? "Shall we proceed? ✨" : "NEXT WISH"}</span>
            <ChevronRight className="w-4 h-4 text-amber-200" />
          </button>

          {currentWishIndex > 0 && (
            <button
              type="button"
              onClick={handlePrevWish}
              className="text-xs text-pink-300/60 hover:text-pink-200 flex items-center justify-center gap-1 mx-auto pt-1 cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Previous Wish</span>
            </button>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="w-full text-center pb-1">
        <p className="text-[11px] text-pink-300/40 font-handwriting text-base">
          Forever wishing only the best for my Amma
        </p>
      </div>
    </div>
  );
}
