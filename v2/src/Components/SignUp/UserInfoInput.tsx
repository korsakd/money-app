import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

type UserInfoInputType = {
  title: string;
  value: string;
  setValue: (value: string) => void;
};

const UserInfoInput = ({ title, value, setValue }: UserInfoInputType) => {
  return (
    <View>
      <View style={{ marginBottom: 5, flexDirection: 'row' }}>
        <Text style={{ color: 'tomato', marginRight: 5 }}>{'*'}</Text>
        <Text style={{ color: '#fff' }}>{title}</Text>
      </View>
      <View
        style={{
          height: 40,
          borderRadius: 10,
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: 'tomato',
          paddingLeft: 15,
        }}>
        <TextInput
          value={value}
          onChangeText={setValue}
          style={{ height: 40, color: '#fff' }}
        />
      </View>
    </View>
  );
};

export default UserInfoInput;
