import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import translate from '../translate/Translate';

const AddCategory = ({from}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('NewCategory', {from});
      }}>
      <View style={styles.iconStyle}>
        <Icon name="plus" size={24} />
        <Text>{translate('addNewCategory')}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconStyle: {
    backgroundColor: 'white',
    flexDirection: 'row',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AddCategory;
