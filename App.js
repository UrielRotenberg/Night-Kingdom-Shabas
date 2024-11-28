import React from 'react';
import OpeningScreen from './Components/OpeningScreen';
import MobileController from './Components/MobileController';

const App = () => {
  const [isMobileView, setIsMobileView] = React.useState(false);

  React.useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    setIsMobileView(isMobile);
  }, []);

  return (
    <div className="App">
      {isMobileView ? (
        <MobileController />
      ) : (
        <OpeningScreen />
      )}
    </div>
  );
};

export default App;