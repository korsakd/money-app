import React, { forwardRef, ForwardedRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardTypeOptions,
  ReturnKeyTypeOptions,
  ViewStyle,
} from 'react-native';

type UserInfoInputType = {
  title: string;
  value: string;
  setValue: (value: string) => void;
  containerStyle?: ViewStyle;
  isRequiredField?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  secureTextEntry?: boolean;
  returnKeyType?: ReturnKeyTypeOptions;
  onSubmitEditing?: () => void;
};

const UserInput = forwardRef(
  (
    {
      title,
      value,
      setValue,
      containerStyle = {},
      isRequiredField = false,
      keyboardType,
      autoCapitalize,
      secureTextEntry = false,
      returnKeyType,
      onSubmitEditing,
    }: UserInfoInputType,
    ref: ForwardedRef<TextInput>,
  ) => {
    return (
      <View style={[containerStyle, styles.mainContainer]}>
        <View style={styles.titleWrap}>
          {isRequiredField && <Text style={styles.requiredText}>{'*'}</Text>}
          <Text style={styles.titleText}>{title}</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            ref={ref}
            value={value}
            onChangeText={setValue}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
            secureTextEntry={secureTextEntry}
            onSubmitEditing={onSubmitEditing}
            returnKeyType={returnKeyType}
            textContentType={'oneTimeCode'}
            style={styles.input}
          />
        </View>
      </View>
    );
  },
);

export default UserInput;

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
  },
  titleWrap: { marginBottom: 5, flexDirection: 'row' },
  requiredText: { color: 'tomato', marginRight: 5 },
  titleText: { color: '#fff' },
  inputContainer: {
    height: 40,
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'tomato',
    paddingLeft: 15,
  },
  input: { height: 40, color: '#fff' },
});
