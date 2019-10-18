import { useEffect, useState } from 'react';
import EnergySound from '../Sounds/Energy';

export const useEnergy = () => {
  const [energy, setEnergy] = useState(50);

  useEffect(() => {
    EnergySound.play();

    return () => {
      EnergySound.stop();
    };
  }, []);

  useEffect(() => {
    EnergySound.setFrequency(energy + 100);
  }, [energy]);

  return { energy, setEnergy };
};
