import { useRef, useCallback, useEffect } from 'react';
export const useSiren = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const lfoRef = useRef<OscillatorNode | null>(null);
  const isPlayingRef = useRef(false);

  const playSiren = useCallback(() => {
    // Stop any existing siren first
    if (isPlayingRef.current) {
      stopSiren();
    }

    try {
      const AudioContextClass =
        window.AudioContext || (window as any).webkitAudioContext;

      // Always create a fresh AudioContext for each playback
      const audioContext = new AudioContextClass();
      audioContextRef.current = audioContext;

      // Handle suspended state (autoplay policy)
      if (audioContext.state === 'suspended') {
        audioContext
          .resume()
          .then(() => {
            console.log('AudioContext resumed successfully');
          })
          .catch(err => {
            console.warn('Could not resume audio:', err);
          });
      }

      // Create fresh oscillators
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = 800;
      oscillator.type = 'sine';
      gainNode.gain.value = 0.3;

      // LFO for siren effect
      const lfo = audioContext.createOscillator();
      const lfoGain = audioContext.createGain();
      lfo.frequency.value = 2; // 2Hz modulation
      lfoGain.gain.value = 200; // ±200Hz deviation
      lfo.connect(lfoGain);
      lfoGain.connect(oscillator.frequency);

      // Start oscillators
      oscillator.start();
      lfo.start();

      oscillatorRef.current = oscillator;
      lfoRef.current = lfo;
      isPlayingRef.current = true;

      // Trigger vibration if available
      if ('vibrate' in navigator) {
        navigator.vibrate([200, 100, 200, 100, 200, 100, 200]);
      }
    } catch (error) {
      console.error('Failed to play siren:', error);
      isPlayingRef.current = false;
    }
  }, []);

  const stopSiren = useCallback(() => {
    try {
      if (oscillatorRef.current && isPlayingRef.current) {
        oscillatorRef.current.stop();
        oscillatorRef.current.disconnect();
        oscillatorRef.current = null;
      }

      if (lfoRef.current && isPlayingRef.current) {
        lfoRef.current.stop();
        lfoRef.current.disconnect();
        lfoRef.current = null;
      }

      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }

      // Stop vibration
      if ('vibrate' in navigator) {
        navigator.vibrate(0);
      }
    } catch (error) {
      console.error('Error stopping siren:', error);
    }

    isPlayingRef.current = false;
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopSiren();
    };
  }, [stopSiren]);

  return { playSiren, stopSiren };
};
