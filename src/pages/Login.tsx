import React, { useEffect } from 'react';

import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming,
  Easing,
  interpolate,
  Extrapolate,
  sequence,
} from 'react-native-reanimated';

import HeroImg from '../assets/hero.png';

// useSharedValue -> Armazenar o valor de uma animação
// useAnimatedStyle -> Criar um estilo apartir de um valor de uma animação

// Para animar tags do react native utiliza o Animated
// Animated.Text -> animar textos
// Animated.View -> animar containers
// Animated.ScrollView -> animar uma flatlist
// ...

// withTiming -> Muda o valor de uma propriedade ao longo de uma duração
// Easing -> Muda o estilo da transição

// interpolate -> ?
// Extrapolate -> Cria uma limitação na animação, só pode ir de tanto até tanto

import { View, StyleSheet, StatusBar } from 'react-native';

const Login: React.FC = () => {
  const titlePosition = useSharedValue(30);
  const imagePosition = useSharedValue(-30);

  useEffect(() => {
    imagePosition.value = withTiming(0, { 
      duration: 500,
    }, () => {
      titlePosition.value = sequence(
        withTiming(0, { 
          duration: 1000,
          easing: Easing.bounce,
        }),
        withTiming(-320, { 
          duration: 500,
          easing: Easing.linear,
        }),
      )
    });
  }, []);

  const titleStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: titlePosition.value }],
      opacity: interpolate(
        titlePosition.value,
        [30, 0, -320],
        [0, 1, 1],
        Extrapolate.CLAMP,
      ),
    }
  });

  const heroStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: imagePosition.value }],
    }
  })

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#13131A" />
      
      <Animated.Image style={[styles.hero, heroStyle]} source={HeroImg} />

      <Animated.Text style={[styles.title, titleStyle]}>
        Bem vindo ao App
      </Animated.Text>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#13131A',
    alignItems: 'center',
  },

  hero: {
    width: 288,
    height: 200,
    marginBottom: 40,
  },

  title: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 32,
  },
})

export default Login;