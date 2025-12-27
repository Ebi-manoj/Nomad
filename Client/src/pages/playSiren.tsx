import { useRef } from 'react';

function SirenButton() {
  const playSiren = () => {
    // Trigger vibration pattern (works on mobile)
    if ('vibrate' in navigator) {
      // Siren-like vibration pattern: [vibrate, pause, vibrate, pause...]
      navigator.vibrate([200, 100, 200, 100, 200, 100, 200]);
    }

    // Generate siren sound using Web Audio API
    const audioContext = new window.AudioContext();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    // Connect oscillator to gain node to destination
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Configure oscillator
    oscillator.type = 'sawtooth'; // or 'sawtooth' for harsher siren

    // Create alternating frequencies for siren effect
    const now = audioContext.currentTime;
    oscillator.frequency.setValueAtTime(400, now); // Start at 400Hz
    oscillator.frequency.linearRampToValueAtTime(800, now + 0.5); // Up to 800Hz
    oscillator.frequency.linearRampToValueAtTime(400, now + 1.0); // Back to 400Hz
    oscillator.frequency.linearRampToValueAtTime(800, now + 1.5);
    oscillator.frequency.linearRampToValueAtTime(400, now + 2.0);

    // Set volume envelope to avoid clicking
    gainNode.gain.setValueAtTime(0.3, now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 2.5);

    // Start and stop
    oscillator.start(now);
    oscillator.stop(now + 2.5);
  };

  const sirenRef = useRef<number | null>(null);

  const handleClick = () => {
    sirenRef.current = setInterval(() => {
      playSiren();
    }, 3000);
  };
  const handleStop = () => {
    if (sirenRef.current) {
      clearInterval(sirenRef.current);
    }
  };

  return (
    <>
      <button onClick={handleStop}>Stop</button>
      <button onClick={handleClick}>Play</button>
    </>
  );
}

export default SirenButton;
