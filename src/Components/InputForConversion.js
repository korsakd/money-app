import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import Modal from 'react-native-modal';
import DefaultCurrencyPicker from '../Components/DefaultCurrencyPicker';
import {regexpNumber} from '../utils/RegExpFunction';

const InputForConversion = ({
  value,
  valueBLR,
  isReverse,
  iconSource,
  curAbbreviation,
  setIconSource,
  setCurAbbreviation,
  setValueBLR,
  setForeignValue,
  defaultValueBLR,
  setDefaultValueBLR,
  setDefaultForeignValue,
}) => {
  const [isModal, setIsModal] = useState(false);

  const onHandleValueChange = e => {
    if (e === '' || regexpNumber.test(e)) {
      setForeignValue(e);
      setValueBLR(`${(e * defaultValueBLR).toFixed(4)}`);
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
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginRight: 20,
        }}
        onPress={() => {
          setIsModal(true);
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
      </TouchableOpacity>
      <Modal
        animationIn={'slideInUp'}
        swipeDirection={'down'}
        swipeThreshold={100}
        onSwipeComplete={() => setIsModal(false)}
        isVisible={isModal}
        onBackdropPress={() => setIsModal(false)}
        backdropOpacity={0.3}>
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 20,
          }}>
          <DefaultCurrencyPicker
            value={value}
            valueBLR={valueBLR}
            isReverse={isReverse}
            removeModal={element => setIsModal(element)}
            setIconSource={element => setIconSource(element)}
            setCurAbbreviation={element => setCurAbbreviation(element)}
            setValueBLR={element => setValueBLR(element)}
            setDefaultValueBLR={element => setDefaultValueBLR(element)}
            setForeignValue={element => setForeignValue(element)}
            setDefaultForeignValue={element => setDefaultForeignValue(element)}
          />
        </View>
      </Modal>
    </View>
  );
};

export default InputForConversion;
