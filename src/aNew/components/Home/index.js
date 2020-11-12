import React, {useState, useRef, useEffect} from 'react';
import {View, Text, TouchableOpacity, Animated} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

const HomeScreen = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <View>
      <Text>123</Text>
    </View>
  );
};

export default HomeScreen;
