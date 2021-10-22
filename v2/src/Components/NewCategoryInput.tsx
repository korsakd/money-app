import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import { getCurrentTheme } from '../Theme';
import IconItem from './IconItem';

type NewCategoryInputType = {
  text: string;
  chosenIcon: string;
  setText: (value: string) => void;
};

const NewCategoryInput = ({
  text,
  chosenIcon,
  setText,
}: NewCategoryInputType) => {
  const scheme = useColorScheme();
  const { colors } = getCurrentTheme(scheme);
  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.title, { color: colors.text }]}>
        {'Enter category name'}
      </Text>
      <Text style={[styles.subTitle, { color: colors.text }]}>
        {'* 20 characters max'}
      </Text>
      <View style={styles.inputWrap}>
        <IconItem name={chosenIcon} />
        <TextInput
          style={[styles.input, { color: colors.text }]}
          placeholder={'Category name'}
          placeholderTextColor={colors.text}
          onChangeText={setText}
          value={text}
          maxLength={20}
        />
      </View>
    </View>
  );
};

export default NewCategoryInput;

const styles = StyleSheet.create({
  inputContainer: { paddingHorizontal: 15, marginBottom: 10 },
  title: {
    fontSize: 15,
    marginTop: 10,
    marginLeft: 15,
  },
  subTitle: {
    fontSize: 10,
    marginBottom: 10,
    marginLeft: 15,
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: 'tomato',
    marginTop: 0,
    paddingBottom: 0,
    paddingTop: 0,
    marginLeft: 10,
  },
});
