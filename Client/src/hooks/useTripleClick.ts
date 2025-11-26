import { useRef } from 'react';

export function useTripleClick(callback: () => void, timeout = 600) {
  const clickCount = useRef(0);
  const timer = useRef<number | null>(null);

  const handleClick = () => {
    clickCount.current += 1;

    if (timer.current) clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      if (clickCount.current >= 3) {
        callback();
      }
      clickCount.current = 0;
    }, timeout);
  };

  return handleClick;
}
