import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import {connect} from 'react-redux';
import {addBalance} from '../redux/reducers/balanceReducer';
import Modal from 'react-native-modal';
import CalendarPicker from 'react-native-calendar-picker';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

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
      if (number === '0') {
        removeModal(false);
      } else {
        removeModal(false);
        add({
          categoryIconName: categoryIcon,
          categoryType: type,
          categoryName: categoryType,
          inputValue: Number(number).toFixed(2),
          date: date,
        });
      }
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
      <View
        style={{
          height: 30,
          paddingLeft: 10,
          justifyContent: 'center',
        }}>
        <Text
          style={{
            fontSize: 17,
          }}>
          {number}
        </Text>
      </View>
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        {numberArray.map((i, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => handlePress(i)}
              style={i === 'ok' ? styles.applyButton : styles.buttonWrap}>
              {i === dateDisplay() ? (
                <View>
                  <Text style={{textAlign: 'center', fontSize: 17}}>Today</Text>
                  <Text>{i}</Text>
                </View>
              ) : i === 'ok' ? (
                <View>
                  <Icon name="check-circle-outline" size={30} color="#525252" />
                </View>
              ) : i === 'del' ? (
                <View>
                  <Icon name="backspace-outline" size={30} color="#525252" />
                </View>
              ) : (
                <Text style={{fontSize: 17}}>{i}</Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonWrap: {
    width: '25%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: StyleSheet.hairlineWidth,
  },
  applyButton: {
    backgroundColor: '#43cc1f',
    width: '25%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: StyleSheet.hairlineWidth,
  },
});

const mapDispatchToProps = dispatch => {
  return {
    add: balance => dispatch(addBalance(balance)),
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(CustomKeyboard);
