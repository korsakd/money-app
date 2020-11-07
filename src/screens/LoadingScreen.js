import React from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import translate from '../translate/Translate';
import FocusAwareStatusBar from '../utils/StatusBarColor';

const LoadingScreen = ({fromSettings}) => {
  return (
    <View style={styles.container}>
      {fromSettings ? (
        <FocusAwareStatusBar backgroundColor="#fff" barStyle="dark-content" />
      ) : (
        <FocusAwareStatusBar
          backgroundColor="#1c2b59"
          barStyle="light-content"
        />
      )}
      <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 10}}>
        {translate('loading')}
      </Text>
      <ActivityIndicator
        size="large"
        color={fromSettings ? '#be935a' : '#1c2b59'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingScreen;
