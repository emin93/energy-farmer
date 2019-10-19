import { useEffect, useState } from 'react';
import EnergyGeneratorSound from '../Sounds/EnergyGenerator';
import { useGameTick } from './GameTick';

const scale = (value: number, inputMin: number, inputMax: number, outputMin: number, outputMax: number) => {
  return ((value - inputMin) * (outputMax - outputMin)) / (inputMax - inputMin) + outputMin;
};

export const useEnergyGenerator = (
  energy: number,
  setEnergy: React.Dispatch<React.SetStateAction<number>>,
  consumption: number
) => {
  const [generatedEnergy, setGeneratedEnergy] = useState(0);

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
          setGeneratedEnergy(Math.floor(generatedEnergy / 2));
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
    let newDesiredEnergy = energy + scale(generatedEnergy, 0, 100, 1, 10) - consumption;

    if (newDesiredEnergy >= 100) {
      newDesiredEnergy = 100;
    }

    if (newDesiredEnergy <= 0) {
      newDesiredEnergy = 0;
    }

    if (newDesiredEnergy > energy) {
      setEnergy(energy + consumption);
    } else {
      setEnergy(energy - consumption);
    }
  });

  return generatedEnergy;
};
