export function playAudio(url: string, volume: number = 1): HTMLAudioElement {
  const audio = new Audio(url);
  audio.volume = volume;
  return audio;
}

export function fadeOutAudio(audioElem: HTMLAudioElement, duration: number): void {
  const fadeOutInterval = 50;
  const steps = duration / fadeOutInterval;
  const volumeStep = audioElem.volume / steps;

  const fadeOut = setInterval(() => {
    if (audioElem.volume > 0) {
      audioElem.volume = Math.max(0, audioElem.volume - volumeStep);
    } else {
      clearInterval(fadeOut);
      audioElem.pause();
      audioElem.currentTime = 0;
    }
  }, fadeOutInterval);
}
