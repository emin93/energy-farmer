// @ts-ignore
import Pizzicato from 'pizzicato';

const sound = new Pizzicato.Sound({
  source: 'input',
});

sound.addEffect(
  new Pizzicato.Effects.Distortion({
    gain: 1,
  })
);

sound.addEffect(
  new Pizzicato.Effects.Delay({
    feedback: 0.6,
    time: 0.4,
    mix: 0.5,
  })
);

export default {
  play: () => sound.play(),
  stop: () => sound.stop(),
};
