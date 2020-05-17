import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {connect} from 'react-redux';
import Modal from 'react-native-modal';
import CustomKeyboard from '../Components/Keyboard';
import CategoryIcon from '../Components/CategoryComponent';
import {dateDisplay, sortByDate} from '../utils/dateHelpers';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import LoginHome from '../Components/LoginHome';

function HomeScreen({navigation, balance, incomeCategory, costsCategory}) {
  const [toggleKeyboardModal, setToggleKeyboardModal] = useState(false);
  const [toggleLoginModal, setToggleLoginModal] = useState(false);
  const [type, setType] = useState(null);
  const [categoryType, setCategoryType] = useState('');
  const [categoryIcon, setCategoryIcon] = useState('');
  const incomeArray = balance.filter(
    element => element.categoryType === 'Income',
  );
  const costsArray = balance.filter(
    element => element.categoryType === 'Costs',
  );
  const summValues = (a, c) => Number(a) + Number(c.inputValue);
  const incomeValue = incomeArray.reduce(summValues, 0);
  const costsValue = costsArray.reduce(summValues, 0);

  const dates = sortByDate(balance);
  navigation.setOptions({
    headerRight: () => (
      <TouchableOpacity
        style={{marginRight: 15}}
        onPress={() => {
          setToggleLoginModal(true);
        }}>
        <Icon name="account-outline" size={25} color="#fff" />
      </TouchableOpacity>
    ),
  });
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Modal
        isVisible={toggleLoginModal}
        onBackdropPress={() => setToggleLoginModal(false)}
        backdropOpacity={0.3}>
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 20,
            paddingVertical: 15,
          }}>
          <LoginHome />
        </View>
      </Modal>
      <View style={styles.balanceWrap}>
        <View />
        <View>
          <Text style={styles.balanceType}>Доход</Text>
          <Text style={styles.balanceValue}>{incomeValue.toFixed(2)}</Text>
        </View>
        <View
          style={{
            borderWidth: StyleSheet.hairlineWidth,
            height: 30,
            alignSelf: 'center',
            borderColor: 'grey',
          }}
        />
        <View>
          <Text style={styles.balanceType}>Расходы</Text>
          <Text style={styles.balanceValue}>{costsValue.toFixed(2)}</Text>
        </View>
        <View
          style={{
            borderWidth: StyleSheet.hairlineWidth,
            height: 30,
            alignSelf: 'center',
            borderColor: 'grey',
          }}
        />
        <View>
          <Text style={styles.balanceType}>Баланс</Text>
          <Text style={styles.balanceValue}>
            {(Number(incomeValue) - Number(costsValue)).toFixed(2)}
          </Text>
        </View>
        <View />
      </View>
      <ScrollView>
        {dates.map(([key, value]) => {
          const incomeValueArray = value.filter(
            element => element.categoryType === 'Income',
          );
          const costsValueArray = value.filter(
            element => element.categoryType === 'Costs',
          );
          const incomeValues = incomeValueArray.reduce(summValues, 0);
          const costsValues = costsValueArray.reduce(summValues, 0);
          return (
            <View key={key} style={styles.balanceItemWrap}>
              <View style={styles.balanceItemHeader}>
                <Text>{dateDisplay(new Date(value[0].date))}</Text>
                <Text>
                  {Object.keys(incomeValueArray).length === 0
                    ? null
                    : `Доход: ${Number(incomeValues).toFixed(2)}`}
                </Text>
                <Text>
                  {Object.keys(costsValueArray).length === 0
                    ? null
                    : `Расход: - ${Number(costsValues).toFixed(2)}`}
                </Text>
              </View>
              {value.map((element, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() =>
                      navigation.navigate('Details', {
                        element,
                        index,
                      })
                    }>
                    <View style={styles.balanceItem}>
                      <CategoryIcon iconName={element.categoryIconName} />
                      <Text style={{fontSize: 17}}>{element.categoryName}</Text>
                      <View
                        style={{
                          flex: 1,
                          alignItems: 'flex-end',
                        }}>
                        <Text style={{fontSize: 17}}>
                          {element.categoryType === 'Costs'
                            ? `-${element.inputValue}`
                            : element.inputValue}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          );
        })}
      </ScrollView>
      <View>
        <Modal
          isVisible={toggleKeyboardModal}
          onBackdropPress={() => setToggleKeyboardModal(false)}
          backdropOpacity={0.3}
          style={{margin: 0, justifyContent: 'flex-end'}}>
          <CustomKeyboard
            type={type}
            removeModal={element => setToggleKeyboardModal(element)}
            categoryType={categoryType}
            categoryIcon={categoryIcon}
          />
        </Modal>
        <View>
          <View style={styles.textContainer}>
            <Text style={styles.textWrap}>Расходы</Text>
          </View>
          <ScrollView horizontal contentContainerStyle={{flexGrow: 1}}>
            {costsCategory.map((element, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setType('Costs');
                    setToggleKeyboardModal(true);
                    setCategoryType(element.name);
                    setCategoryIcon(element.iconName);
                  }}>
                  <CategoryIcon
                    iconName={element.iconName}
                    name={element.name}
                  />
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
        <View>
          <View style={styles.textContainer}>
            <Text style={styles.textWrap}>Доходы</Text>
          </View>
          <ScrollView horizontal contentContainerStyle={styles.componentWrap}>
            {incomeCategory.map((element, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setType('Income');
                    setToggleKeyboardModal(true);
                    setCategoryType(element.name);
                    setCategoryIcon(element.iconName);
                  }}>
                  <CategoryIcon
                    iconName={element.iconName}
                    name={element.name}
                  />
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  balanceWrap: {
    marginTop: 15,
    marginBottom: 15,
    alignSelf: 'center',
    width: 400,
    height: 70,
    borderRadius: 7,
    flexDirection: 'row',
    justifyContent: 'space-around',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  balanceType: {
    marginTop: 10,
    fontSize: 15,
    alignSelf: 'center',
  },
  balanceValue: {
    alignSelf: 'center',
    marginTop: 5,
    fontSize: 17,
    fontWeight: 'bold',
  },
  balanceItemWrap: {
    marginBottom: 15,
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignSelf: 'center',
    width: 400,
    borderRadius: 7,
    justifyContent: 'space-around',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  balanceItemHeader: {
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingBottom: 10,
    justifyContent: 'space-around',
  },
  balanceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  componentWrap: {
    flexDirection: 'row',
  },
  textWrap: {
    color: '#fff',
    fontSize: 15,
    marginVertical: 5,
    marginLeft: 15,
  },
  textContainer: {
    backgroundColor: '#470736',
  },
});
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
