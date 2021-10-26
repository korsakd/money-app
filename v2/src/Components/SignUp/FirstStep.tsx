import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  FlatList,
  TextInput,
  StyleSheet,
} from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import { getCurrentTheme } from '../../Theme';
import { Auth } from 'aws-amplify';

type FirstStepType = {
  email: string;
  width: number;
  flatListRef: React.MutableRefObject<FlatList<any> | null>;
  setEmail: (value: string) => void;
};

const FirstStep = ({ email, width, flatListRef, setEmail }: FirstStepType) => {
  const scheme = useColorScheme();
  const { colors } = getCurrentTheme(scheme);
  const [password, setPassword] = useState('');
  const [repPassword, setRepPassword] = useState('');

  const signUp = async () => {
    try {
      const { user } = await Auth.signUp(email, password);
      console.tron({ user });
    } catch (error) {
      console.tron({ 'error signing up:': error });
    }
  };

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width,
      }}>
      <View
        style={{
          width: '100%',
          marginBottom: 25,
          height: 150,
          justifyContent: 'space-between',
        }}>
        <TextInput
          style={[
            styles.textInput,
            { borderColor: colors.border, color: colors.text },
          ]}
          value={email}
          onChangeText={setEmail}
          placeholder={'E-mail'}
          blurOnSubmit
          keyboardType={'email-address'}
          autoCapitalize={'none'}
        />
        <TextInput
          style={[
            styles.textInput,
            { borderColor: colors.border, color: colors.text },
          ]}
          value={password}
          onChangeText={setPassword}
          placeholder={'Enter password'}
          blurOnSubmit
          secureTextEntry
          autoCapitalize={'none'}
        />
        <TextInput
          style={[
            styles.textInput,
            { borderColor: colors.border, color: colors.text },
          ]}
          value={repPassword}
          onChangeText={setRepPassword}
          placeholder={'Repeat password'}
          blurOnSubmit
          secureTextEntry
          autoCapitalize={'none'}
        />
      </View>

      <Pressable
        onPress={() => {
          if (flatListRef.current) {
            signUp();
            flatListRef.current.scrollToIndex({ index: 1, animated: true });
          }
        }}
        style={{
          backgroundColor: 'tomato',
          width: '100%',
          height: 40,
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{ color: '#fff', fontWeight: '700', fontSize: 17 }}>
          {'Next'}
        </Text>
      </Pressable>
    </View>
  );
};

export default FirstStep;

const styles = StyleSheet.create({
  textInput: {
    width: '100%',
    borderBottomWidth: 1,
    fontSize: 17,
    padding: 0,
  },
});
