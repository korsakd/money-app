import { NavigationProp, useNavigation } from '@react-navigation/core';
import React from 'react';
import { Text, Pressable, StyleSheet, View, Platform } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import { useDispatch } from 'react-redux';
import IconItem from '../Components/IconItem';
import { MainStackParamList } from '../Navigation';
import { CategoryType } from '../store/category';
import { deleteCategoryThunk } from '../store/Thunks/categoryThunk';
import { getCurrentTheme } from '../Theme';
import { confirmAlert } from '../utils/confirmAlert';
import InsetShadow from 'react-native-inset-shadow';

type RenderItemType = {
  categoryItem: CategoryType;
  type: string;
};

const RenderItem = ({ categoryItem, type }: RenderItemType) => {
  const scheme = useColorScheme();
  const { colors } = getCurrentTheme(scheme);
  const { navigate } = useNavigation<NavigationProp<MainStackParamList>>();
  const dispatch = useDispatch();

  const onDeletePress = () => {
    confirmAlert(
      'Are you sure?',
      `Category ${categoryItem.name} will be deleted`,
      () => {
        dispatch(deleteCategoryThunk(categoryItem, type));
      },
    );
  };

  return (
    <View style={{ paddingHorizontal: 15 }}>
      <Pressable
        onPress={() => {
          // navigate('NewCategory', { from: type, item: categoryItem });
          onDeletePress();
        }}
        style={[
          {
            backgroundColor: colors.background,
          },
          styles.itemWrap,
        ]}>
        <IconItem name={categoryItem.iconName} />
        <Text style={[styles.text, { color: colors.text }]}>
          {categoryItem.name}
        </Text>
      </Pressable>
      <InsetShadow
        containerStyle={{
          flex: 1,
          borderRadius: 2,
        }}
        top={false}
        right={false}
        left={false}
        shadowColor="#cecece"
        elevation={10}
        shadowOpacity={0.5}
        shadowRadius={0.8}
        shadowOffset={10}>
        <View
          style={{
            width: '100%',
            height: 4,
            borderRadius: 2,
            backgroundColor: '#1e1e1e',
          }}
        />
      </InsetShadow>
    </View>
  );
};

export default RenderItem;

const styles = StyleSheet.create({
  itemWrap: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 10,
  },
  text: {
    fontWeight: '700',
    marginLeft: 10,
  },
});
