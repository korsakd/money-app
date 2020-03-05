import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Graphs = () => {
  return (
    <View style={styles.textWrap}>
      <Text>Here will be graphs!</Text>
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

export default Graphs;
