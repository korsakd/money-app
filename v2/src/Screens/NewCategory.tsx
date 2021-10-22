import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import IconItem from '../Components/IconItem';
import NewCategoryInput from '../Components/NewCategoryInput';
import { RootState } from '../store';
import { getCurrentTheme } from '../Theme';

const NewCategory = () => {
  const {
    category: { categoriesIcon },
  } = useSelector((state: RootState) => state);
  const scheme = useColorScheme();
  const { colors } = getCurrentTheme(scheme);
  const [chosenIcon, setChoseIcon] = useState(categoriesIcon.Food[0]);
  const [text, setText] = useState('');
  const { bottom } = useSafeAreaInsets();

  return (
    <View style={styles.mainContainer}>
      <NewCategoryInput text={text} chosenIcon={chosenIcon} setText={setText} />
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
