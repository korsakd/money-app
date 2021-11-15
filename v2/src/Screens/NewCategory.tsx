import { RouteProp, useNavigation, useRoute } from '@react-navigation/core';
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import IconItem from '../Components/IconItem';
import NewCategoryInput from '../Components/NewCategoryInput';
import { MainStackParamList } from '../Navigation';
import { RootState } from '../store';
import {
  addCategoryThunk,
  editCategoryThunk,
} from '../store/Thunks/categoryThunk';
import { getCurrentTheme } from '../Theme';

const NewCategory = () => {
  const {
    category: { categoriesIcon },
  } = useSelector((state: RootState) => state);
  const scheme = useColorScheme();
  const { colors } = getCurrentTheme(scheme);
  const {
    params: { from, item },
  } = useRoute<RouteProp<MainStackParamList, 'NewCategory'>>();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [chosenIcon, setChoseIcon] = useState(
    item?.iconName || categoriesIcon.Food[0],
  );
  const [categoryName, setCategoryName] = useState(item?.name || '');

  const { bottom } = useSafeAreaInsets();

  const onDonePress = () => {
    if (item?.id) {
      dispatch(editCategoryThunk(item.id, from, categoryName, chosenIcon));
    } else {
      dispatch(addCategoryThunk(from, categoryName, chosenIcon));
      setCategoryName('');
    }
    // navigation.pop();
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.plankWrap}>
        <View style={[styles.plank, { backgroundColor: colors.text }]} />
      </View>
      <NewCategoryInput
        categoryName={categoryName}
        chosenIcon={chosenIcon}
        setCategoryName={setCategoryName}
        onDonePress={onDonePress}
      />
      <ScrollView contentContainerStyle={{ paddingBottom: bottom }}>
        {Object.entries(categoriesIcon).map(([key, value]) => {
          return (
            <View key={key}>
              <View style={styles.textContainer}>
                <Text style={[styles.textWrap, { color: colors.text }]}>
                  {key}
                </Text>
              </View>
              <View style={styles.iconWrap}>
                {value.map((element, index) => {
                  return (
                    <Pressable
                      style={styles.button}
                      key={index}
                      onPress={() => setChoseIcon(element)}>
                      <IconItem name={element} check={chosenIcon === element} />
                    </Pressable>
                  );
                })}
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default NewCategory;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  plankWrap: {
    width: '100%',
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plank: {
    width: '10%',
    height: 5,
    borderRadius: 3,
  },
  textWrap: {
    fontSize: 15,
    fontWeight: '600',
  },
  textContainer: {
    marginVertical: 10,
    marginLeft: 20,
  },
  iconWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    marginHorizontal: '1%',
    marginVertical: '2%',
    width: '18%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
