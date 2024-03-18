// App.js
import { Routes, Route } from 'react-router-dom';
import AboutComponent from './components/layout/About';
// import IntroductionPage from "./components/layout/IntroductionPage"
import HeaderComponent from './components/layout/Header';
import FooterComponent from './components/layout/Footer';
import ErrorComponent from './components/layout/ErrorPage';
import HomeComponent from './components/layout/Home';
import TrainGround from './components/train/trainGround';


import 'antd-button-color/dist/css/style.css';

import { useState } from 'react';
import { ConfigContext } from './components/globalStates/ConfigContext';
import { initialConfig } from './components/configs/trainConfig';
import { PlayGround } from './components/play/playGround';

const App = () => {
  const [config, setConfig] = useState(initialConfig)
  const [trainState, setTrainState] = useState(0)
  const [progress, setProgress] = useState({})

  return (
    <>
      <ConfigContext.Provider value={{
        config: config, setConfig: setConfig,
        trainState: trainState, setTrainState: setTrainState,
        progress: progress, setProgress: setProgress,
      }}>
        <HeaderComponent></HeaderComponent>
        <Routes>
          <Route path="/" element={<HomeComponent />} />
          <Route path="/about" element={<AboutComponent />} />
          <Route path='/train' element={<TrainGround />} />

          <Route path='/listen' element={<TrainGround />} />
          <Route path='/play' element={<PlayGround />} />
          <Route path='*' element={<ErrorComponent />} />
        </Routes>
        <FooterComponent></FooterComponent>
      </ConfigContext.Provider>
    </>
  );
};

export default App;