// @ts-ignore
import Pizzicato from 'pizzicato';

const sound = new Pizzicato.Sound('./assets/sounds/level-up.wav');

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
