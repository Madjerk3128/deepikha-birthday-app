import React, { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  Crown, 
  Heart, 
  Fingerprint, 
  ShieldCheck, 
  Smile, 
  PartyPopper, 
  Lock, 
  Unlock,
  Volume2,
  VolumeX,
  Flame,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { sound } from '../utils/audio';

export default function SurprisePortal({ onUnlock, isMuted, toggleAudio }) {
  const [smileAnswer, setSmileAnswer] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanComplete, setScanComplete] = useState(false);
  const [funnyReaction, setFunnyReaction] = useState('');
  const scanIntervalRef = useRef(null);
  const heartbeatTimerRef = useRef(null);

  // Handle Touch/Mouse hold on scanner
  const startScan = (e) => {
    e.preventDefault();
    if (scanComplete) return;

    sound.init();
    setIsScanning(true);
    sound.playHeartbeat();

    // Loop heartbeat sound while holding
    heartbeatTimerRef.current = setInterval(() => {
      sound.playHeartbeat();
    }, 600);

    const step = 4; // increment per 50ms (takes ~1.25s)
    scanIntervalRef.current = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(scanIntervalRef.current);
          clearInterval(heartbeatTimerRef.current);
          setScanProgress(100);
          setScanComplete(true);
          setIsScanning(false);
          sound.playFanfare();

          // Grand Luxury Confetti Explosion
          const end = Date.now() + 2 * 1000;
          const colors = ['#f43f5e', '#fbbf24', '#c084fc', '#fda4af', '#fef08a'];

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

          // Automatically transition to next page
          setTimeout(() => {
            onUnlock();
          }, 650);

          return 100;
        }
        return prev + step;
      });
    }, 50);
  };

  const endScan = () => {
    if (scanComplete) return;
    setIsScanning(false);
    clearInterval(scanIntervalRef.current);
    clearInterval(heartbeatTimerRef.current);
    setScanProgress(0);
  };

  const handleSmileSelect = (choice) => {
    sound.playPop();
    setSmileAnswer(choice);
    if (choice === 'super') {
      setFunnyReaction('Confirmed: Cutest smile in the entire universe! ✨');
    } else {
      setFunnyReaction('Aww yes! Keep that dazzling smile on forever 🥰');
    }
  };


  return (
    <div className="flex flex-col items-center justify-between min-h-full py-6 px-4 text-center z-10 select-none">
      {/* Top Floating Luxury Header */}
      <div className="w-full flex justify-between items-center px-1 mb-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-pill text-xs font-semibold text-amber-300 border border-amber-400/30 shadow-[0_0_15px_rgba(251,191,36,0.2)]">
          <Crown className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
          <span>VIP ACCESS #1002</span>
        </div>

        <button
          onClick={toggleAudio}
          className="p-2 rounded-full glass-pill text-rose-300 hover:text-white transition-all active:scale-95"
          title={isMuted ? "Unmute Sound" : "Mute Sound"}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-300" />}
        </button>
      </div>

      {/* Main Hero Card */}
      <div className="w-full flex-1 flex flex-col items-center justify-center my-auto">
        {/* Shimmering Badge */}
        <div className="relative mb-3">
          <div className="absolute -inset-2 bg-gradient-to-r from-pink-500 via-amber-400 to-rose-500 rounded-3xl blur-md opacity-40 animate-pulse"></div>
          <div className="relative glass-card-gold px-6 py-2.5 rounded-2xl border border-amber-300/40 shadow-xl">
            <span className="text-xs uppercase tracking-widest text-amber-200 font-semibold flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              Special Birthday Clearance
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            </span>
          </div>
        </div>

        {/* Personalized Calling Name & Greeting */}
        <div className="space-y-1 mb-5">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            <span className="text-white">Hello, </span>
            <span className="gold-shimmer-text font-luxury text-4xl md:text-5xl block mt-1">Deepikha</span>
          </h1>
          <div className="inline-block mt-1">
            <span className="font-handwriting text-2xl md:text-3xl text-rose-300 tracking-wide">
              (My sweetest Amma ❤️)
            </span>
          </div>
          <p className="text-xs md:text-sm text-pink-200/80 max-w-[280px] mx-auto pt-1 leading-relaxed">
            A top-secret surprise protocol has been configured specifically for you.
          </p>
        </div>

        {/* Interactive Readiness Console */}
        <div className="w-full glass-panel rounded-3xl p-4 md:p-5 border border-pink-500/20 shadow-2xl space-y-4 text-left">
          {/* Section title */}
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-pink-300 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Surprise Readiness Check
            </span>
            <span className="text-[10px] bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded-full border border-rose-500/30">
              Mandatory 🔒
            </span>
          </div>

          {/* Test 1: Smile Verification */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-pink-100/90 flex items-center gap-1.5">
              <Smile className="w-3.5 h-3.5 text-amber-400" />
              1. Are you smiling right now?
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleSmileSelect('yes')}
                className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 ${
                  smileAnswer === 'yes'
                    ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-500/30 scale-[1.02]'
                    : 'bg-white/5 hover:bg-white/10 text-pink-200 border border-white/10'
                }`}
              >
                <span>Yes! 🥰</span>
              </button>
              <button
                type="button"
                onClick={() => handleSmileSelect('super')}
                className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 ${
                  smileAnswer === 'super'
                    ? 'bg-gradient-to-r from-amber-400 to-rose-500 text-white shadow-lg shadow-amber-500/30 scale-[1.02]'
                    : 'bg-white/5 hover:bg-white/10 text-pink-200 border border-white/10'
                }`}
              >
                <span>Super Yes! 💖</span>
              </button>
            </div>
          </div>

          {/* Test 2: Biometric Heartbeat / Fingerprint Scanner */}
          <div className="space-y-2 pt-1">
            <div className="flex justify-between items-center text-xs">
              <label className="font-medium text-pink-100/90 flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-rose-400" />
                2. Heartbeat & Excitement Sync
              </label>
              <span className={`text-[11px] font-bold ${scanComplete ? 'text-emerald-400' : 'text-amber-300'}`}>
                {scanComplete ? 'Verified 100%' : `${scanProgress}%`}
              </span>
            </div>

            <div className="flex flex-col items-center justify-center pt-2">
              <div
                onMouseDown={startScan}
                onMouseUp={endScan}
                onTouchStart={startScan}
                onTouchEnd={endScan}
                className={`relative cursor-pointer select-none rounded-full w-24 h-24 flex items-center justify-center transition-all duration-300 ${
                  scanComplete
                    ? 'bg-emerald-500/20 border-2 border-emerald-400 text-emerald-300 shadow-[0_0_30px_rgba(52,211,153,0.4)]'
                    : isScanning
                    ? 'bg-rose-600/30 border-2 border-rose-400 text-rose-200 animate-scanner-glow scale-105'
                    : 'bg-white/5 border-2 border-dashed border-rose-400/40 text-pink-300 hover:border-rose-300/80 hover:bg-white/10'
                }`}
              >
                {/* SVG Circular Progress Bar */}
                <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
                  <circle
                    cx="48"
                    cy="48"
                    r="44"
                    className="stroke-white/10"
                    strokeWidth="4"
                    fill="transparent"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r="44"
                    className="stroke-rose-400 transition-all duration-75"
                    strokeWidth="4"
                    strokeDasharray={276}
                    strokeDashoffset={276 - (276 * scanProgress) / 100}
                    strokeLinecap="round"
                    fill="transparent"
                  />
                </svg>

                {scanComplete ? (
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 animate-bounce" />
                ) : isScanning ? (
                  <Heart className="w-10 h-10 text-rose-400 animate-pulse-heart" />
                ) : (
                  <Fingerprint className="w-10 h-10 text-rose-300/80 animate-pulse" />
                )}
              </div>

              <span className="text-[11px] text-pink-200/70 mt-2 font-medium">
                {scanComplete
                  ? '✨ Heartbeat Authenticated: Infinite Love!'
                  : isScanning
                  ? 'Scanning heartbeat... Keep holding!'
                  : 'Tap & Hold finger on the icon'}
              </span>
            </div>
          </div>

          {/* Funny Status Reaction Toast */}
          {funnyReaction && (
            <div className="bg-rose-500/15 border border-rose-400/30 rounded-xl p-2.5 text-center animate-fade-in">
              <p className="text-xs text-rose-200 font-medium">{funnyReaction}</p>
            </div>
          )}

          {/* Funny Disclaimer */}
          <div className="bg-amber-400/10 border border-amber-400/20 rounded-xl p-2.5 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p className="text-[10px] text-amber-200/90 leading-tight">
              <strong>Official Disclaimer:</strong> High levels of pampering, sweet jokes, and heartfelt celebrations ahead.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Status & Info */}
      <div className="w-full pt-3 text-center">
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] text-pink-200/80">
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
          <span>Hold Biometric Scanner to Enter Automatically 👑</span>
        </div>
        <p className="text-[11px] text-pink-300/40 text-center mt-2 font-handwriting text-base">
          Crafted with all my love for Deepikha (Amma) ❤️
        </p>
      </div>
    </div>
  );
}
