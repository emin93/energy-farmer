import { useEffect, useCallback } from 'react';

export const useGameTick = (callback: () => void, deps: readonly any[]) => {
  const memorizedCallback = useCallback(callback, deps);

  useEffect(() => {
    let timeout: number;

    const doGameTick = () => {
      window.clearTimeout(timeout);
      memorizedCallback();
      timeout = window.setTimeout(doGameTick, 1000);
    };

    doGameTick();

    return () => {
      clearTimeout(timeout);
    };
  }, [memorizedCallback]);
};
