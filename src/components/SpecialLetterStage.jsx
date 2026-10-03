import React, { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Heart, 
  Sparkles, 
  Mail, 
  Crown, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  ArrowRight,
  ChevronDown,
  Check,
  FileText
} from 'lucide-react';
import { sound } from '../utils/audio';

const LETTER_PARAGRAPHS = [
  "Happy Birthday en Deepi maaaaa 🥹🤍🫂🎂💗🫶🏻✨\nEnna solli start panradhu ne therila maaa 🥹🤍 Unakku birthday wish panradhu mattum illa ma enakku romba romba special ah irukura oru person ah pathi konjam pesa kedaicha maadhiri feel aagudhu 🫂💗",
  "Nee enakku just oru person illa maaa 🥹 Nee en amma 🤍🫂 en kolandha 👶🏻💗 en oolagam 🌍 en universe 🌌 en best friend 🫶🏻 en comfort zone 🥺🤍 en happiness 😭💗 en safe place 🫂 enakku ellame nee dhaan maaa 🥹🤍",
  "Nee illana na illa nu solra alavuku nee en life la oru periya part aayita 🥹🫂💗 Sila per namma life ku vandhu konjam memories kuduthu poiduvanga aana nee apdi illa maaa 🤍 Nee vandhadhuku apram dhaan enakku oru person ah evlo close ah feel panna mudiyum nu therinjadhu 🥹🫶🏻",
  "Unkitta naan enna venaalum pesalaam nu oru feeling iruku maaa 🫂🤍 Enakku happy ah irundhalum first share panna thonradhu nee dhaan 💗 Enakku kashtama irundhalum unna theda thonum 🥺🫂 Enakku edhuvum pesa mudiyama irundhalum kooda nee pakkathula irundha podhum nu feel aagum maaa 🤍",
  "Deepi ma nu unna koopidradhe enakku oru thani happiness 🥹🤍🫂 Thangooo 🥺💗 Chellooo 😭🫶🏻 En kolandhaaa 👶🏻🤍 nu koopidumbodhu kooda nee enakku evlo special nu enakku mattum dhaan puriyum 🥹🫂💗 Un mela irukura paasam ah words la full ah explain panna mudiyave mudiyadhu maaa 😭🤍",
  "Sila relationships ku name vechurlaam aana namma relationship ah oru single word la solla mudiyadhu 🥹🫶🏻 Nee enakku akka madhiri iruka amma madhiri iruka friend madhiri iruka kolandha madhiri iruka nu sollave mudiyala 😭🤍 Nee ellame mix aana oru beautiful person maaa 🫂💗✨",
  "Enna naan pannalum enna pesinalum enna mood la irundhalum somehow nee enna understand panniduva 🥹🫂 Sometimes naan sollama irukradha kooda nee purinjikira maadhiri irukum 🤍🥺 Adhu enakku romba special maaa 💗 Un care un paasam un scolding un support un advice un silly talks un comedy ellame enakku romba precious 🥹🫶🏻 Nee enna thittina kooda adhu kooda paasama dhaan feel aagum 😭😂🤍 Nee en mela care panra way enakku romba romba pidikkum maaa 🫂💗",
  "Namma pesuna conversations la sila perusa matter eh irukadhu 😂😭 aana andha small small moments dhaan enakku romba precious 🥹🤍 Random ah pesuradhu random ah sirikkaradhu random ah sanda podradhu 😂🫂 konjam neram pesama irundhalum somehow namma bond apdiye irukradhu 💗✨ Idhellame enakku romba special maaa 🥹🫶🏻 Unkooda irukura every little memory um enakku romba close ah irukum 🤍🫂",
  "Nee tired ah irundhalum sad ah irundhalum overthink pannalum edhu nadandhalum nee thaniya feel panna koodadhu maaa 🥹🤍🫂 Unakku eppovume oru aal irukaanu ninaichiko 🫶🏻💗 Naan always un pakkathula iruppen maaa 🥹🫂 Life la enna changes vandhalum enna situations vandhalum namma bond mattum maarakoodadhu nu romba wish panren 🤍✨ Namma ippadiye sanda pottu pesi sirichu tease panni care pannitu irukanum 🥹😂🫂💗",
  "Indha birthday la unakku naan wish panradhu ore oru vishayam dhaan maaa 🥹🤍 Nee epovume happy ah irukanum 🫂💗 Un face la irukura andha smile eppovume pooga koodadhu 😭🫶🏻 Un life la evlo problems vandhalum adha vida neraya happiness unakku kedaikanum 🤍✨ Nee deserve panra ella nalla vishayamum un life la nadakkanum 🥹🌍💗 Un dreams ellame one by one fulfill aaganum 🫂✨ Nee edha achieve pannalum naan un mela proud ah iruppen maaa 🥹🤍🫶🏻",
  "Unakku health happiness peace success love ellame neraya kedaikanum 🥹🤍🫂 Unakku pidicha maadhiri un life beautiful ah poganum 💗✨ Unakku kashtama irukura days seekiram poidanuum 🥺🫂 Happy ah irukura days romba romba neraya irukanum 😭💗 Nee evlo periya aal aanaalum enakku nee eppovume en Deepi ma dhaan 🥹🤍🫶🏻 En thangoo dhaan 🥺💗 En chelloo dhaan 😭🫂 En kolandha dhaan 👶🏻🤍",
  "Honestly maaa nee en life la vandhadhu enakku kedaicha one of the most beautiful things 🥹🤍🫂 Un presence itself gives me so much comfort 💗🥺 Sometimes nee enna perusa edhuvum pannama just pesitu irundha podhum enakku better ah feel aagidum 🫂🤍 Adhaan nee enakku evlo important nu puriyudhu maaa 🥹🫶🏻 Nee irukradhe oru blessing maadhiri feel aagudhu 🤍✨",
  "So once again Happy Birthday en ammaaa 🥹🤍🫂🎂💗 Happy Birthday en Deepi maaa 🥺🫶🏻💗 Happy Birthday en thangooo 😭🤍 Happy Birthday en chellooo 🥹🫂 Happy Birthday en kolandhaaa 👶🏻💗 Happy Birthday en best friendddd 🫶🏻🤍 Happy Birthday en comfort zoneeee 🥺🫂 Happy Birthday en oolagameeee 🌍💗 Happy Birthday en universeeee 🌌🥹🤍",
  "Nee eppovume ippadiye happy ah irukanum maaa 🥹🫂🤍 Un smile ah naan eppovume paakanum 💗🫶🏻 Unakku edhu nadandhalum nee thaniya face panna vendam 🥺🤍 Naan irukken maaa 🫂💗 Enna situation ah irundhalum enna problem ah irundhalum nee enakku always important dhaan 🥹🫶🏻",
  "Love youuuuu sooooo muchhhhh en Deepi maaaaa 🥹🤍🫂💗🫶🏻😭😘✨🎂💐🤍🫂🫶🏻💗🌍🌌🥺👶🏻💞💕 🥰🥰😘💕💕🫂🫂🫂"
];

export default function SpecialLetterStage({ onCompleteLetter, onBackToWishes, isMuted, toggleAudio }) {
  const [sealedLove, setSealedLove] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollRef = useRef(null);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    const maxScroll = scrollHeight - clientHeight;
    const progress = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;
    setScrollProgress(progress);
  };

  const handleSealLove = () => {
    sound.playCuteYay();
    setSealedLove(true);
    confetti({
      particleCount: 55,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#f43f5e', '#fbbf24', '#ec4899', '#fda4af']
    });
  };

  const handleProceed = () => {
    sound.playFanfare();
    confetti({
      particleCount: 75,
      spread: 85,
      origin: { y: 0.5 },
      colors: ['#fbbf24', '#f43f5e', '#a855f7', '#38bdf8']
    });
    onCompleteLetter();
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-full py-4 px-3 sm:px-4 text-center z-10 select-none">
      {/* Top Navigation Bar */}
      <div className="w-full flex justify-between items-center px-1 mb-2">
        <button
          onClick={onBackToWishes}
          className="flex items-center gap-1 text-xs text-pink-300 hover:text-white glass-pill px-3 py-1.5 rounded-full transition-all active:scale-95 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Back to Wishes</span>
        </button>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-pill text-xs font-semibold text-amber-300 border border-amber-400/30">
          <Mail className="w-3.5 h-3.5 text-amber-400" />
          <span>Special Words to My Amma</span>
        </div>

        <button
          onClick={toggleAudio}
          className="p-2 rounded-full glass-pill text-rose-300 hover:text-white transition-all active:scale-95 cursor-pointer"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-300" />}
        </button>
      </div>

      {/* Main Letter Scrollable Box (PDF / Document Viewer Mode) */}
      <div className="w-full flex-1 flex flex-col items-center justify-center my-auto">
        {/* Category Header Badge */}
        <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold border border-rose-500/30 shadow-lg mb-2.5 animate-pulse">
          <Crown className="w-3.5 h-3.5 text-amber-300" />
          <span>Special Wordings to My Amma</span>
          <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
        </div>

        {/* Scrollable Luxury Letter Parchment */}
        <div className="w-full glass-panel rounded-3xl border border-pink-400/35 shadow-2xl relative overflow-hidden bg-gradient-to-b from-[#241334]/95 via-[#1a0c28]/95 to-[#12081d]/95 flex flex-col">
          
          {/* Document Top Bar with Reading Progress */}
          <div className="px-4 py-2.5 bg-black/40 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              <span className="text-xs font-semibold text-amber-200 tracking-wide">
                en kolandhai idhu unakku ❤️
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-amber-400 to-rose-500 transition-all duration-150"
                  style={{ width: `${scrollProgress}%` }}
                />
              </div>
              <span className="text-[10px] text-pink-300 font-mono">
                {Math.round(scrollProgress)}%
              </span>
            </div>
          </div>

          {/* Scrollable Content Container (PDF Scroll View) */}
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="p-5 sm:p-6 overflow-y-auto max-h-[420px] sm:max-h-[450px] text-left space-y-3.5 text-pink-100/95 leading-relaxed text-xs sm:text-sm font-normal touch-pan-y"
          >
            {LETTER_PARAGRAPHS.map((paragraph, index) => (
              <div 
                key={index}
                className="bg-white/[0.02] p-3 rounded-2xl border border-white/[0.04] hover:border-rose-400/20 transition-colors"
              >
                <p className="whitespace-pre-line leading-relaxed text-pink-50">
                  {paragraph}
                </p>
              </div>
            ))}

            {/* Letter Sign-off */}
            <div className="pt-4 flex justify-between items-end border-t border-white/10 mt-6">
              <div>
                <span className="font-handwriting text-2xl text-rose-300 block">
                  With unlimited love
                </span>
                <span className="text-[11px] text-pink-300/60 font-mono">
                  Always & Forever ❤️
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs text-amber-300 font-bold uppercase tracking-wider block">
                  Forever Yours
                </span>
                <span className="text-[10px] text-amber-200/70">✨ Queen of My Heart</span>
              </div>
            </div>
          </div>

          {/* Scroll Bottom Cue (shows when scroll < 90%) */}
          {scrollProgress < 90 && (
            <div className="py-1.5 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-center gap-1 text-[10px] text-amber-300/90 font-medium">
              <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
              <span>Scroll down to read all sweet words</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="w-full mt-4 space-y-2.5">
          <button
            type="button"
            onClick={handleSealLove}
            className={`w-full py-3 px-4 rounded-2xl text-xs font-bold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
              sealedLove
                ? 'bg-emerald-500/25 text-emerald-200 border border-emerald-400/40'
                : 'bg-white/10 hover:bg-white/15 text-pink-200 border border-white/15 active:scale-95'
            }`}
          >
            {sealedLove ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Letter Sealed with Infinite Love! 💖</span>
              </>
            ) : (
              <>
                <Heart className="w-4 h-4 text-rose-400 fill-rose-400 animate-pulse" />
                <span>Tap to Seal Letter with a Hug & Love 🫂✨</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleProceed}
            className="w-full py-3 px-5 rounded-2xl font-bold text-xs sm:text-sm tracking-wide bg-gradient-to-r from-amber-400 via-rose-500 to-pink-500 text-white shadow-lg shadow-rose-500/30 gold-border-glow hover:scale-[1.02] active:scale-95 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Shall we proceed? ✨</span>
            <ArrowRight className="w-4 h-4 text-amber-200" />
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full text-center pb-1">
        <p className="text-[11px] text-pink-300/40 font-handwriting text-base">
          Written with all my heart for my Amma ❤️
        </p>
      </div>
    </div>
  );
}
