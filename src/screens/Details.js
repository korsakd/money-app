import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Details = () => {
  return (
    <View style={styles.textWrap}>
      <Text>Here will be details!</Text>
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

export default Details;
