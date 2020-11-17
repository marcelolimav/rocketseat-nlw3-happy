import React, {useContext, useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import OrphanageMap from './pages/OrphanagesMap';
import OrphanageDetails from './pages/OrphanageDetails';
import OnboardingSlides from './pages/OnboardingSlides';

import SelectMapPosition from './pages/CreateOrphanage/SelectMapPosition';
import OrphanageData1 from './pages/CreateOrphanage/OrphanageData1';
import OrphanageData2 from './pages/CreateOrphanage/OrphanageData2';

import {IAlreadyLaunched} from './utils/accessStorage';
import {OrphanageProvider} from './contexts/Orphanage';

import Header from './components/Header';
import CoordinateContext from './contexts/Coordinate';

const { Navigator, Screen } = createStackNavigator();
const CreateOrphanageStack = createStackNavigator();

interface Params {
  alreadyLaunched: IAlreadyLaunched;
}

const CreateOrphanageScreen: React.FC = () => (
  <OrphanageProvider>
    <CreateOrphanageStack.Navigator
      initialRouteName="MyOrders"
      screenOptions={{ headerShown: false }}
    >
      <CreateOrphanageStack.Screen
        name="SelectMapPosition"
        component={SelectMapPosition}
        options={{
          headerShown: true,
          header: () => (
            <Header/>
          )
        }}
      />

      <CreateOrphanageStack.Screen
        name="OrphanageData1"
        component={OrphanageData1}
        options={{
          headerShown: true,
          header: () => (
            <Header/>
          )
        }}
      />

      <CreateOrphanageStack.Screen
        name="OrphanageData2"
        component={OrphanageData2}
        options={{
          headerShown: true,
          header: () => (
            <Header/>
          )
        }}
      />
    </CreateOrphanageStack.Navigator>
  </OrphanageProvider>
);

export default function Routes({alreadyLaunched}: Params) {
  const { getCoordinate} = useContext(CoordinateContext);

  useEffect(() => {
    async function Coordinate() {
      await getCoordinate();
    }

    Coordinate();
  },[])

  return (
    <NavigationContainer>
      <Navigator
        // headerMode="none"
        initialRouteName={!alreadyLaunched.ready ? "OnboardingSlides" : "OrphanageMap" }
        screenOptions={{
          cardStyle:{
            backgroundColor: '#f2f3f5'
          }
        }}
      >
        {!alreadyLaunched.ready && (
          <Screen
            name="OnboardingSlides"
            component={OnboardingSlides}
            options={{
              headerShown: false,
            }}
          />
        )}

        <Screen
          name="OrphanageMap"
          options={{
            headerShown: false,
          }}
        >
          {props => <OrphanageMap {...props}/>}
        </Screen>

        <Screen
          name="OrphanageDetails"
          component={OrphanageDetails}
          options={{
            header: () => (
              <Header
                showCancel={false}
                title="Orfanato"
              />
            )
          }}
        />
        <Screen
          name="CreateOrphanage"
          options={{
            headerShown: false
          }}
          component={CreateOrphanageScreen}
        />

      </Navigator>
    </NavigationContainer>
  );
}
