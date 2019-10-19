import React, { useRef } from 'react';
import { useFrame } from 'react-three-fiber';
import { Mesh } from 'three';

const EnergyContainer: React.FC<{ energy: number }> = ({ energy }) => {
  const ref = useRef<Mesh>(null);

  useFrame(() => {
    if (!ref.current) {
      return;
    }

    ref.current.rotation.z += energy / 100;
    ref.current.rotation.y += energy / 100;
  });

  return (
    <mesh ref={ref} position={[0, 0, 2]} castShadow>
      <dodecahedronBufferGeometry attach="geometry" />
      <meshNormalMaterial attach="material" />
    </mesh>
  );
};

export default EnergyContainer;
