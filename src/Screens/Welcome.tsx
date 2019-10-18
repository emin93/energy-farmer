import { css, StyleSheet } from 'aphrodite/no-important';
import React from 'react';

const Welcome: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  return (
    <div className={css(styles.container)}>
      <h1>Overtone Reactor</h1>
      <p>Welcome to the Overtone Reactor. Use your voice as a reactor to provide energy to your residents.</p>
      <button onClick={onStart}>Start</button>
    </div>
  );
};

const styles = StyleSheet.create({
  container: {
    textAlign: 'center',
    padding: 20,
  },
});

export default Welcome;
