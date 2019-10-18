import { useEffect, useState } from 'react';
import EnergyGeneratorSound from '../Sounds/EnergyGenerator';
import { useGameTick } from './GameTick';

export const useEnergyGenerator = (
  energy: number,
  setEnergy: React.Dispatch<React.SetStateAction<number>>,
  consumption: number,
  max: number
) => {
  const [generatedEnergy, setGeneratedEnergy] = useState(10);

  useEffect(() => {
    EnergyGeneratorSound.play();

    navigator.getUserMedia(
      { audio: true },
      stream => {
        const audioContent = new AudioContext();
        const audioStream = audioContent.createMediaStreamSource(stream);
        const analyser = audioContent.createAnalyser();

        audioStream.connect(analyser);
        analyser.fftSize = 1024;

        const frequencyArray = new Uint8Array(analyser.frequencyBinCount);

        const check = () => {
          requestAnimationFrame(check);
          analyser.getByteFrequencyData(frequencyArray);

          const generatedEnergy = frequencyArray[0];
          setGeneratedEnergy(generatedEnergy);
        };

        check();
      },
      () => {}
    );

    return () => {
      EnergyGeneratorSound.stop();
    };
  }, []);

  useGameTick(() => {
    const newEnergy = energy + generatedEnergy - consumption;

    if (newEnergy >= max) {
      setEnergy(max);
      return;
    }

    if (newEnergy <= 0) {
      setEnergy(0);
      return;
    }

    setEnergy(newEnergy);
  });

  return generatedEnergy;
};
