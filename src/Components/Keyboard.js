import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {replaceBalanceDb} from '../services/balanceFunctions';
import {connect} from 'react-redux';
import {setBalanceDb} from '../services/balanceFunctions';
import Modal from 'react-native-modal';
import CalendarPicker from 'react-native-calendar-picker';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import UUIDGenerator from 'react-native-uuid-generator';
import translate from '../translate/Translate';
import i18n from 'i18n-js';

const CustomKeyboard = ({
  removeModal,
  type,
  categoryType,
  categoryIcon,
  category,
  index,
  setDetailNumber,
  setDetailDate,
  add,
  replace,
}) => {
  const deviceLocale = i18n.currentLocale();
  const [date, setDate] = useState(
    type !== 'Details' ? new Date() : new Date(category.date),
  );
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

  const handlePress = async i => {
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
        if (type === 'Details') {
          removeModal(false);
          setDetailNumber(number);
          setDetailDate(date);
          replace(
            {
              ...category,
              inputValue: Number(number).toFixed(2),
              date: `${new Date(date)}`,
            },
            index,
          );
        } else {
          const id = await UUIDGenerator.getRandomUUID();
          removeModal(false);
          add({
            categoryIconName: categoryIcon,
            categoryType: type,
            categoryName: categoryType,
            inputValue: Number(number).toFixed(2),
            date: date,
            id: id,
          });
        }
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
            previousTitle={<Icon name="chevron-left" size={30} />}
            nextTitle={<Icon name="chevron-right" size={30} />}
            months={
              deviceLocale !== 'en'
                ? [
                    'Январь',
                    'Февраль',
                    'Март',
                    'Апрель',
                    'Май',
                    'Июнь',
                    'Июль',
                    'Август',
                    'Сентябрь',
                    'Октябрь',
                    'Ноябрь',
                    'Декабрь',
                  ]
                : null
            }
            weekdays={
              deviceLocale !== 'en'
                ? ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
                : null
            }
            startFromMonday={deviceLocale !== 'en' ? true : false}
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
                  <Text style={{textAlign: 'center', fontSize: 17}}>
                    {translate('today')}
                  </Text>
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
    add: balance => dispatch(setBalanceDb(balance)),
    replace: (element, index) => {
      dispatch(replaceBalanceDb(element, index));
    },
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(CustomKeyboard);
