"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import * as motion from "motion/react-client";
import { Howl } from "howler";

const TOTAL_MASCOT_VIDEOS = 4;

export default function InteractiveMascot() {
  const [currentVideo, setCurrentVideo] = useState<number | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const videoRefs = useRef<{ [key: number]: HTMLVideoElement }>({});
  const gigglesRef = useRef<{ [key: number]: Howl }>({});
  const audioTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Preload all videos and audio on mount
  useEffect(() => {
    for (let i = 1; i <= TOTAL_MASCOT_VIDEOS; i++) {
      // Preload videos
      const video = document.createElement("video");
      video.src = `/media/mascot_action_${i}.mp4`;
      video.preload = "auto";
      video.loop = true;
      video.muted = true;
      video.playsInline = true;
      videoRefs.current[i] = video;

      // Preload giggle sounds with Howler
      gigglesRef.current[i] = new Howl({
        src: [`/media/mascot_giggle${i}.mp3`],
        volume: 0.7,
        preload: true,
        onloaderror: (id, error) => {
          console.error(`Failed to load giggle ${i}:`, error);
        },
      });
    }

    // Cleanup - copy ref to avoid stale closure
    const sounds = gigglesRef.current;
    return () => {
      Object.values(sounds).forEach((sound) => sound.unload());
    };
  }, []);

  const handleClick = () => {
    // If already playing, stop and switch to new animation
    if (isHovering) {
      // Stop current sounds
      Object.values(gigglesRef.current).forEach((sound) => {
        if (sound.playing()) {
          sound.stop();
        }
      });
    }

    setIsHovering(true);
    const randomVideo = Math.floor(Math.random() * TOTAL_MASCOT_VIDEOS) + 1;
    setCurrentVideo(randomVideo);

    // Clear any existing timeout
    if (audioTimeoutRef.current) {
      clearTimeout(audioTimeoutRef.current);
    }

    // Play corresponding giggle sound with random pitch after a delay
    audioTimeoutRef.current = setTimeout(() => {
      if (gigglesRef.current[randomVideo]) {
        const sound = gigglesRef.current[randomVideo];
        sound.rate(0.9 + Math.random() * 0.2); // Random pitch each time
        sound.play();
      }
    }, 300); // 300ms delay for video to load and start

    // Auto-stop after video plays once (approximately 2-3 seconds)
    setTimeout(() => {
      setIsHovering(false);
      setCurrentVideo(null);

      // Stop all sounds
      Object.values(gigglesRef.current).forEach((sound) => {
        if (sound.playing()) {
          sound.stop();
        }
      });
    }, 3000); // Stop after 3 seconds
  };

  return (
    <motion.div
      className="relative w-64 h-64 md:w-80 md:h-80 cursor-pointer bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-full p-1 shadow-xl"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.6, type: "spring" }}
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="relative w-full h-full rounded-full overflow-hidden bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 p-[2px]">
        <div className="relative w-full h-full rounded-full overflow-hidden bg-white dark:bg-gray-900">
          <Image
            src="/media/mascot.png"
            alt="Suchef Mascot"
            fill
            className={`object-contain transition-opacity duration-200 ${isHovering && currentVideo ? "opacity-0" : "opacity-100"}`}
            priority
          />
          {isHovering && currentVideo && (
            <video
              key={currentVideo}
              className="absolute inset-0 w-full h-full object-contain"
              src={`/media/mascot_action_${currentVideo}.mp4`}
              autoPlay
              loop
              muted
              playsInline
            />
          )}
        </div>
      </div>

      {isHovering && (
        <motion.div
          className="absolute -bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <span className="text-sm text-gray-500 italic">*chef noises*</span>
        </motion.div>
      )}
    </motion.div>
  );
}
