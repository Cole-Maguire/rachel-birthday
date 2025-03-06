import Link from "next/link";
import {
  JSX,
  useState,
  useRef,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";

type AudioMessageProps = { setTextStep: Dispatch<SetStateAction<number>> };
export function AudioMessage({ setTextStep }: AudioMessageProps): JSX.Element {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudioTime, setCurrentAudioTime] = useState("00:00");

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = Math.round(audioRef?.current?.currentTime ?? 0);
      setCurrentAudioTime(
        `${Math.round(currentTime / 60)}:${(currentTime % 60).toString().padStart(2, "0")}`,
      );
    }, 1000);
    return () => clearInterval(interval);
  });

  const play = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
      setTextStep((prev) => (prev == 9 ? prev + 1 : prev));
    } else {
      console.error("audioRef is null");
    }
  };

  return (
    <figure className="align-center flex flex-row justify-between gap-2">
      <audio
        src="/rachel-birthday/cabin_downpour_lq.mp3"
        ref={audioRef}
        controls={false}
        autoPlay={false}
      />
      <button onClick={play}>
        <span className="material-icons">
          {isPlaying ? "pause" : "play_arrow"}
        </span>
      </button>
      <div> {currentAudioTime ?? "00:00"}</div>
      <Link
        href="/cabin_downpour_lq.mp3"
        download
        target="_blank"
        className="material-icons"
      >
        download
      </Link>
    </figure>
  );
}
