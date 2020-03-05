import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Settings = () => {
  return (
    <View style={styles.textWrap}>
      <Text>Here will be Settings!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Settings;
