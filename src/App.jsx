import React, { useState } from 'react';
import SurprisePortal from './components/SurprisePortal';
import CuteQuizStage from './components/CuteQuizStage';
import WishesStage from './components/WishesStage';
import SpecialLetterStage from './components/SpecialLetterStage';
import KavithaiStage from './components/KavithaiStage';
import RotateTransitionStage from './components/RotateTransitionStage';
import SlideshowStage from './components/SlideshowStage';
import CelebrationArena from './components/CelebrationArena';
import FloatingParticles from './components/FloatingParticles';
import { sound } from './utils/audio';

// Stages that should render in landscape (wide) frame
const LANDSCAPE_STAGES = ['slideshow', 'celebration'];

export default function App() {
  const [currentStage, setCurrentStage] = useState('portal');
  // portal | quiz | wishes | letter | kavithai | rotate | slideshow | celebration
  const [isMuted, setIsMuted] = useState(false);
  const [isBgmPlaying, setIsBgmPlaying] = useState(false);

  const isLandscape = LANDSCAPE_STAGES.includes(currentStage);

  const toggleAudio = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
    if (muted) setIsBgmPlaying(false);
  };

  const toggleBgm = () => {
    if (isBgmPlaying) {
      sound.stopBgm();
      setIsBgmPlaying(false);
    } else {
      if (isMuted) setIsMuted(false);
      sound.startBgm();
      setIsBgmPlaying(true);
    }
  };

  // ── Navigation handlers ──────────────────────────────────────────────────
  const handleUnlockSurprise    = () => setCurrentStage('quiz');
  const handleCompleteQuiz      = () => setCurrentStage('wishes');
  const handleCompleteWishes    = () => setCurrentStage('letter');
  const handleCompleteLetter    = () => setCurrentStage('kavithai');
  const handleCompleteKavithai  = () => setCurrentStage('rotate');
  const handleProceedToSlideshow = () => setCurrentStage('slideshow');
  const handleCompleteSlideshow = () => setCurrentStage('celebration');

  const handleBackToPortal      = () => setCurrentStage('portal');
  const handleBackToQuiz        = () => setCurrentStage('quiz');
  const handleBackToWishes      = () => setCurrentStage('wishes');
  const handleBackToLetter      = () => setCurrentStage('letter');
  const handleBackToKavithai    = () => setCurrentStage('kavithai');
  const handleBackToSlideshow   = () => setCurrentStage('slideshow');

  // ── Frame classes based on orientation ──────────────────────────────────
  const portraitFrame  = 'sm:max-w-[420px] sm:min-h-[850px] sm:max-h-[92vh] sm:rounded-[44px]';
  const landscapeFrame = 'sm:max-w-[900px] sm:h-[500px]     sm:max-h-[500px] sm:rounded-[44px]';
  const frameClass = isLandscape ? landscapeFrame : portraitFrame;

  return (
    <div className="relative min-h-screen w-full bg-[#09040e] flex items-center justify-center p-0 sm:p-4 md:p-6 overflow-x-hidden">
      {/* Ambient Background Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-rose-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-amber-500/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed top-[40%] left-[30%] w-[350px] h-[350px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

      <FloatingParticles />

      {/* ── Responsive phone / landscape frame ── */}
      <div
        className={`relative w-full transition-all duration-700
          ${frameClass}
          min-h-screen sm:min-h-0
          bg-[#11081b]/95
          border-0 sm:border-[8px] sm:border-[#2b183a]/80
          shadow-[0_25px_70px_rgba(0,0,0,0.8)]
          sm:ring-1 sm:ring-pink-500/20
          flex flex-col justify-between
          overflow-y-auto overflow-x-hidden
          backdrop-blur-2xl z-10`}
      >
        {/* Top notch — portrait only */}
        {!isLandscape && (
          <div className="hidden sm:flex justify-center pt-3 pb-1 w-full z-20 pointer-events-none">
            <div className="w-24 h-4 bg-[#0a0410] rounded-full flex items-center justify-center gap-2 border border-white/5 shadow-inner">
              <div className="w-2.5 h-2.5 rounded-full bg-[#180a25] border border-white/10" />
              <div className="w-8 h-1 bg-[#200f33] rounded-full" />
            </div>
          </div>
        )}

        {/* Screen content */}
        <div className="flex-1 w-full flex flex-col relative z-10">

          {currentStage === 'portal' && (
            <SurprisePortal
              onUnlock={handleUnlockSurprise}
              isMuted={isMuted}
              toggleAudio={toggleAudio}
            />
          )}

          {currentStage === 'quiz' && (
            <CuteQuizStage
              onCompleteAllQuestions={handleCompleteQuiz}
              onBackToPortal={handleBackToPortal}
              isMuted={isMuted}
              toggleAudio={toggleAudio}
            />
          )}

          {currentStage === 'wishes' && (
            <WishesStage
              onCompleteWishes={handleCompleteWishes}
              onBackToQuiz={handleBackToQuiz}
              isMuted={isMuted}
              toggleAudio={toggleAudio}
            />
          )}

          {currentStage === 'letter' && (
            <SpecialLetterStage
              onCompleteLetter={handleCompleteLetter}
              onBackToWishes={handleBackToWishes}
              isMuted={isMuted}
              toggleAudio={toggleAudio}
            />
          )}

          {currentStage === 'kavithai' && (
            <KavithaiStage
              onCompleteKavithai={handleCompleteKavithai}
              onBackToLetter={handleBackToLetter}
              isMuted={isMuted}
              toggleAudio={toggleAudio}
            />
          )}

          {currentStage === 'rotate' && (
            <RotateTransitionStage
              onProceedToSlideshow={handleProceedToSlideshow}
            />
          )}

          {currentStage === 'slideshow' && (
            <SlideshowStage
              onCompleteSlideshow={handleCompleteSlideshow}
              isMuted={isMuted}
              toggleAudio={toggleAudio}
            />
          )}

          {currentStage === 'celebration' && (
            <CelebrationArena
              onBackToIntro={handleBackToPortal}
              onBackToLetter={handleBackToSlideshow}
              isMuted={isMuted}
              toggleAudio={toggleAudio}
              isBgmPlaying={isBgmPlaying}
              toggleBgm={toggleBgm}
            />
          )}
        </div>

        {/* Bottom pill — portrait only */}
        {!isLandscape && (
          <div className="hidden sm:flex justify-center pb-2 pt-1 w-full pointer-events-none">
            <div className="w-32 h-1 bg-white/20 rounded-full" />
          </div>
        )}
      </div>
    </div>
  );
}
