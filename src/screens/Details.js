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
      <View style={styles.detailsWrap}>
        <View style={styles.detailsCategoryWrap}>
          <CategoryIcon iconName={route.params.element.categoryIconName} />
          <Text style={{fontSize: 17}}>
            {route.params.element.categoryName}
          </Text>
        </View>
        <View style={styles.wrap}>
          <Text style={styles.textWrap}>Категория:</Text>
          <Text style={{fontSize: 17}}>
            {route.params.element.categoryType === 'Costs'
              ? 'Расходы'
              : 'Доходы'}
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
                style={{fontSize: 17}}
                keyboardType={'numeric'}
                value={number}
                onChangeText={setNumber}
                autoFocus={true}
                onSubmitEditing={() =>
                  replace(
                    {
                      ...route.params.element,
                      inputValue: Number(number).toFixed(2),
                    },
                    route.params.index,
                  )
                }
              />
            ) : (
              <Text style={{fontSize: 17}}>{Number(number).toFixed(2)}</Text>
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.wrap}>
          <Text style={styles.textWrap}>Дата:</Text>
          <TouchableOpacity onPress={() => setToggleModal(true)}>
            <Text style={{fontSize: 17}}>{dateDisplay()}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  detailsWrap: {
    marginTop: 15,
    paddingBottom: 15,
    alignSelf: 'center',
    width: 400,
    borderRadius: 7,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  detailsCategoryWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    marginLeft: 19,
  },
  textWrap: {
    marginRight: 10,
    fontSize: 17,
    width: 90,
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

export default connect(
  null,
  mapDispatchToProps,
)(Details);
