import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import { getCurrentTheme } from '../Theme';
import IconItem from './IconItem';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RED } from '../Constants';

type NewCategoryInputType = {
  categoryName: string;
  chosenIcon: string;
  setCategoryName: (value: string) => void;
  onDonePress: () => void;
};

const NewCategoryInput = ({
  categoryName,
  chosenIcon,
  setCategoryName,
  onDonePress,
}: NewCategoryInputType) => {
  const scheme = useColorScheme();
  const { colors } = getCurrentTheme(scheme);
  const [error, setError] = useState('');

  const onChangeText = (text: string) => {
    if (error) {
      setError('');
    }
    setCategoryName(text);
  };

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
          placeholderTextColor={error ? RED : colors.text}
          onChangeText={onChangeText}
          value={categoryName}
          maxLength={20}
        />
        <Pressable
          onPress={() => {
            if (categoryName) {
              onDonePress();
            } else {
              setError('Enter category name');
            }
          }}
          style={styles.doneBtn}>
          <Icon name={'check'} size={25} color={colors.text} />
        </Pressable>
      </View>
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
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
  doneBtn: {
    marginLeft: 10,
  },
  errorContainer: {
    alignItems: 'center',
    height: 15,
    justifyContent: 'center',
  },
  errorText: { color: RED },
});
