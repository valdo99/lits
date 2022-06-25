import { useRef, useEffect } from "react";

const playIcon = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#1ed760">
<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
</svg>
`;
const pauseIcon = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#1ed760">
<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
</svg>
`;

export default function AudioPlayer({ src, className }) {
  const playerButton = useRef();
  const audio = useRef();
  const timeline = useRef();

  function toggleAudio() {
    if (audio.current.paused) {
      audio.current.play();
      playerButton.current.innerHTML = pauseIcon;
    } else {
      audio.current.pause();
      playerButton.current.innerHTML = playIcon;
    }
  }

  function changeTimelinePosition() {
    try {
      const percentagePosition =
        (100 * audio.current.currentTime) / audio.current.duration;
      timeline.current.style.backgroundSize = `${percentagePosition}% 100%`;
      timeline.current.value = percentagePosition;
    } catch (error) {}
  }

  function audioEnded() {
    playerButton.current.innerHTML = playIcon;
  }

  // function changeSeek() {
  //   const time = (timeline.current.value * audio.current.duration) / 100;
  //   audio.current.currentTime = time;
  // }

  useEffect(() => {
    if (playerButton.current && audio.current && timeline.current) {
      playerButton.current.addEventListener("click", toggleAudio);
      audio.current.ontimeupdate = changeTimelinePosition;
      audio.current.onended = audioEnded;
    }

    () => {
      playerButton = useRef();
      audio = useRef();
      timeline = useRef();
    };

    // timeline.current.addEventListener("change", changeSeek);
  }, []);

  return (
    <div class={`audio-player ${className}`}>
      <audio ref={audio} src={src}></audio>
      <div class="controls">
        <button ref={playerButton} class="player-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="#1ed760"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
        <input
          ref={timeline}
          type="range"
          class="timeline"
          max="100"
          value="0"
        />
      </div>
    </div>
  );
}
