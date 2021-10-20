import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CategoryStackParamList } from '../Navigation';
import { getCurrentTheme } from '../Theme';
import { NavigationProp, useNavigation } from '@react-navigation/core';

type AddCategoryType = {
  from: string;
};

const AddCategory = ({ from }: AddCategoryType) => {
  const scheme = useColorScheme();
  const { colors } = getCurrentTheme(scheme);
  const { navigate } = useNavigation<NavigationProp<CategoryStackParamList>>();
  return (
    <TouchableOpacity
      style={{
        borderTopColor: colors.text,
        borderWidth: StyleSheet.hairlineWidth,
      }}
      onPress={() => {
        navigate('NewCategory', { from });
      }}>
      <View
        style={{
          backgroundColor: colors.background,
          flexDirection: 'row',
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Icon name="plus" size={24} color={colors.text} />
        <Text style={{ color: colors.text, marginLeft: 5 }}>
          Add new category
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default AddCategory;
