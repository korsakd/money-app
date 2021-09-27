import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getCurrentTheme } from '../Theme';

type AddCategoryType = {
  from: string;
};

const AddCategory = ({ from }: AddCategoryType) => {
  const scheme = useColorScheme();
  const { colors } = getCurrentTheme(scheme);
  return (
    <TouchableOpacity
      onPress={() => {
        // navigation.navigate('NewCategory', { from });
      }}>
      <View
        style={{
          backgroundColor: colors.background,
          flexDirection: 'row',
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Icon name="plus" size={24} />
        <Text>Add new category</Text>
      </View>
    </TouchableOpacity>
  );
};

export default AddCategory;
