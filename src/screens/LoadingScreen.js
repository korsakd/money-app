import React from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import translate from '../translate/Translate';

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 10}}>
        {translate('loading')}
      </Text>
      <ActivityIndicator size="large" color="#470736" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
});

export default LoadingScreen;
