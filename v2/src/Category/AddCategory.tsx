import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { MainStackParamList } from '../Navigation';
import { getCurrentTheme } from '../Theme';
import { NavigationProp, useNavigation } from '@react-navigation/core';

type AddCategoryType = {
  from: string;
};

const AddCategory = ({ from }: AddCategoryType) => {
  const scheme = useColorScheme();
  const { colors } = getCurrentTheme(scheme);
  const { navigate } = useNavigation<NavigationProp<MainStackParamList>>();
  return (
    <Pressable
      style={{
        width: 50,
        height: 50,
        borderRadius: 25,
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: 'tomato',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onPress={() => {
        navigate('NewCategory', { from });
      }}>
      <Icon name="plus" size={24} color={colors.text} />
    </Pressable>
  );
};

export default AddCategory;

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
