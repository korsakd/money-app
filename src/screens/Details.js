import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from 'react-native';

import CategoryIcon from '../Components/CategoryComponent';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {removeBalance, replaceBalance} from '../redux/reducers/balanceReducer';
import Modal from 'react-native-modal';
import CalendarPicker from 'react-native-calendar-picker';

const Details = ({route, remove, replace}) => {
  const [date, setDate] = useState(new Date(route.params.element.date));
  const [toggleModal, setToggleModal] = useState(false);
  const [number, setNumber] = useState(route.params.element.inputValue);
  const [isTextInputShow, setTextInputShow] = useState(false);
  const navigation = useNavigation();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const dateDisplay = () => {
    const d = new Date(date);
    return `${d.getDate() < 10 ? `0${d.getDate()}` : d.getDate()}.${
      d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1
    }.${d.getFullYear()}`;
  };
  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        if (number === '') {
          return setNumber(route.params.element.inputValue);
        }
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
    };
  });
  navigation.setOptions({
    headerRight: () => (
      <TouchableOpacity
        style={{marginRight: 15}}
        onPress={() => {
          remove(route.params.index);
          navigation.goBack();
        }}>
        <Icon name="delete-outline" size={25} color="#fff" />
      </TouchableOpacity>
    ),
  });
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Modal
        isVisible={toggleModal}
        onBackdropPress={() => setToggleModal(false)}
        backdropOpacity={0.5}
        style={{margin: 5}}>
        <View style={{backgroundColor: 'white', borderRadius: 20}}>
          <CalendarPicker
            onDateChange={element => {
              setDate(element);
              replace(
                {...route.params.element, date: element},
                route.params.index,
              );
              setToggleModal(false);
            }}
          />
        </View>
      </Modal>
      <View style={styles.wrap}>
        <CategoryIcon iconName={route.params.element.categoryIconName} />
        <Text>{route.params.element.categoryName}</Text>
      </View>
      <View style={styles.wrap}>
        <Text style={styles.textWrap}>Категория:</Text>
        <Text>
          {route.params.element.categoryType === 'Costs' ? 'Расходы' : 'Доходы'}
        </Text>
      </View>
      <View style={styles.wrap}>
        <Text style={styles.textWrap}>Деньги:</Text>
        <TouchableOpacity
          onPress={() => {
            setTextInputShow(true);
          }}>
          {isTextInputShow ? (
            <TextInput
              value={number}
              onChangeText={setNumber}
              autoFocus={true}
              onSubmitEditing={() =>
                replace(
                  {...route.params.element, inputValue: number},
                  route.params.index,
                )
              }
            />
          ) : (
            <Text>{route.params.element.inputValue}</Text>
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.wrap}>
        <Text style={styles.textWrap}>Дата:</Text>
        <TouchableOpacity onPress={() => setToggleModal(true)}>
          <Text>{dateDisplay()}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginLeft: 10,
  },
  textWrap: {
    marginRight: 10,
  },
  buttonWrap: {
    width: 150,
    alignItems: 'center',
    backgroundColor: '#e028fc',
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  textStyle: {
    textTransform: 'uppercase',
    color: '#fff',
  },
});

const mapDispatchToProps = dispatch => {
  return {
    remove: index => {
      dispatch(removeBalance(index));
    },
    replace: (element, index) => {
      dispatch(replaceBalance(element, index));
    },
  };
};

// eslint-disable-next-line prettier/prettier
export default connect(
  null,
  mapDispatchToProps,
)(Details);
