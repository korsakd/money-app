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
};

const SecondStep = ({ email, width, flatListRef }: FirstStepType) => {
  const scheme = useColorScheme();
  const { colors } = getCurrentTheme(scheme);
  const [code, setCode] = useState('');

  const confirmSignUp = async () => {
    try {
      const c = await Auth.confirmSignUp('dkorsak@elinext.com', code);
      console.tron({ c });
    } catch (error) {
      console.tron({ 'error confirming sign up': error });
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
      <TextInput
        style={[
          styles.textInput,
          { borderColor: colors.border, color: colors.text },
        ]}
        value={code}
        onChangeText={setCode}
        placeholder={'Enter code'}
        blurOnSubmit
        keyboardType={'email-address'}
      />
      <Pressable
        onPress={() => {
          if (flatListRef.current) {
            confirmSignUp();
            flatListRef.current.scrollToIndex({ index: 2, animated: true });
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

export default SecondStep;

const styles = StyleSheet.create({
  textInput: {
    width: '100%',
    borderBottomWidth: 1,
    fontSize: 17,
    padding: 0,
    marginBottom: 25,
  },
});
