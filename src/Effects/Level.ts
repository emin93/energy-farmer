import { useEffect, useState } from 'react';
import LevelUpSound from '../Sounds/LevelUp';

export const useLevel = (energy: number) => {
  const [level, setLevel] = useState(1);

  useEffect(() => {
    if (energy < 100) {
      return;
    }

    setLevel(level => level + 1);
    LevelUpSound.play();
  }, [energy]);

  return level;
};
