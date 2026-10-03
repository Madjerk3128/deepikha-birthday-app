import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, ChevronLeft, ImageOff } from 'lucide-react';
import { sound } from '../utils/audio';

const BASE = import.meta.env.BASE_URL || '/';

/* ─── Slide data ─────────────────────────────────────────────────────────── */
const SLIDES = [
  {
    photo: `${BASE}photos/slide1.png`,
    texts: [
      'En ulagame oda kolandhai pic aiyo semma cute ah konjite irundhurupa pola 🥹❤️',
      'Peran appovum ipovum eppovum un sirippu mattum maarala andha azhagana sirippu 😭❤️',
      'Andha azhagana kolandhai kanna paatha semma cute la aiyo paatha thena ooruguthu 🥹🫶',
      'Unna pakka pakka indha kolandhai la na un appava irundhirukka koodatha nu thonuthu 🥺',
      'Appo unna thooki valartha indha kai ippo unakkaaga romba eanguthu dii 🥹❤️',
    ],
    bg: 'from-rose-950 via-pink-950 to-fuchsia-950',
    textColor: '#fecdd3',
    dot: 'bg-pink-400',
    glow: 'rgba(244,63,94,0.18)',
  },
  {
    photo: `${BASE}photos/slide2.png`,
    texts: [
      'Adaa, China visual-ah kooda un kangal appadiya irukkayyy 😭😂❤️ Appo kooda un iconic sirippa vittu tharaala nee 😂🫠❤️',
      'Indha visual-la naan un kooda porandha thambiyaa irukkanum nu aasai padren 🥹🫂 Un kooda vilayadittu, sendhu pesittu, sirichittu irukkanum nu aasai padren 🥹❤️🫂',
      'Aana nee nikra parade attention, stand-at-ease pose-la adhu dhaan sirippa irukku Deepi maa,ana romba cute rii nee 😂😂😂🫠❤️',
    ],
    bg: 'from-purple-950 via-indigo-950 to-blue-950',
    textColor: '#e0e7ff',
    dot: 'bg-purple-400',
    glow: 'rgba(139,92,246,0.18)',
  },
  {
    photo: `${BASE}photos/slide3.png`,
    texts: [
      'Aaiyooo sema cute-aa irukka ma nee 🫠🥹🥹🥹 Unna paathuttay irukkanum nu thonudhu ma 🫠🫠❤️',
      'Eppavum pola chinna vishayathulayum irukkura sirippu… enakku ippo un mogathula venum 🫠🫠🥹❤️',
      'Andha pinju kai kaal-la parade 🥹 Aaiyooo, adha pudichuttu nadakkanum nu irukku ma 🫠🫠🫠🫶 Adhu un kaal-la endha kalum padave koodaadhu ma 🥹🫂❤️',
      'Eppavum pola oru azhagaana sirippu 🫠🫠🥹❤️',
      'Kannathula oru pulli… aaiyooo 🫠 Andha mai unna innum nallaa eduthu kaattudhu ma 🫠😘😘🫂🫂❤️',
    ],
    bg: 'from-amber-950 via-orange-950 to-rose-950',
    textColor: '#fde68a',
    dot: 'bg-amber-400',
    glow: 'rgba(245,158,11,0.18)',
  },
  {
    photo: `${BASE}photos/slide4.png`,
    texts: [
      'Un mooli… adhu enna appadiya oorgu veikkudhu Deepi maa 🫠🫠🫠🥺🥺🥺🫂🫂🫂',
      'Enna di, appovey marriage-aa maalai la potturukka? 😂😂😂🌸',
      'En kai-la eangudhu di 🫠🫠🫠 Unna en madi-la thooki vechu konjanum, unna nallaa paathukanum nu irukku 🫠🫠🫠🫠🥹🫂❤️',
      'Andha mooli-aa… parade thiruttu mooli diii 🫠🫠 Ellathayum andha mooli-la en heart-ah thiruditta 🫠🫠🫠🥹🥹🥹❤️',
      'En kutti maa 🫠🫠🫠 Ippadiya? Indha birthday mattum illa, ella birthday-kum nee romba romba romba happy-aa irukkanum 🫠🫠🥹❤️🫂',
      'Thirumba nee kolandhai-aa maaru… naan unna paathukren 🫠🫠🫠🥹🥹🥹🫂❤️',
    ],
    bg: 'from-teal-950 via-cyan-950 to-indigo-950',
    textColor: '#99f6e4',
    dot: 'bg-teal-400',
    glow: 'rgba(20,184,166,0.18)',
  },
  {
    photo: `${BASE}photos/slide5.png`,
    texts: [
      'ladies ranuvapadai apovey 😂😂😂😂😂🫂🫂😘😘',
      'Happy Birthday once again en uyir, en ulagam, en Deepi maaaaa 💗🎉👑',
    ],
    bg: 'from-pink-950 via-rose-950 to-purple-950',
    textColor: '#fbcfe8',
    dot: 'bg-fuchsia-400',
    glow: 'rgba(236,72,153,0.18)',
  },
  {
    isTrio: true,
    photos: [
      `${BASE}photos/slide6_1.png`,
      `${BASE}photos/slide6_2.jpg`,
      `${BASE}photos/slide6_3.png`,
    ],
    texts: [],
    bg: 'from-violet-950 via-purple-950 to-rose-950',
    textColor: '#fbcfe8',
    dot: 'bg-pink-400',
    glow: 'rgba(236,72,153,0.22)',
  },
  {
    isTrio: true,
    photos: [
      `${BASE}photos/slide7_1.jpg`,
      `${BASE}photos/slide7_2.jpg`,
      `${BASE}photos/slide7_3.png`,
    ],
    texts: [],
    bg: 'from-rose-950 via-fuchsia-950 to-indigo-950',
    textColor: '#fbcfe8',
    dot: 'bg-purple-400',
    glow: 'rgba(217,70,239,0.22)',
  },
];

/* ─── Word-by-word reveal (JS driven, no CSS keyframes) ──────────────────── */
function AnimatedWords({ text, triggerKey }) {
  const words = (text || '').split(' ');
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(0);
    const timers = words.map((_, i) =>
      setTimeout(() => setCount(i + 1), i * 90)
    );
    return () => timers.forEach(clearTimeout);
  }, [text, triggerKey]);

  return (
    <>
      {words.map((word, i) => (
        <span
          key={i}
          style={{
            display: 'inline-block',
            marginRight: '0.28em',
            opacity: i < count ? 1 : 0,
            transform: i < count ? 'translateY(0px)' : 'translateY(8px)',
            transition: 'opacity 0.35s ease, transform 0.35s ease',
          }}
        >
          {word}
        </span>
      ))}
    </>
  );
}

/* ─── Photo with JS reveal ───────────────────────────────────────────────── */
function PhotoReveal({ src, alt, onError, triggerKey }) {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    setShown(false);
    const t = setTimeout(() => setShown(true), 150);
    return () => clearTimeout(t);
  }, [triggerKey]);

  return (
    <img
      src={src}
      alt={alt}
      onError={onError}
      style={{
        display: 'block',
        width: '100%',
        maxWidth: 180,
        maxHeight: 220,
        minHeight: 140,
        objectFit: 'cover',
        borderRadius: 12,
        opacity: shown ? 1 : 0,
        transform: shown ? 'scale(1) rotate(0deg)' : 'scale(0.88) rotate(-4deg)',
        transition: 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.22,1,0.36,1)',
      }}
    />
  );
}

/* ─── Main ───────────────────────────────────────────────────────────────── */
export default function SlideshowStage({ onCompleteSlideshow, isMuted, toggleAudio }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentTextIdx, setCurrentTextIdx] = useState(0);
  const [trioVisibleCount, setTrioVisibleCount] = useState(1); // 1, 2, 3 photos visible on slide 6
  const [visible, setVisible] = useState(false);
  const [slideKey, setSlideKey] = useState(0);
  const [transitioning, setTrans] = useState(false);
  const [imgError, setImgError] = useState({});

  const audioRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);

    // Initialize and play background music for slideshow
    const audio = new Audio(`${BASE}audio/slideshow_bgm.mpeg`);
    audio.loop = true;
    audio.muted = isMuted;
    audioRef.current = audio;

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // User gesture handler in case autoplay was blocked by browser
        const onFirstInteract = () => {
          if (audioRef.current) {
            audioRef.current.play().catch(() => {});
          }
          window.removeEventListener('click', onFirstInteract);
          window.removeEventListener('touchstart', onFirstInteract);
        };
        window.addEventListener('click', onFirstInteract);
        window.addEventListener('touchstart', onFirstInteract);
      });
    }

    return () => {
      clearTimeout(t);
      // Stop and clean up audio when exiting slideshow
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current = null;
      }
    };
  }, []);

  // Sync mute state with audio
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const slide = SLIDES[currentSlide];
  const totalTextsInSlide = slide.texts.length;
  const currentText = slide.texts[currentTextIdx] || slide.texts[0];

  // ── Next photo transition helper ──────────────────────────────────────
  const advanceToNextPhoto = () => {
    if (currentSlide === SLIDES.length - 1) {
      try { sound.playCuteYay(); } catch (_) {}
      onCompleteSlideshow();
    } else {
      try { sound.playPop(); } catch (_) {}
      setTrans(true);
      setTimeout(() => {
        setCurrentSlide(prev => prev + 1);
        setCurrentTextIdx(0);
        setTrioVisibleCount(1);
        setSlideKey(k => k + 1);
        setTrans(false);
      }, 350);
    }
  };

  // ── Tap on Slide Screen → advance to next text or next photo ────────────
  const handleSlideScreenTap = () => {
    if (transitioning) return;

    if (slide.isTrio) {
      // Step-by-step reveal: 1st click -> 1 photo, 2nd click -> 2 photos, 3rd click -> 3 photos, 4th click -> finish / next stage!
      if (trioVisibleCount < 3) {
        try { sound.playPop(); } catch (_) {}
        setTrioVisibleCount(prev => prev + 1);
      } else {
        advanceToNextPhoto();
      }
      return;
    }

    if (currentTextIdx < totalTextsInSlide - 1) {
      try { sound.playPop(); } catch (_) {}
      setCurrentTextIdx(prev => prev + 1);
    } else {
      // Reached max lines for this photo -> automatically proceed to next photo!
      advanceToNextPhoto();
    }
  };

  // ── Next button → Advance to next photo ─────────────────────────────────
  const handleNextPhoto = (e) => {
    e.stopPropagation(); // Don't trigger slide tap
    if (transitioning) return;
    advanceToNextPhoto();
  };

  // ── Prev button → Back to previous photo ────────────────────────────────
  const handlePrevPhoto = (e) => {
    e.stopPropagation();
    if (transitioning || currentSlide === 0) return;

    setTrans(true);
    setTimeout(() => {
      setCurrentSlide(prev => prev - 1);
      setCurrentTextIdx(0);
      setTrioVisibleCount(1);
      setSlideKey(k => k + 1);
      setTrans(false);
    }, 350);
  };

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.7s ease',
        userSelect: 'none',
      }}
    >
      {/* ── Top Bar ── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 16px',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          background: 'rgba(0,0,0,0.35)',
          backdropFilter: 'blur(16px)',
          flexShrink: 0,
          zIndex: 20,
        }}
      >
        {/* Photo Dots */}
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          {SLIDES.map((s, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === currentSlide ? `w-6 ${s.dot}` : 'w-1.5 bg-white/20'
              }`}
            />
          ))}
        </div>

        {/* Text progression indicators within current photo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {slide.texts.length > 1 &&
            slide.texts.map((_, tidx) => (
              <div
                key={tidx}
                style={{
                  width: tidx === currentTextIdx ? 12 : 5,
                  height: 5,
                  borderRadius: 999,
                  backgroundColor: tidx === currentTextIdx ? '#f472b6' : 'rgba(255,255,255,0.25)',
                  transition: 'all 0.3s ease',
                }}
              />
            ))}
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.15em', marginLeft: 6 }}>
            PHOTO {currentSlide + 1}/{SLIDES.length}
          </span>
        </div>

        <button
          onClick={e => { e.stopPropagation(); toggleAudio(); }}
          style={{
            fontSize: 12,
            color: 'rgba(255,255,255,0.4)',
            padding: '4px 8px',
            borderRadius: 8,
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          {isMuted ? '🔇' : '🔊'}
        </button>
      </div>

      {/* ── Slide Body (Clickable to change text) ── */}
      <div
        onClick={handleSlideScreenTap}
        className={`flex-1 bg-gradient-to-br ${slide.bg}`}
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'nowrap',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          cursor: 'pointer',
          opacity: transitioning ? 0 : 1,
          transform: transitioning ? 'scale(0.97)' : 'scale(1)',
          transition: 'opacity 0.35s ease, transform 0.35s ease',
        }}
        title="Tap anywhere on the screen for the next text!"
      >
        {/* Ambient glow */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: 220,
              height: 220,
              background: slide.glow,
              borderRadius: '50%',
              filter: 'blur(80px)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: 220,
              height: 220,
              background: slide.glow,
              borderRadius: '50%',
              filter: 'blur(80px)',
            }}
          />
        </div>

        {slide.isTrio ? (
          /* ── 3 PHOTOS TRIO LAYOUT (NO TEXT) - CLICK TO REVEAL ONE BY ONE ── */
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 20,
              padding: '16px 24px',
              zIndex: 10,
            }}
          >
            {slide.photos.slice(0, trioVisibleCount).map((pSrc, pIdx) => {
              const rotation = pIdx === 0 ? '-3deg' : pIdx === 1 ? '1.5deg' : '-2deg';
              return (
                <div
                  key={`${slideKey}-${pIdx}`}
                  style={{
                    position: 'relative',
                    transition: 'transform 0.4s ease, opacity 0.5s ease',
                    animation: 'photoReveal 0.6s cubic-bezier(0.22,1,0.36,1) forwards',
                  }}
                  className="hover:scale-105"
                >
                  <div
                    style={{
                      background: 'rgba(255,255,255,0.09)',
                      border: '1px solid rgba(255,255,255,0.22)',
                      borderRadius: 16,
                      padding: 8,
                      boxShadow: '0 10px 40px rgba(0,0,0,0.6)',
                      transform: `rotate(${rotation})`,
                    }}
                  >
                    <img
                      src={pSrc}
                      alt={`Memory 6-${pIdx + 1}`}
                      style={{
                        display: 'block',
                        width: 'auto',
                        maxWidth: 160,
                        maxHeight: 250,
                        minHeight: 180,
                        objectFit: 'cover',
                        borderRadius: 12,
                        animation: 'photoReveal 0.7s cubic-bezier(0.22,1,0.36,1) forwards',
                        animationDelay: `${pIdx * 0.15}s`,
                      }}
                    />
                  </div>

                  {/* Sparkle hearts on corners */}
                  {pIdx === 0 && (
                    <div
                      style={{
                        position: 'absolute',
                        top: -8,
                        left: -6,
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        background: 'rgba(244,114,182,0.8)',
                      }}
                      className="animate-ping"
                    />
                  )}
                  {pIdx === 1 && (
                    <div
                      style={{
                        position: 'absolute',
                        top: -10,
                        right: -6,
                        fontSize: 16,
                        animation: 'bounce 2s infinite',
                      }}
                    >
                      👑
                    </div>
                  )}
                  {pIdx === 2 && (
                    <div
                      style={{
                        position: 'absolute',
                        bottom: -6,
                        right: -6,
                        fontSize: 14,
                        animation: 'pulse 1.8s infinite',
                      }}
                    >
                      💖
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <>
            {/* ── PHOTO — LEFT ── */}
            <div
              style={{
                flexShrink: 0,
                width: '44%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 16,
                zIndex: 10,
              }}
            >
              <div style={{ position: 'relative' }}>
                {/* Polaroid frame */}
                <div
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.18)',
                    borderRadius: 16,
                    padding: 8,
                    boxShadow: '0 8px 40px rgba(0,0,0,0.55)',
                    transform: 'rotate(-1.5deg)',
                  }}
                >
                  {!imgError[currentSlide] ? (
                    <PhotoReveal
                      key={slideKey}
                      src={slide.photo}
                      alt={`Memory ${currentSlide + 1}`}
                      onError={() => setImgError(e => ({ ...e, [currentSlide]: true }))}
                      triggerKey={slideKey}
                    />
                  ) : (
                    <div
                      style={{
                        width: 150,
                        height: 180,
                        borderRadius: 12,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px dashed rgba(255,255,255,0.15)',
                        color: 'rgba(255,255,255,0.3)',
                        gap: 8,
                      }}
                    >
                      <ImageOff size={26} />
                      <span style={{ fontSize: 10, textAlign: 'center', padding: '0 8px', lineHeight: 1.4 }}>
                        Photo coming soon 🥹
                      </span>
                    </div>
                  )}
                </div>

                {/* Sparkle dot */}
                <div
                  style={{
                    position: 'absolute',
                    top: -8,
                    right: -8,
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    background: 'rgba(244,114,182,0.7)',
                  }}
                  className="animate-ping"
                />
              </div>
            </div>

            {/* ── WORDINGS — RIGHT ── */}
            <div
              style={{
                flex: 1,
                minWidth: 0,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '16px 24px 16px 8px',
                gap: 12,
                zIndex: 10,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: '0.25em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.3)',
                  }}
                >
                  Memory {currentSlide + 1}
                </span>

                {totalTextsInSlide > 1 && (
                  <span
                    style={{
                      fontSize: 10,
                      color: '#f472b6',
                      background: 'rgba(244,114,182,0.15)',
                      padding: '2px 8px',
                      borderRadius: 999,
                      fontWeight: 600,
                    }}
                  >
                    Line {currentTextIdx + 1} of {totalTextsInSlide}
                  </span>
                )}
              </div>

              {/* Animated text line */}
              <p
                key={`${currentSlide}-${currentTextIdx}`}
                style={{
                  margin: 0,
                  fontSize: 15,
                  fontWeight: 600,
                  lineHeight: 1.75,
                  color: slide.textColor,
                  fontFamily: "'Georgia', serif",
                  minHeight: 65,
                }}
              >
                <AnimatedWords text={currentText} triggerKey={`${currentSlide}-${currentTextIdx}`} />
              </p>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 }}>
                <div style={{ display: 'flex', gap: 4 }}>
                  {[1, 0.6, 0.3].map((o, i) => (
                    <span
                      key={i}
                      style={{
                        color: `rgba(251,113,133,${o})`,
                        fontSize: 12,
                        animation: 'pulse 2s ease infinite',
                        animationDelay: `${i * 0.25}s`,
                      }}
                    >
                      ♥
                    </span>
                  ))}
                </div>

                {totalTextsInSlide > 1 && (
                  <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', fontStyle: 'italic' }}>
                    {currentTextIdx < totalTextsInSlide - 1
                      ? '👉 Tap screen for next text'
                      : currentSlide === SLIDES.length - 1
                        ? '👉 Tap screen to proceed ✨'
                        : '👉 Tap screen for next photo 📸'}
                  </span>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      {/* ── Bottom Navigation Bar ── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 16px',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          background: 'rgba(0,0,0,0.35)',
          backdropFilter: 'blur(16px)',
          flexShrink: 0,
          zIndex: 20,
        }}
      >
        <button
          onClick={handlePrevPhoto}
          disabled={currentSlide === 0}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            fontSize: 12,
            color: currentSlide === 0 ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.55)',
            background: 'transparent',
            border: 'none',
            cursor: currentSlide === 0 ? 'not-allowed' : 'pointer',
            padding: '6px 12px',
            borderRadius: 8,
          }}
        >
          <ChevronLeft size={14} /> Prev Photo
        </button>

        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.28)', fontStyle: 'italic' }}>
          {slide.isTrio
            ? trioVisibleCount < 3
              ? `Tap screen for Photo ${trioVisibleCount + 1}`
              : 'Tap screen or button to proceed ✨'
            : totalTextsInSlide > 1
              ? 'Tap screen for text • Button for photo'
              : 'Click Next for next photo'}
        </span>

        <button
          onClick={handleNextPhoto}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '8px 20px',
            borderRadius: 999,
            fontSize: 12,
            fontWeight: 600,
            color: '#fff',
            cursor: 'pointer',
            border: 'none',
            background:
              currentSlide === SLIDES.length - 1
                ? 'linear-gradient(to right, #ec4899, #9333ea)'
                : 'rgba(255,255,255,0.12)',
            boxShadow:
              currentSlide === SLIDES.length - 1 ? '0 4px 20px rgba(236,72,153,0.4)' : 'none',
            transition: 'all 0.2s',
          }}
        >
          {currentSlide === SLIDES.length - 1 ? (
            'Shall we proceed? ✨'
          ) : (
            <>
              <span>Next Photo</span>
              <ChevronRight size={13} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
