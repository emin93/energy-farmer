import React, { useState } from 'react';
import Game from './Screens/Game';
import Welcome from './Screens/Welcome';

const App: React.FC = () => {
  const [hasStarted, setHasStarted] = useState(false);

  if (!hasStarted) {
    return <Welcome onStart={() => setHasStarted(true)} />;
  }

  return <Game />;
};

export default App;
