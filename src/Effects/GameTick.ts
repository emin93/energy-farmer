import { useEffect, useRef } from 'react';

const callbacks = new Map();

const doGameTick = () => {
  callbacks.forEach(callback => callback());
  window.setTimeout(doGameTick, 1000);
};

doGameTick();

export const useGameTick = (callback: () => void) => {
  const savedCallback = useRef<(...args: any[]) => void>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const timestamp = Date.now();
    const handler = (...args: any[]) => savedCallback.current && savedCallback.current(...args);

    callbacks.set(timestamp, handler);

    return () => {
      callbacks.delete(timestamp);
    };

    // eslint-disable-next-line
  }, []);
};
