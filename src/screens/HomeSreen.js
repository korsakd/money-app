import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

function HomeScreen({navigation}) {
  return (
    <View style={styles.textWrap}>
      <Text>Home Screen</Text>
      <TouchableOpacity
        style={styles.buttonWrap}
        onPress={() => navigation.navigate('Categories')}>
        <Text style={styles.textStyle}>Go to categories</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonWrap}
        onPress={() => navigation.navigate('Graphs')}>
        <Text style={styles.textStyle}>Go to graphs</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonWrap}
        onPress={() => navigation.navigate('Settings')}>
        <Text style={styles.textStyle}>Go to settings</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonWrap}
        onPress={() => navigation.navigate('Details')}>
        <Text style={styles.textStyle}>Go to details</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  textWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrap: {
    width: 150,
    alignItems: 'center',
    backgroundColor: '#e028fc',
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  textStyle: {
    textTransform: 'uppercase',
    color: '#fff',
  },
});
export default HomeScreen;
