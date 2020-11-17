import React from 'react';

import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import { Feather } from '@expo/vector-icons';

import accessStorage, {IAlreadyLaunched} from '../utils/accessStorage';

interface SquareComponent {
  isLight: boolean;
  selected: boolean;
}

export default function OnboardingSlides({navigation}: any) {

  const Square = ({ isLight, selected, ...props }: SquareComponent) => {
    let backgroundColor;
    let width;

    if (selected) {
      width = 25;
      backgroundColor = "#FFD152";
    } else {
      width = 10;
      backgroundColor = "#BECFD8";
    }

    return (
      <View
        style={{
          width,
          height: 5,
          marginHorizontal: 3,
          backgroundColor,
        }}

        {...props}
      />
    );
  };

  const Next = ({ isLight, ...props }: any) => (
    <TouchableOpacity
      style={{
        width: 56,
        height: 56,
        borderRadius: 20,
        backgroundColor: "#D1EDF2",
        alignItems: "center",
        justifyContent: 'center',
        marginRight: 30
      }}

      {...props}
    >
      <Feather
        name="arrow-right"
        size={25}
        color="#15B6D6"
      />
    </TouchableOpacity>
  );

  const completeOnBoarding = async() => {
    const alreadyLaunched = {} as IAlreadyLaunched;

    alreadyLaunched.ready = true;
    await accessStorage.set('HappyAlreadyLaunched', alreadyLaunched);

    navigation.replace('OrphanageMap');

  }

  return (
    <Onboarding
      bottomBarHeight={120}
      bottomBarColor="#f2f3f5"
      showSkip={false}
      DotComponent={Square}
      NextButtonComponent={Next}
      DoneButtonComponent={Next}
      onDone={completeOnBoarding}

      imageContainerStyles={{
        paddingBottom: 5,
        marginTop: -40
      }}

      titleStyles={{
        fontFamily: 'Nunito_800ExtraBold',
        fontSize: 48,
        textAlign: 'left',
        color: '#0089A5',
        paddingLeft: 30,
        paddingRight: 50,
        lineHeight: 50,
      }}

      subTitleStyles={{
        fontFamily: 'Nunito_600SemiBold',
        fontSize: 20,
        textAlign: 'left',
        color: '#5C8599',
        paddingLeft: 30,
        paddingRight: 80,
        lineHeight: 30,
      }}

      pages={[
        {
          backgroundColor: '#f2f3f5',
          image: <Image source={require('../images/onboarding1.png')} />,
          title: 'Leve felicidade para o mundo',
          subtitle: 'Visite orfanatos e mude o dia de muitas crianças.',
        },
        {
          backgroundColor: '#f2f3f5',
          image: <Image source={require('../images/onboarding2.png')} />,
          title: 'Escolha um orfanato no mapa e faça uma visita',
          subtitle: '',
          titleStyles:{
            fontFamily: 'Nunito_800ExtraBold',
            fontSize: 30,
            textAlign: 'right',
            color: '#0089A5',
            paddingLeft: 60,
            paddingRight: 30,
            lineHeight: 40,
          },
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

});
