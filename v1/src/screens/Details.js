import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import CustomKeyboard from '../Components/Keyboard';
import CategoryIcon from '../Components/CategoryComponent';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {replaceBalanceDb} from '../services/balanceFunctions';
import {removeBalanceDb} from '../services/balanceFunctions';
import Modal from 'react-native-modal';
import CalendarPicker from 'react-native-calendar-picker';
import translate from '../translate/Translate';
import {regexpMissing} from '../utils/RegExpFunction';
import i18n from 'i18n-js';

const Details = ({route, remove, replace}) => {
  const deviceLocale = i18n.currentLocale();
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
        style={{
          paddingHorizontal: 20,
          paddingVertical: 15,
        }}
        onPress={() => {
          Alert.alert(
            'Вы уверены?',
            'Запись будет удалена',
            [
              {
                text: 'Cancel',
                onPress: null,
                style: 'cancel',
              },
              {
                text: 'OK',
                onPress: () => {
                  remove(route.params.element.id);
                  navigation.goBack();
                },
              },
            ],
            {cancelable: false},
          );
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
          detailValue={number}
        />
      </Modal>
      <View style={styles.detailsWrap}>
        <View style={styles.detailsCategoryWrap}>
          <CategoryIcon iconName={route.params.element.categoryIconName} />
          <Text style={{fontSize: 17}}>
            {regexpMissing.test(translate(route.params.element.categoryName))
              ? route.params.element.categoryName
              : translate(route.params.element.categoryName)}
          </Text>
        </View>
        <View style={styles.wrap}>
          <Text style={styles.textWrap}>{`${translate('category')}:`}</Text>
          <Text style={{fontSize: 17}}>
            {route.params.element.categoryType === 'Costs'
              ? translate('Costs')
              : translate('Incomes')}
          </Text>
        </View>
        <View style={styles.wrap}>
          <Text style={styles.textWrap}>{`${translate('money')}:`}</Text>
          <TouchableOpacity onPress={() => setToggleKeyboardModal(true)}>
            <Text style={{fontSize: 17}}>{Number(number).toFixed(2)}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.wrap}>
          <Text style={styles.textWrap}>{`${translate('date')}:`}</Text>
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
    borderColor: '#000',
    shadowColor: '#000',
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
