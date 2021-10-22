import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  TextInput,
} from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import IconItem from '../Components/IconItem';
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
    <View style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: 15, marginBottom: 10 }}>
        <Text
          style={{
            fontSize: 15,
            marginTop: 10,
            marginLeft: 15,
            color: colors.text,
          }}>
          {'Enter category name'}
        </Text>
        <Text
          style={{
            fontSize: 10,
            marginBottom: 10,
            marginLeft: 15,
            color: colors.text,
          }}>
          {'* 20 characters max'}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <IconItem name={chosenIcon} />
          <TextInput
            style={{
              flex: 1,
              borderBottomWidth: 1,
              borderBottomColor: 'tomato',
              marginTop: 0,
              paddingBottom: 0,
              paddingTop: 0,
              marginLeft: 10,
              color: colors.text,
            }}
            placeholder={'Category name'}
            placeholderTextColor={colors.text}
            onChangeText={setText}
            value={text}
            maxLength={20}
          />
        </View>
      </View>
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
                      style={{
                        marginHorizontal: '1%',
                        marginVertical: '2%',
                        width: '18%',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
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
});
