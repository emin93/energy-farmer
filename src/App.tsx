import { css, StyleSheet } from 'aphrodite/no-important';
import React, { useState } from 'react';
import { useGameTick } from './Utils/GameTick';

const App: React.FC = () => {
  const [residents, setResidents] = useState(10);
  const [wattsPerResident, setWattsPerResident] = useState(5);
  const [availableEnergy, setAvailableEnergy] = useState(50);

  useGameTick(() => {
    setAvailableEnergy(availableEnergy - 1);
  }, []);

  return (
    <div className={css(styles.container)}>
      <header className={css(styles.header)}>
        <h1 className={css(styles.headerTitle)}>Energy Farmer</h1>
        <div className={css(styles.headerStats)}>
          <div>Residents: {residents}</div>
          <div>Watts per Resident: {wattsPerResident}</div>
        </div>
      </header>
      <main className={css(styles.main)}>
        <div className={css(styles.energyContainer)}>
          <div className={css(styles.energyIndicator)} style={{ transform: `scale3d(1, ${availableEnergy}, 1)` }} />
        </div>
      </main>
    </div>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#292929',
    color: '#FFFFFF',
    padding: 20,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 100,
  },
  headerTitle: {
    flex: 1,
  },
  headerStats: {},
  main: {},
  energyContainer: {
    position: 'relative',
    width: 100,
    height: 500,
    border: '2px solid #FFFFFF',
    borderRadius: 5,
    backgroundImage: 'url(assets/images/glass.jpg)',
    backgroundSize: 'cover',
  },
  energyIndicator: {
    backgroundColor: '#03fc39',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 5,
    transform: 'scale3d(1, 1, 1)',
    transformOrigin: 'bottom',
    transition: 'transform 1s',
  },
});

export default App;
