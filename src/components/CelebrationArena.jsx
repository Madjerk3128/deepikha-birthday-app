import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  Crown, 
  Heart, 
  Cake, 
  Gift, 
  Flame, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Award,
  Music,
  Laugh,
  Play,
  Pause,
  Mail,
  Headphones
} from 'lucide-react';
import { sound } from '../utils/audio';

const CUTE_REASONS = [
  "You make every single day 1000x brighter just by existing ✨",
  "Your smile has the power to solve all life problems in 1 second 🥰",
  "Nobody cares, loves, or scolds as cutely as you do (True Amma vibes!) 👑",
  "You are 50% sweetness, 50% elegance, and 100% perfection 💖",
  "Official scientific fact: You are the most adorable human on planet Earth! 🌸",
  "The way your eyes light up when you're happy is the prettiest sight ever 💎"
];

export default function CelebrationArena({ onBackToIntro, onBackToLetter, isMuted, toggleAudio, isBgmPlaying, toggleBgm }) {
  const [currentReasonIndex, setCurrentReasonIndex] = useState(0);
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [privilegeRedeemed, setPrivilegeRedeemed] = useState(false);
  const [isPlayingWishesAudio, setIsPlayingWishesAudio] = useState(false);

  useEffect(() => {
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.4 },
      colors: ['#f43f5e', '#fbbf24', '#c084fc', '#f472b6']
    });
  }, []);

  const handleNextReason = () => {
    sound.playPop();
    setCurrentReasonIndex((prev) => (prev + 1) % CUTE_REASONS.length);
    confetti({
      particleCount: 15,
      spread: 50,
      origin: { y: 0.7 },
      colors: ['#fda4af', '#fbbf24', '#f472b6']
    });
  };

  const handleBlowCandle = () => {
    sound.playChime();
    setCandlesBlown(true);
    confetti({
      particleCount: 80,
      spread: 85,
      origin: { y: 0.5 },
      colors: ['#f43f5e', '#fbbf24', '#a855f7', '#38bdf8']
    });
  };

  const handleRedeemPrivilege = () => {
    sound.playChime();
    setPrivilegeRedeemed(true);
    confetti({
      particleCount: 40,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#fbbf24', '#f59e0b', '#f43f5e']
    });
  };

  const handleToggleWishesAudio = () => {
    if (isPlayingWishesAudio) {
      sound.stopBgm();
      setIsPlayingWishesAudio(false);
    } else {
      sound.playFanfare();
      sound.startBgm();
      setIsPlayingWishesAudio(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-full py-5 px-4 text-center z-10 space-y-4 select-none">
      {/* Navigation & Controls Bar */}
      <div className="w-full flex justify-between items-center px-1">
        <button
          onClick={onBackToIntro}
          className="flex items-center gap-1 text-xs text-pink-300 hover:text-white glass-pill px-3 py-1.5 rounded-full transition-all active:scale-95 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Replay All</span>
        </button>

        <div className="flex items-center gap-2">
          {onBackToLetter && (
            <button
              onClick={onBackToLetter}
              className="flex items-center gap-1 text-xs text-amber-300 glass-pill px-3 py-1.5 rounded-full transition-all active:scale-95 cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Read Letter</span>
            </button>
          )}

          <button
            onClick={toggleBgm}
            className={`p-2 rounded-full glass-pill transition-all active:scale-95 cursor-pointer ${
              isBgmPlaying ? 'text-amber-300 bg-amber-400/20 border-amber-300/40' : 'text-pink-300'
            }`}
            title="Toggle Background Music"
          >
            <Music className={`w-4 h-4 ${isBgmPlaying ? 'animate-bounce' : ''}`} />
          </button>
          
          <button
            onClick={toggleAudio}
            className="p-2 rounded-full glass-pill text-rose-300 hover:text-white transition-all active:scale-95 cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-300" />}
          </button>
        </div>
      </div>

      {/* Main Birthday Spotlight Section */}
      <div className="w-full space-y-4">
        {/* Crown & Celebratory Header */}
        <div className="relative pt-1">
          <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-amber-400 via-rose-500 to-pink-500 p-0.5 shadow-[0_0_30px_rgba(251,191,36,0.5)]">
            <div className="w-full h-full rounded-full bg-[#180d28] flex items-center justify-center">
              <Crown className="w-9 h-9 text-amber-300 animate-bounce" />
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold mt-3 tracking-tight">
            <span className="gold-shimmer-text font-luxury block">Happy Birthday!</span>
            <span className="rose-gold-text font-serif text-4xl block mt-0.5">Deepikha 👑</span>
          </h1>

          <div className="inline-block mt-1">
            <span className="font-handwriting text-2xl text-pink-300">
              Forever My Queen & Dearest Amma ❤️
            </span>
          </div>
        </div>

        {/* 🎂 INTERACTIVE VIRTUAL CAKE */}
        <div className="glass-card-gold rounded-3xl p-5 border border-amber-300/30 text-center relative overflow-hidden">
          <div className="absolute top-2 right-3">
            <span className="text-[10px] uppercase tracking-wider bg-amber-400/20 text-amber-200 px-2 py-0.5 rounded-full font-bold border border-amber-400/30">
              Interactive Cake 🎂
            </span>
          </div>

          <div className="py-1">
            <div className="relative inline-block my-1">
              <div className="text-6xl animate-bounce">🎂</div>
              {!candlesBlown && (
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 flex items-center justify-center">
                  <Flame className="w-6 h-6 text-amber-400 fill-amber-300 animate-pulse" />
                </div>
              )}
            </div>

            <h3 className="text-xs font-bold text-white mt-1">
              {candlesBlown ? "✨ Candle Blown! May all your wishes come true! ✨" : "Make a Secret Wish & Blow the Candle!"}
            </h3>

            <button
              onClick={handleBlowCandle}
              disabled={candlesBlown}
              className={`mt-3 py-2 px-5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                candlesBlown
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 cursor-default'
                  : 'bg-gradient-to-r from-amber-400 to-rose-500 text-white shadow-lg shadow-rose-500/30 hover:scale-105 active:scale-95'
              }`}
            >
              {candlesBlown ? '🎉 Wish Sent to the Stars!' : '🌬️ Tap to Blow Candle & Make Wish'}
            </button>
          </div>
        </div>

        {/* 🎧 SPECIAL AUDIO MELODY TRANSMISSION PLAYER */}
        <div className="glass-card-gold rounded-3xl p-4 border border-amber-300/35 text-center relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-200 uppercase tracking-wider">
              <Headphones className="w-4 h-4 text-amber-400" />
              <span>Birthday Audio Melody</span>
            </div>
            <span className="text-[10px] text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded-full font-mono font-bold">
              HD AUDIO ✨
            </span>
          </div>

          <p className="text-xs text-pink-100/80 mb-2">
            Tap below to play celebration melodies crafted for your special day!
          </p>

          {/* Sound Wave Animation Visualizer */}
          <div className="flex items-center justify-center gap-1 h-8 my-2">
            {[40, 75, 50, 90, 60, 100, 45, 80, 65, 95, 55, 85].map((height, idx) => (
              <div
                key={idx}
                className={`w-1 rounded-full transition-all duration-300 ${
                  isPlayingWishesAudio
                    ? 'bg-gradient-to-t from-amber-400 to-rose-500 animate-pulse'
                    : 'bg-white/20'
                }`}
                style={{
                  height: isPlayingWishesAudio ? `${height}%` : '20%',
                  animationDelay: `${idx * 0.1}s`
                }}
              />
            ))}
          </div>

          <button
            onClick={handleToggleWishesAudio}
            className="w-full mt-2 py-3 px-4 rounded-2xl font-bold text-xs bg-gradient-to-r from-amber-400 via-rose-500 to-pink-500 text-white shadow-lg shadow-rose-500/30 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
          >
            {isPlayingWishesAudio ? (
              <>
                <Pause className="w-4 h-4 fill-white" />
                <span>Pause Birthday Melody</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white" />
                <span>Play Birthday Celebration Melody 🎶</span>
              </>
            )}
          </button>
        </div>

        {/* 👑 AMMA'S ROYAL VIP PRIVILEGE CARD */}
        <div className="glass-panel rounded-3xl p-4 border border-pink-400/25 text-left relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-rose-300 uppercase tracking-wider">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Official "Amma" Privilege Pass</span>
            </div>
            <span className="text-[10px] text-amber-300 font-mono">LIFETIME VALIDITY</span>
          </div>

          <ul className="text-xs text-pink-100/90 space-y-1.5 py-1">
            <li className="flex items-center gap-2">
              <span className="text-rose-400 font-bold">✓</span> 100% Exemption from getting mad or annoyed today.
            </li>
            <li className="flex items-center gap-2">
              <span className="text-rose-400 font-bold">✓</span> Entitled to all favorite snacks, chocolates & sweet treats.
            </li>
            <li className="flex items-center gap-2">
              <span className="text-rose-400 font-bold">✓</span> Maximum royalty treatment & endless unconditional care.
            </li>
          </ul>

          <button
            onClick={handleRedeemPrivilege}
            className={`w-full mt-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              privilegeRedeemed
                ? 'bg-emerald-500/30 text-emerald-200 border border-emerald-400/40'
                : 'bg-white/10 hover:bg-white/15 text-pink-200 border border-white/15 active:scale-95'
            }`}
          >
            {privilegeRedeemed ? '👑 Royalty Status: ACTIVE & ENFORCED' : '✨ Tap to Claim Royal Privilege'}
          </button>
        </div>

        {/* 💕 CUTE COMPLIMENT GENERATOR */}
        <div className="glass-panel rounded-3xl p-4 border border-rose-400/20 text-center">
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-amber-300 uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Why Deepikha is Unmatched</span>
            <Sparkles className="w-3.5 h-3.5" />
          </div>

          <div className="min-h-[55px] flex items-center justify-center py-2 px-3 bg-white/5 rounded-2xl border border-white/5">
            <p className="text-xs md:text-sm font-medium text-pink-100 italic">
              "{CUTE_REASONS[currentReasonIndex]}"
            </p>
          </div>

          <button
            onClick={handleNextReason}
            className="mt-3 inline-flex items-center gap-1.5 py-2 px-4 rounded-xl text-xs font-semibold bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 border border-rose-500/30 transition-all active:scale-95 cursor-pointer"
          >
            <Laugh className="w-3.5 h-3.5 text-amber-300" />
            <span>Tap for Another Sweet Fact ({currentReasonIndex + 1}/{CUTE_REASONS.length})</span>
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full text-center pb-2">
        <p className="text-[11px] text-pink-300/50 font-handwriting text-base">
          Made with all my heart for my Amma ❤️
        </p>
      </div>
    </div>
  );
}
