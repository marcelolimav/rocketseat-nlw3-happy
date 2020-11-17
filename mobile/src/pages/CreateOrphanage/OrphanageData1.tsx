import React, { useState, useContext, useEffect } from 'react';
import { ScrollView,
         View,
         StyleSheet,
         Text,
         Image,
         TextInput,
         TouchableOpacity
       } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { TextInputMask } from 'react-native-masked-text';

import OrphanageContext from '../../contexts/Orphanage';

interface OrphanageDataRouteParams {
  position: {
    latitude: number;
    longitude: number;
  }
}

export default function OrphanageData1() {
  const {orphanage , setName, setAbout, setCelPhone } = useContext(OrphanageContext);

  const [images, setImages] = useState<string[]>([]);
  const [btnNext, setBtnNext] = useState(false);

  const navigation = useNavigation();
  const route = useRoute();

  async function handleCreateOrphanage() {
    navigation.navigate('OrphanageData2');
  }

  async function handleSelectImages(){
    const { status } = await ImagePicker.requestCameraRollPermissionsAsync();

    if ( status !== 'granted') {
      alert('  :-(  precisamos de acesso às suas fotos...');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (result.cancelled){
      return;
    }

    const { uri: image } = result;

    setImages([...images, image]);
  }

  useEffect(() => {
    console.log(orphanage);
  },[])

  useEffect(() => {
    if(orphanage?.name && orphanage?.about && orphanage?.celPhone?.length==15){
      setBtnNext(true);
    } else {
      setBtnNext(false);
    }

  },[orphanage?.name, orphanage?.about, orphanage?.celPhone])

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 24 }}>
      <Text style={styles.title}>Dados</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput
        placeholder="Orfanato Esperança"
        style={styles.input}
        value={orphanage?.name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Sobre</Text>
      <TextInput
        placeholder="Presta assistência a crianças de 06 a 15 anos que se encontre em situação de risco e/ou vulnerabilidade social."
        style={[styles.input, { height: 110 }]}
        multiline
        value={orphanage?.about}
        onChangeText={setAbout}
      />

      <Text style={styles.label}>Whatsapp</Text>
      <TextInputMask
        placeholder="(44) 99999-9999"
        keyboardType="numeric"
        style={styles.input}
        type={'cel-phone'}
        options={{
          maskType: 'BRL',
          withDDD: true,
          dddMask: '(99) '
        }}
        value={orphanage?.celPhone}
        onChangeText={text => {
          setCelPhone(text);
        }}
      />

      <Text style={styles.label}>Fotos</Text>

      <View style={styles.uploadedImagesContainer}>
        {images.map(image => {
          return (
            <Image
              key={image}
              source={{ uri: image}}
              style={styles.uploadedImage}
            />
          )
        })}
      </View>

      <TouchableOpacity
        style={styles.imagesInput}
        onPress={handleSelectImages}
      >
        <Feather
          name="plus"
          size={24}
          color="#15B6D6"
        />
      </TouchableOpacity>

      <RectButton
        enabled={btnNext}
        style={btnNext? styles.nextButton : styles.nextButtonDisable}
        onPress={handleCreateOrphanage}
      >
        <Text style={styles.nextButtonText}>Próximo</Text>
      </RectButton>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    color: '#5c8599',
    fontSize: 24,
    fontFamily: 'Nunito_700Bold',
    marginBottom: 32,
    paddingBottom: 24,
    borderBottomWidth: 0.8,
    borderBottomColor: '#D3E2E6'
  },

  label: {
    color: '#8fa7b3',
    fontFamily: 'Nunito_600SemiBold',
    marginBottom: 8,
  },

  comment: {
    fontSize: 11,
    color: '#8fa7b3',
  },

  input: {
    backgroundColor: '#fff',
    borderWidth: 1.4,
    borderColor: '#d3e2e6',
    borderRadius: 20,
    height: 56,
    paddingVertical: 18,
    paddingHorizontal: 24,
    marginBottom: 16,
    textAlignVertical: 'top',
  },

  uploadedImagesContainer: {
    flexDirection: "row"
  },

  uploadedImage: {
    width: 64,
    height: 64,
    borderRadius: 20,
    marginBottom: 32,
    marginRight: 8,
  },

  imagesInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderStyle: 'dashed',
    borderColor: '#96D2F0',
    borderWidth: 1.4,
    borderRadius: 20,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },

  nextButton: {
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 32,
  },

  nextButtonDisable:{
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 32,
    opacity: 0.3,
  },

  nextButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: '#FFF',
  }
})
