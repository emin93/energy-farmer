// @ts-ignore
import Pizzicato from 'pizzicato';

Pizzicato.volume = 0.5;

const sound = new Pizzicato.Sound({
  source: 'wave',
  options: {
    frequency: 100,
    volume: 0.2,
  },
});

sound.addEffect(
  new Pizzicato.Effects.Distortion({
    gain: 0.2,
  })
);

sound.addEffect(
  new Pizzicato.Effects.Reverb({
    time: 1,
    decay: 0.8,
    reverse: true,
    mix: 0.5,
  })
);

export default {
  play: () => sound.play(),
  stop: () => sound.stop(),
  setFrequency: (frequency: number) => (sound.frequency = frequency),
};
