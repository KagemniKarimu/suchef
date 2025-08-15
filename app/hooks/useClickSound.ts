import { useEffect, useRef } from "react";
import { Howl } from "howler";

export function useClickSound(volume = 0.3) {
  const clickSound = useRef<Howl | null>(null);

  useEffect(() => {
    clickSound.current = new Howl({
      src: ["/media/click.mp3"],
      volume,
      preload: true,
    });

    return () => {
      clickSound.current?.unload();
    };
  }, [volume]);

  const playClick = () => {
    clickSound.current?.play();
  };

  return playClick;
}
