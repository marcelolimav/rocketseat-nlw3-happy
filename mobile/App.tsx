import React, { useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
  useFonts
} from '@expo-google-fonts/nunito';

import Routes from './src/rotes';
import { CoordinateProvider } from './src/contexts/Coordinate';

import accessStorage, { IAlreadyLaunched } from './src/utils/accessStorage';

export default function App() {
  const [alreadyLaunched, setAlreadyLaunched] = useState<IAlreadyLaunched>({ ready: false });

  useEffect(() => {
    async function start(){
      setAlreadyLaunched(await accessStorage.get('HappyAlreadyLaunched'));
    }

    start();

  }, []);

  const [fontsLoaded] = useFonts({
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
  });

  if(!fontsLoaded) {
    return null;
  }

  return (
    <>
      <StatusBar style="auto" />
      <CoordinateProvider>
        <Routes
          alreadyLaunched={alreadyLaunched}
        />
      </CoordinateProvider>
    </>
  );
}
