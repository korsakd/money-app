import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {regexpEmail} from '../utils/RegExpFunction';

const EmailScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  console.tron(email);
  const sendEmail = () => {
    fetch(
      `https://us-central1-moneyapp-d88f3.cloudfunctions.net/sendEmail?userEmail=${email}`,
    )
      .then(resp => resp.json())
      .then(data => console.tron(data))
      // .then(() => navigation.navigate('CheckEmailScreen', {email: email}))
      .catch(err => console.tron(err));
  };
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{marginBottom: 10}}>Введите ваш E-mail адрес:</Text>
      {error ? (
        <Text style={{marginBottom: 10, color: 'red'}}>{error}</Text>
      ) : null}
      <TextInput
        style={{
          height: 40,
          width: '70%',
          borderColor: 'gray',
          borderWidth: 1,
          marginBottom: 20,
          paddingLeft: 10,
        }}
        onChangeText={text => setEmail(text)}
        value={email}
        placeholder={'Email адрес'}
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
        }}
        onPress={() => {
          if (email === '') {
            return setError('Введите E-mail адрес');
          }
          if (!regexpEmail.test(email)) {
            return setError('Некорректно введен E-mail адрес');
          } else {
            return sendEmail();
          }
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

export default EmailScreen;
