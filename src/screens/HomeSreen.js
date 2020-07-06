import React, {useState, useRef, useEffect} from 'react';
import {View, Text, TouchableOpacity, Animated} from 'react-native';
import {connect} from 'react-redux';
import Modal from 'react-native-modal';
import BalanceHeader from '../Components/BalanceHeader';
import BalanceList from '../Components/BalanceList';
import HomeCategoryList from '../Components/HomeCategoryList';
import {sortByDate} from '../utils/dateHelpers';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import LoginHome from '../Components/LoginHome';
import CustomMonthCalendar from '../Components/CustomMonthCalendar';
import SplashScreen from 'react-native-splash-screen';
import translate from '../translate/Translate';
import FocusAwareStatusBar from '../utils/StatusBarColor';

function HomeScreen({navigation, balance, incomeCategory, costsCategory}) {
  const monthArray = {
    1: 'january',
    2: 'february',
    3: 'march',
    4: 'april',
    5: 'may',
    6: 'june',
    7: 'july',
    8: 'august',
    9: 'september',
    10: 'october',
    11: 'november',
    13: 'december',
  };
  const hideAnimCalendar = useRef(new Animated.Value(-171)).current;
  const [isHideAnimCalendar, setIsHideAnimCalendar] = useState(true);
  const [toggleLoginModal, setToggleLoginModal] = useState(false);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [monthName, setMonthName] = useState(
    monthArray[new Date().getMonth() + 1],
  );
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const showMonthCalendar = hideAnim => {
    Animated.timing(hideAnim, {
      toValue: 0,
      duration: 1000,
    }).start();
  };

  const hideMonthCalendar = hideAnim => {
    Animated.timing(hideAnim, {
      toValue: -171,
      duration: 1000,
    }).start();
  };

  const filterBalanceYear = balance.filter(
    element => new Date(element.date).getFullYear() === year,
  );
  const filterBalanceMonth = filterBalanceYear.filter(
    element => new Date(element.date).getMonth() + 1 === month,
  );
  const dates = sortByDate(filterBalanceMonth);

  navigation.setOptions({
    headerRight: () => (
      <TouchableOpacity
        style={{
          paddingHorizontal: 20,
          paddingVertical: 15,
        }}
        onPress={() => {
          setToggleLoginModal(true);
        }}>
        <Icon name="account-outline" size={25} color="#fff" />
      </TouchableOpacity>
    ),
    headerLeft: () => {
      if (isHideAnimCalendar) {
        return (
          <TouchableOpacity
            style={{marginLeft: 20, flexDirection: 'row', alignItems: 'center'}}
            onPress={() => {
              setIsHideAnimCalendar(false);
              showMonthCalendar(hideAnimCalendar);
            }}>
            <Icon name="calendar-month-outline" size={25} color="#fff" />
            <Icon name="menu-down" size={25} color="#fff" />
            <Text style={{color: '#fff'}}>{translate(monthName)}</Text>
          </TouchableOpacity>
        );
      }
      if (!isHideAnimCalendar) {
        return (
          <TouchableOpacity
            style={{marginLeft: 20, flexDirection: 'row', alignItems: 'center'}}
            onPress={() => {
              setIsHideAnimCalendar(true);
              hideMonthCalendar(hideAnimCalendar);
            }}>
            <Icon name="calendar-month-outline" size={25} color="#fff" />
            <Icon name="menu-up" size={25} color="#fff" />
            <Text style={{color: '#fff'}}>{translate(monthName)}</Text>
          </TouchableOpacity>
        );
      }
    },
  });
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <FocusAwareStatusBar backgroundColor="#470736" barStyle="light-content" />
      <Modal
        isVisible={toggleLoginModal}
        onBackdropPress={() => setToggleLoginModal(false)}
        backdropOpacity={0.3}>
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 20,
          }}>
          <LoginHome />
        </View>
      </Modal>
      <Animated.View
        style={{
          position: 'absolute',
          zIndex: 10,
          top: hideAnimCalendar,
          backgroundColor: 'white',
        }}>
        <CustomMonthCalendar
          month={month}
          year={year}
          setMonthName={element => setMonthName(element)}
          setMonth={element => setMonth(element)}
          setYear={element => setYear(element)}
          hideCalendar={element => hideMonthCalendar(element)}
          hideAnimCalendar={hideAnimCalendar}
          setIsHideAnimCalendar={element => setIsHideAnimCalendar(element)}
        />
      </Animated.View>
      <BalanceHeader
        navigation={navigation}
        filterBalanceMonth={filterBalanceMonth}
        setToggleLoginModal={element => setToggleLoginModal(element)}
      />
      <BalanceList dates={dates} navigation={navigation} />
      <HomeCategoryList type={'Costs'} categoryList={costsCategory} />
      <HomeCategoryList type={'Income'} categoryList={incomeCategory} />
    </View>
  );
}

const mapStateToProps = state => {
  return {
    balance: state.balanceReducer.balance,
    incomeCategory: state.categoriesReducer.income,
    costsCategory: state.categoriesReducer.costs,
  };
};

export default connect(
  mapStateToProps,
  null,
)(HomeScreen);
