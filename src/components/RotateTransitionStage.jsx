import React, { useState, useEffect } from 'react';

export default function RotateTransitionStage({ onProceedToSlideshow }) {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving]   = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const handleTap = () => {
    if (leaving) return;
    setLeaving(true);
    setTimeout(() => onProceedToSlideshow(), 600);
  };

  return (
    <div
      className={`flex-1 flex flex-col items-center justify-center min-h-screen w-full cursor-pointer select-none
        transition-all duration-700
        ${visible  ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
        ${leaving  ? 'opacity-0  scale-110' : ''}
      `}
      onClick={handleTap}
    >
      {/* ambient glows */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-1/3  left-1/4  w-72 h-72 bg-pink-600/20   rounded-full blur-[90px]" />
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-purple-600/20 rounded-full blur-[90px]" />
      </div>

      <div className="relative text-center space-y-8 px-8 max-w-sm z-10">

        {/* rotating phone animation */}
        <div className="flex items-center justify-center gap-4">
          <span className="text-6xl" style={{ display:'inline-block', animation:'rotatePh 3s ease-in-out infinite' }}>
            📱
          </span>
          <div className="flex flex-col gap-1">
            {[12,8,5].map((w,i) => (
              <div key={i}
                className="h-0.5 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 animate-pulse"
                style={{ width: w*4, animationDelay:`${i*0.15}s` }}
              />
            ))}
          </div>
          <span className="text-5xl opacity-70" style={{ display:'inline-block', transform:'rotate(90deg)' }}>
            📱
          </span>
        </div>

        {/* headline */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-rose-300 to-purple-300 leading-tight">
            Amma, Phone Thiruppu! 🌅
          </h1>
          <p className="text-white/70 text-sm leading-relaxed">
            Phone-a <span className="text-pink-300 font-semibold">landscape mode</span>-la veichu amma
          </p>
          <p className="text-purple-300/50 text-xs">
            Horizontal-a irundhaal beautiful-a theriyum 🥺
          </p>
        </div>

        {/* slideshow teaser card */}
        <div className="border border-pink-400/25 rounded-2xl px-5 py-4 bg-white/[0.04] backdrop-blur-sm space-y-1.5">
          <p className="text-white/85 text-base font-semibold">
            Oru chinna slideshow pakkalaama? 🥰
          </p>
          <p className="text-purple-300/55 text-xs leading-relaxed">
            Unakkaagave special-a create pannirukken 💗
          </p>
        </div>

        {/* tap cue */}
        <div className="space-y-1 animate-pulse">
          <p className="text-white/35 text-[11px] tracking-[0.25em] uppercase">
            ✨ Tap anywhere to continue ✨
          </p>
        </div>
      </div>

      {/* keyframe */}
      <style>{`
        @keyframes rotatePh {
          0%,100%  { transform: rotate(0deg);  }
          35%, 65% { transform: rotate(90deg); }
        }
      `}</style>
    </div>
  );
}
