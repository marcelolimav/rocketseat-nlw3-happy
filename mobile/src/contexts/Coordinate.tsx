import React, { createContext, useState } from 'react';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';

export interface ICoordinate {
  latitude: number;
  longitude: number;
}

interface CoordinateContextData {
  coordinate: ICoordinate;
  getCoordinate(): Promise<void>
}

const CoordinateContext = createContext<CoordinateContextData>({} as CoordinateContextData);

export const CoordinateProvider: React.FC = ({children}) => {
  const [coordinate, setCoordinate] = useState<ICoordinate>({latitude: 0, longitude: 0});

  async function getCoordinate(): Promise<void> {

    const { granted } = await requestPermissionsAsync();

    if ( granted ) {

      const { coords } = await getCurrentPositionAsync({accuracy: 3});
      const { latitude, longitude} = coords;

      setCoordinate({latitude, longitude});
    }
  };

  return (
    <CoordinateContext.Provider value={{coordinate, getCoordinate}}>
      {children}
    </CoordinateContext.Provider>
  );
};

export default CoordinateContext;
