import React, { useState, useRef } from 'react';

export function VoicePlayer({ src }: { src: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const total = audioRef.current.duration;
      if (!isNaN(total)) {
        setProgress((current / total) * 100);
      }
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setProgress(0);
  };

  return (
    <div className="flex items-center gap-3 bg-black/10 p-2.5 rounded-2xl min-w-[220px]">

      <button
        onClick={togglePlay}
        className="w-10 h-10 flex items-center justify-center bg-[#fbc02d] text-[#1a2438] rounded-full shadow-sm hover:scale-105 transition-transform shrink-0"
      >
        {isPlaying ? (
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
        ) : (
          <svg className="w-5 h-5 fill-current ml-1" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
        )}
      </button>

   
      <div className="flex-1 h-1.5 bg-black/20 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#fbc02d] transition-all duration-75"
          style={{ width: `${progress}%` }}
        />
      </div>

      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        className="hidden"
      />
    </div>
  );
}
