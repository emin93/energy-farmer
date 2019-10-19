import { css, StyleSheet } from 'aphrodite/no-important';
import React, { useEffect, useState } from 'react';
import EnergyContainer from '../Components/EnergyContainer';
import { useEnergy } from '../Effects/Energy';
import { useEnergyGenerator } from '../Effects/EnergyGenerator';
import { useLevel } from '../Effects/Level';
import { Canvas } from 'react-three-fiber';
import { PCFSoftShadowMap } from 'three';
import Plane from '../Components/Plane';

const Game: React.FC = () => {
  const { energy, setEnergy } = useEnergy();
  const level = useLevel(energy);
  const [residents, setResidents] = useState(1);
  const [wattsPerResident] = useState(5);
  useEnergyGenerator(energy, setEnergy, residents * wattsPerResident);

  useEffect(() => {
    setResidents(level);
  }, [level]);

  return (
    <div className={css(styles.container)}>
      <header className={css(styles.header)}>
        <h1 className={css(styles.headerTitle)}>Overtone Reactor</h1>
        <div className={css(styles.headerStats)}>
          <div>Residents: {residents}</div>
          <div>Watts per Resident: {wattsPerResident}</div>
        </div>
      </header>
      <main className={css(styles.main)}>
        <Canvas
          camera={{ position: [0, 0, 10] }}
          onCreated={({ gl }) => {
            gl.shadowMap.enabled = true;
            gl.shadowMap.type = PCFSoftShadowMap;
          }}
        >
          >
          <ambientLight intensity={0.5} />
          <spotLight intensity={0.6} position={[30, 30, 50]} angle={0.2} penumbra={1} castShadow />
          <Plane />
          <EnergyContainer energy={energy} />
        </Canvas>
      </main>
    </div>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: 20,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 100,
    zIndex: 1,
  },
  headerTitle: {
    flex: 1,
  },
  headerStats: {},
  main: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
  },
});

export default Game;
