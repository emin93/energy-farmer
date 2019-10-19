import React from 'react';

const Plane: React.FC = () => {
  return (
    <mesh receiveShadow>
      <planeBufferGeometry attach="geometry" args={[1000, 1000]} />
      <meshPhongMaterial attach="material" color="#272727" />
    </mesh>
  );
};

export default Plane;
