import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import CustomKeyboard from '../Components/Keyboard';
import CategoryIcon from '../Components/CategoryComponent';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {replaceBalanceDb} from '../services/balanceFunctions';
import {removeBalanceDb} from '../services/balanceFunctions';
import Modal from 'react-native-modal';
import CalendarPicker from 'react-native-calendar-picker';

const Details = ({route, remove, replace}) => {
  const [date, setDate] = useState(new Date(route.params.element.date));
  const [toggleModal, setToggleModal] = useState(false);
  const [number, setNumber] = useState(route.params.element.inputValue);
  const [toggleKeyboardModal, setToggleKeyboardModal] = useState(false);
  const navigation = useNavigation();
  const dateDisplay = () => {
    const d = new Date(date);
    return `${d.getDate() < 10 ? `0${d.getDate()}` : d.getDate()}.${
      d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1
    }.${d.getFullYear()}`;
  };

  navigation.setOptions({
    headerRight: () => (
      <TouchableOpacity
        style={{marginRight: 15}}
        onPress={() => {
          remove(route.params.element.id);
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
            months={[
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
            ]}
            weekdays={['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']}
            startFromMonday={true}
            onDateChange={element => {
              setDate(element);
              replace(
                {
                  ...route.params.element,
                  date: `${new Date(element)}`,
                  inputValue: Number(number).toFixed(2),
                },
                route.params.index,
              );
              setToggleModal(false);
            }}
          />
        </View>
      </Modal>
      <Modal
        isVisible={toggleKeyboardModal}
        onBackdropPress={() => setToggleKeyboardModal(false)}
        backdropOpacity={0.3}
        style={{margin: 0, justifyContent: 'flex-end'}}>
        <CustomKeyboard
          setDetailNumber={element => setNumber(element)}
          setDetailDate={element => setDate(element)}
          type={'Details'}
          removeModal={element => setToggleKeyboardModal(element)}
          category={route.params.element}
          index={route.params.index}
        />
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
          <TouchableOpacity onPress={() => setToggleKeyboardModal(true)}>
            <Text style={{fontSize: 17}}>{Number(number).toFixed(2)}</Text>
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

    elevation: 1,
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
    remove: id => {
      dispatch(removeBalanceDb(id));
    },
    replace: (element, index) => {
      dispatch(replaceBalanceDb(element, index));
    },
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(Details);
