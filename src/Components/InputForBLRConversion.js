import React from 'react';
import {View, Text, TextInput, Image} from 'react-native';
import {regexpNumber} from '../utils/RegExpFunction';

const InputForBLRConversion = ({
  value,
  iconSource,
  curAbbreviation,
  setValueBLR,
  setForeignValue,
  defaultForeignValue,
}) => {
  const onHandleValueChange = e => {
    if (e === '' || regexpNumber.test(e)) {
      setValueBLR(e);
      setForeignValue(`${(e * defaultForeignValue).toFixed(4)}`);
    }
  };
  return (
    <View
      style={{
        height: 40,
        marginTop: 30,
        backgroundColor: '#505049',
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <TextInput
        contextMenuHidden={true}
        selectTextOnFocus={false}
        keyboardType={'number-pad'}
        onChangeText={number => onHandleValueChange(number)}
        value={value}
        style={{
          flex: 1,
          color: '#fff',
          marginLeft: 5,
          fontSize: 20,
          fontWeight: 'bold',
          paddingVertical: 0,
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginRight: 20,
        }}>
        <Image
          style={{
            width: 40,
            height: 35,
            marginLeft: 20,
            marginRight: 10,
          }}
          source={iconSource}
        />
        <Text style={{color: '#fff', fontSize: 20, fontWeight: 'bold'}}>
          {curAbbreviation}
        </Text>
      </View>
    </View>
  );
};

export default InputForBLRConversion;
