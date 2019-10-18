import { css, StyleSheet } from 'aphrodite/no-important';
import React from 'react';

const Welcome: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  return (
    <div className={css(styles.container)}>
      <button onClick={onStart}>Start</button>
    </div>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Welcome;
