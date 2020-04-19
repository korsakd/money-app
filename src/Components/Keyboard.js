import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import {connect} from 'react-redux';
import {addBalance} from '../redux/reducers/balanceReducer';
import Modal from 'react-native-modal';
import CalendarPicker from 'react-native-calendar-picker';

const CustomKeyboard = ({
  removeModal,
  type,
  categoryType,
  categoryIcon,
  add,
}) => {
  const [date, setDate] = useState(new Date());
  const [toggleModal, setToggleModal] = useState(false);
  const [number, setNumber] = useState('0');
  const dateDisplay = () => {
    const d = new Date(date);
    return `${d.getDate() < 10 ? `0${d.getDate()}` : d.getDate()}.${
      d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1
    }.${d.getFullYear()}`;
  };
  const numberArray = [
    '1',
    '2',
    '3',
    dateDisplay(),
    '4',
    '5',
    '6',
    '+',
    '7',
    '8',
    '9',
    '-',
    '.',
    '0',
    'del',
    'ok',
  ];

  const handlePress = i => {
    if (number === '0' && i !== 'ok' && i !== 'del' && i !== dateDisplay()) {
      return setNumber(i);
    }
    if (i === 'del') {
      return setNumber(number.slice(0, -1));
    }
    if (i === 'ok') {
      removeModal(false);
      add({
        categoryIconName: categoryIcon,
        categoryType: type,
        categoryName: categoryType,
        inputValue: Number(number).toFixed(2),
        date: date,
      });
      return;
    }
    if (i === dateDisplay()) {
      setToggleModal(true);
      return;
    }
    setNumber(`${number}${i}`);
  };

  return (
    <View style={{backgroundColor: 'white'}}>
      <Modal
        isVisible={toggleModal}
        onBackdropPress={() => setToggleModal(false)}
        backdropOpacity={0.5}
        style={{margin: 5}}>
        <View style={{backgroundColor: 'white', borderRadius: 20}}>
          <CalendarPicker
            onDateChange={element => {
              setDate(element);
              setToggleModal(false);
            }}
          />
        </View>
      </Modal>
      <View>
        <Text>{number}</Text>
      </View>
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        {numberArray.map((i, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => handlePress(i)}
              style={{
                width: '25%',
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: StyleSheet.hairlineWidth,
              }}>
              {i === dateDisplay() ? (
                <View>
                  <Text style={{textAlign: 'center'}}>Today</Text>
                  <Text>{i}</Text>
                </View>
              ) : (
                <Text>{i}</Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    add: balance => dispatch(addBalance(balance)),
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(CustomKeyboard);
