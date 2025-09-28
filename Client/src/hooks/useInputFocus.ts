import { useEffect, useRef } from 'react';

export function useInputFocus() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (!inputRef.current) return;
    inputRef.current.focus();
  }, []);
  return inputRef;
}
