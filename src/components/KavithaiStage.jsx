import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, ChevronDown } from 'lucide-react';
import { sound } from '../utils/audio';

const STANZAS = [
  {
    lines: [
      "En vaazhkaiyil naan thediya",
      "amaidhiyum nee",
      "naan ketkaadha varamum nee 🫂",
    ],
  },
  {
    lines: [
      "En sirippukku kaaranamaai",
      "en kanneerukku aarudhalaai",
      "en thanimaiyil thunaiyaai",
      "en ovvoru naalilum nee 💗",
    ],
  },
  {
    lines: [
      "Nee enakku oru uravu mattum illa",
      "ennai naanaga irukka vaikkum",
      "oru azhagana unarvu nee 🫠",
    ],
  },
  {
    lines: [
      "Amma pola paasam kaattugiraai",
      "nanban pola ennai purindhukolgiraai",
      "sondham pola urimai eduthukkolgiraai",
      "kaadhal pola en manadhai nirappugiraai 🩵",
    ],
  },
  {
    lines: [
      "Enakku ulagam endraal",
      "adhu vaanamum illai",
      "adhu kadalum illai",
      "adhu naan vaazhum idamum illai",
      "",
      "Enakku ulagam endraal",
      "nee sirikkum andha sirippu",
      "nee pesum andha kural",
      "nee ennai azhaikkum andha oru vaarthai",
      "adhudhaan en ulagam 🫂💗",
    ],
  },
  {
    lines: [
      "Sila per namma vaazhkaiyil varuvaanga",
      "sila per namma vaazhkaiya maathuvaanga",
      "aana nee",
      "en vaazhkaiye aayitta 🫠🩵",
    ],
  },
  {
    lines: [
      "Unnudan pesum ovvoru nodiyum",
      "enakku oru ninaivu",
      "unnudan sirikkum ovvoru nimishamum",
      "enakku oru varam",
      "unnudan irukkum ovvoru naalum",
      "enakku oru azhagana vaazhkai 🫂",
    ],
  },
  {
    lines: [
      "Indru un pirandha naal",
      "aanaal en manasu kondaaduvadhu",
      "nee pirandha naalai mattum illa",
      "",
      "En ulagathukku",
      "en uyirukku",
      "en sandhoshathukku",
      "oru artham vandha naalai 💗",
    ],
  },
  {
    lines: [
      "Nee eppovume ippadiye iru",
      "en pakkathula iru",
      "en vaazhkaiyoda ovvoru pakkathilum iru",
      "",
      "Yenendraal",
      "enakku nee vendum endru mattum illa",
      "enakku irukkum ellame",
      "nee dhaan 🫂🩵",
    ],
  },
  {
    lines: [
      "Iniya pirandha naal",
      "en ponnu",
      "en sondham",
      "en family",
      "en best friend",
      "en uyir",
      "en oolagam 💗🫠🫂",
    ],
  },
];

export default function KavithaiStage({ onCompleteKavithai, onBackToLetter, isMuted, toggleAudio }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
    try { sound.playChime(); } catch (e) {}
  }, []);

  const handleProceed = () => {
    try { sound.playCuteYay(); } catch (e) {}
    onCompleteKavithai();
  };

  return (
    <div className={`flex flex-col min-h-screen w-full transition-all duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}>

      {/* Top Bar */}
      <div className="sticky top-0 z-20 flex items-center justify-between px-4 py-3 bg-[#0d0718]/90 backdrop-blur-xl border-b border-purple-500/20">
        <button
          onClick={onBackToLetter}
          className="text-xs text-purple-300/70 hover:text-purple-200 transition-colors px-2 py-1 rounded-lg hover:bg-purple-900/30"
        >
          ← Back
        </button>
        <div className="flex items-center gap-2">
          <Sparkles size={14} className="text-pink-400 animate-pulse" />
          <span className="text-xs font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300 tracking-wider">
            En Maname Sollum Kavithai
          </span>
          <Sparkles size={14} className="text-pink-400 animate-pulse" />
        </div>
        <button onClick={toggleAudio} className="text-purple-300/70 hover:text-purple-200 text-xs px-2 py-1 rounded-lg hover:bg-purple-900/30 transition-colors">
          {isMuted ? '🔇' : '🔊'}
        </button>
      </div>

      {/* Poem Content */}
      <div className="flex-1 px-5 py-6 overflow-y-auto space-y-8">

        {/* Title Card */}
        <div className="text-center space-y-2 py-4">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-400/30 rounded-full px-4 py-1.5">
            <Heart size={14} className="text-pink-400 fill-pink-400 animate-pulse" />
            <span className="text-xs text-pink-300 font-medium tracking-widest uppercase">For Deepikha</span>
            <Heart size={14} className="text-pink-400 fill-pink-400 animate-pulse" />
          </div>
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-rose-300 to-purple-300">
            En Ulagam Nee
          </h1>
          <p className="text-purple-300/50 text-xs italic">~ written with love, just for you ~</p>
        </div>

        {/* Stanzas */}
        {STANZAS.map((stanza, si) => (
          <div
            key={si}
            className="relative bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-5 space-y-1.5 shadow-inner"
            style={{ animationDelay: `${si * 0.1}s` }}
          >
            {/* subtle left glow line */}
            <div className="absolute left-0 top-4 bottom-4 w-0.5 rounded-full bg-gradient-to-b from-pink-500/60 via-purple-500/40 to-transparent" />

            {stanza.lines.map((line, li) =>
              line === '' ? (
                <div key={li} className="h-2" />
              ) : (
                <p
                  key={li}
                  className="text-sm leading-relaxed text-white/80 pl-3 font-light italic tracking-wide"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  {line}
                </p>
              )
            )}
          </div>
        ))}

        {/* Bottom signature */}
        <div className="text-center py-6 space-y-3">
          <div className="flex justify-center gap-1 text-xl">
            💗🫂🩵🫠✨
          </div>
          <p className="text-xs text-purple-300/50 italic">~ idhuvum unakkagave ~</p>
        </div>

        {/* Proceed Button */}
        <div className="pb-8 flex flex-col items-center gap-3">
          <ChevronDown size={18} className="text-pink-400/60 animate-bounce" />
          <button
            onClick={handleProceed}
            className="px-6 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-pink-500/80 to-purple-600/80 border border-pink-400/40 hover:from-pink-500 hover:to-purple-600 hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg shadow-pink-900/30"
          >
            Shall we proceed? ✨
          </button>
        </div>
      </div>
    </div>
  );
}
