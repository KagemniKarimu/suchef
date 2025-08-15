"use client";

import * as motion from "motion/react-client";
import { useEffect, useRef } from "react";
import { Howl } from "howler";

interface ComingSoonModalProps {
  isOpen: boolean;
  onClose: () => void;
  featureName?: string;
  customMessage?: string;
}

export default function ComingSoonModal({
  isOpen,
  onClose,
  featureName = "This feature",
  customMessage,
}: ComingSoonModalProps) {
  const sizzleSound = useRef<Howl | null>(null);

  useEffect(() => {
    sizzleSound.current = new Howl({
      src: ["/media/sizzle_noisy.mp3"],
      volume: 0.15,
      loop: true,
      preload: true,
    });

    return () => {
      sizzleSound.current?.unload();
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      sizzleSound.current?.play();
    } else {
      sizzleSound.current?.stop();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10 pointer-events-none" />

        <div className="relative z-10">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute -top-2 -right-2 text-gray-400 hover:text-gray-200 p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="text-center">
            {/* Animated Skillet with Steam */}
            <div className="relative inline-block mb-6">
              <div className="text-6xl animate-wiggle">🍳</div>

              {/* Steam/Heat Lines Animation */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="steam-line steam-1" />
                <div className="steam-line steam-2" />
                <div className="steam-line steam-3" />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-100 mb-3">
              Still Cooking! 👨‍🍳
            </h2>

            <p className="text-gray-300 mb-2">
              {featureName} is simmering in our kitchen
            </p>

            <p
              className={`${customMessage ? "text-base" : "text-sm"} text-gray-400 mb-6`}
            >
              {customMessage ||
                "Our chefs are working hard to perfect this recipe. Check back soon for a taste of what's cooking!"}
            </p>

            <div className="flex items-center justify-center gap-2 text-orange-400 text-sm">
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                🔥
              </motion.span>
              <span>Estimated cook time: Coming Soon</span>
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
              >
                🔥
              </motion.span>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClose}
            className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            Got it, I&apos;ll wait!
          </motion.button>
        </div>
      </motion.div>

      <style jsx>{`
        @keyframes wiggle {
          0%,
          100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(-5deg);
          }
          75% {
            transform: rotate(5deg);
          }
        }

        @keyframes steam {
          0% {
            opacity: 0;
            transform: translateY(0) translateX(0) scaleY(0);
          }
          15% {
            opacity: 1;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateY(-40px) translateX(var(--drift)) scaleY(1.5);
          }
        }

        .animate-wiggle {
          animation: wiggle 2s ease-in-out infinite;
        }

        .steam-line {
          position: absolute;
          width: 2px;
          height: 20px;
          background: linear-gradient(
            to top,
            transparent 0%,
            rgba(255, 255, 255, 0.4) 20%,
            rgba(255, 255, 255, 0.6) 50%,
            transparent 100%
          );
          filter: blur(2px);
          animation: steam 2s ease-out infinite;
        }

        .steam-1 {
          left: 45%;
          animation-delay: 0s;
          --drift: -5px;
        }

        .steam-2 {
          left: 50%;
          animation-delay: 0.5s;
          --drift: 5px;
        }

        .steam-3 {
          left: 55%;
          animation-delay: 1s;
          --drift: 0px;
        }
      `}</style>
    </motion.div>
  );
}
