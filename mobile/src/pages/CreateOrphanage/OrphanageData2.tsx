import React, { useState, useEffect, useContext} from 'react';
import { ScrollView,
         View,
         StyleSheet,
         Switch,
         Text,
         TextInput,
       } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import api from '../../services/api';

import OrphanageContext from '../../contexts/Orphanage';

interface OrphanageDataRouteParams {
  position: {
    latitude: number;
    longitude: number;
  }
}

export default function OrphanageData2() {
  const {orphanage , setInstructions, setOpeningHours, setOpenOnWeekends } = useContext(OrphanageContext);
  const [btnNext, setBtnNext] = useState(false);

  const navigation = useNavigation();
  const route = useRoute();

  async function handleCreateOrphanage() {
    const data = new FormData();

    await api.post('orphanages',data);

    navigation.navigate('OrphanageMap');
  }

  useEffect(() => {
    if(orphanage?.instructions && orphanage.opening_hours){
      setBtnNext(true);
    } else {
      setBtnNext(false);
    }

  },[orphanage?.instructions, orphanage?.opening_hours])

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 24 }}>

      <Text style={styles.title}>Visitação</Text>

      <Text style={styles.label}>Instruções</Text>
      <TextInput
        placeholder="Venha como se sentir a vontade e traga muito amor e paciência para dar."
        style={[styles.input, { height: 110 }]}
        multiline
        value={orphanage?.instructions}
        onChangeText={setInstructions}
      />

      <Text style={styles.label}>Horario de visitas</Text>
      <TextInput
        placeholder="Segunda à Sexta 8h às 18h"
        style={styles.input}
        value={orphanage?.opening_hours}
        onChangeText={setOpeningHours}
      />

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Atende final de semana?</Text>
        <Switch
          thumbColor="#fff"
          trackColor={{ false: '#ccc', true: '#39CC83' }}
          value={orphanage?.open_on_weekends}
          onValueChange={setOpenOnWeekends}
        />
      </View>

      <RectButton
        enabled={btnNext}
        style={btnNext? styles.nextButton : styles.nextButtonDisable}
        onPress={handleCreateOrphanage}
      >
        <Text style={styles.nextButtonText}>Cadastrar</Text>
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

  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },

  nextButton: {
    backgroundColor: '#3CDC8C',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 32,
  },

  nextButtonDisable: {
    backgroundColor: '#3CDC8C',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 32,
    opacity: 0.3
  },

  nextButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: '#FFF',
  }
})
