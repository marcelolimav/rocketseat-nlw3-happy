import React, { useEffect, useState, useContext} from 'react';
import { View, StyleSheet, Dimensions, Text, Image, TouchableOpacity } from 'react-native';

import { RectButton } from 'react-native-gesture-handler';
import MapView, { MapEvent, Marker } from 'react-native-maps';

import mapMarkerImg from '../../images/map-marker.png';
import cursorSelectHandImg from '../../images/cursorSelectHand.png';
import CoordinateContext from '../../contexts/Coordinate';
import OrphanageContext from '../../contexts/Orphanage';

export default function SelectMapPosition({navigation}: any) {
  const { coordinate } = useContext(CoordinateContext);
  const { orphanage, setLatLon } = useContext(OrphanageContext);

  const [ btnNext, setBtnNext] = useState(false);
  const [ introduction, setInstruction ] = useState(true);

  function handleNextStep() {
    navigation.navigate('OrphanageData1');
  }

  async function handleSelectMapPosition(event: MapEvent ){
    const {latitude, longitude} = event.nativeEvent.coordinate;
    setLatLon(latitude, longitude);
  }

  function handlePressInstruction() {
    setInstruction(false);
  }

  useEffect(() => {
    setTimeout(handlePressInstruction, 3000);
  },[])

  useEffect(() => {
    if(orphanage?.latitude && orphanage.longitude && orphanage?.latitude !== 0 && orphanage?.longitude !== 0 ){
      setBtnNext(true);
    } else {
      setBtnNext(false);
    }

    console.log(orphanage);
  },[orphanage?.latitude, orphanage?.longitude])

  return (
    <View style={styles.container}>
      <MapView
        initialRegion={{
          latitude: coordinate.latitude || -15.794185,
          longitude: coordinate.longitude || -47.882174,
          latitudeDelta: coordinate.latitude === 0? 100 : 0.08,
          longitudeDelta: coordinate.latitude === 0? 100 : 0.08,
        }}
        style={styles.mapStyle}
        onPress={handleSelectMapPosition}
      >
        {orphanage?.latitude !== 0 && (
          <Marker
            icon={mapMarkerImg}
            coordinate={{ latitude: Number(orphanage?.latitude || 0), longitude: Number(orphanage?.longitude || 0) }}
          />
        )}
      </MapView>

      <RectButton
        enabled={btnNext}
        style={btnNext? styles.nextButton : styles.nextButtonDisable}
        onPress={handleNextStep}
      >
        <Text style={styles.nextButtonText}>{btnNext? "Próximo" : "Indique um local"}</Text>
      </RectButton>

      { introduction? (
          <View
            style={styles.introduction}
          >
            <TouchableOpacity
              style={styles.introductionBox}
              onPress={handlePressInstruction}
            >
              <Image
                source={cursorSelectHandImg}
              />
              <Text style={styles.introductionText}>
                Toque no mapa para adicionar um orfanato
              </Text>
            </TouchableOpacity>
          </View>
        ) : null
      }

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  },

  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  nextButton: {
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,

    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 40,
  },

  nextButtonDisable: {
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    opacity: 0.3,

    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 40,
  },

  nextButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: '#FFF',
  },

  introduction: {
    position: "absolute",
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: '#15c3d6',
    opacity: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 80,
    paddingRight: 80,
  },

  introductionBox: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  introductionText: {
    color: '#fff',
    fontSize: 24,
    fontFamily: 'Nunito_800ExtraBold',
    textAlign: 'center',
    opacity: 110,
  }

})
