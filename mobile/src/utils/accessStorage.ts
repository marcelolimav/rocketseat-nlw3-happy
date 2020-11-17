import AsyncStorage from '@react-native-community/async-storage';

export interface IAlreadyLaunched {
  ready: boolean;
}

export default {
  async get(storageName: string ): Promise<any> {
    let object = {ready: false} as IAlreadyLaunched;

    const value = await AsyncStorage.getItem(storageName);
    if ( value != null) {
      object.ready = false; //JSON.parse(value).ready;
    }

    return object;
  },

  async set(storageName: string, value: Object ): Promise<void> {
    await AsyncStorage.setItem(storageName, JSON.stringify(value));
  }
};
