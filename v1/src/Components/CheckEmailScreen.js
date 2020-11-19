import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';

const CheckEmailScreen = ({navigation, route}) => {
  const [code, setCode] = useState('');
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{marginBottom: 10, textAlign: 'center'}}>{`На адрес ${
        route.params.email
      } мы выслали код`}</Text>
      <TouchableOpacity
        style={{marginBottom: 10}}
        onPress={() => navigation.goBack()}>
        <Text
          style={{
            color: '#18ABFF',
            textDecorationLine: 'underline',
            fontSize: 17,
          }}>
          Неверно ввели адрес?
        </Text>
      </TouchableOpacity>
      <Text style={{marginBottom: 10}}>Введите код:</Text>
      <TextInput
        style={{
          height: 40,
          width: '70%',
          borderColor: 'gray',
          borderWidth: 1,
          marginBottom: 20,
          paddingLeft: 10,
        }}
        onChangeText={number => setCode(number)}
        value={code}
        placeholder={'******'}
      />
      <TouchableOpacity
        style={{
          backgroundColor: '#1c2b59',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          width: '70%',
          height: 60,
          borderRadius: 7,
        }}>
        <Text
          style={{
            fontSize: 20,
            color: '#fff',
            marginRight: 5,
            textTransform: 'uppercase',
          }}>
          Далее
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CheckEmailScreen;
