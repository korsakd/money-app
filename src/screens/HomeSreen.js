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

function HomeScreen({navigation, balance, incomeCategory, costsCategory}) {
  const [toggleModal, setToggleModal] = useState(false);
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
  const dateDisplay = date => {
    return `${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}.${
      date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    }.${date.getFullYear()}`;
  };
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.balanceWrap}>
        <View>
          <Text>Доход</Text>
          <Text>{incomeValue}</Text>
        </View>
        <View>
          <Text>Расходы</Text>
          <Text>{costsValue}</Text>
        </View>
        <View>
          <Text>Баланс</Text>
          <Text>{(Number(incomeValue) - Number(costsValue)).toFixed(2)}</Text>
        </View>
      </View>
      <ScrollView>
        {balance.map((element, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() =>
                navigation.navigate('Details', {
                  element,
                  index,
                })
              }>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                }}>
                <Text>
                  {element.categoryType === 'Costs'
                    ? 'Расходы:'
                    : element.categoryType === 'Income'
                    ? 'Доходы:'
                    : ''}
                </Text>
                <CategoryIcon iconName={element.categoryIconName} />
                <Text>{element.categoryName}</Text>
                <Text>{element.inputValue}</Text>
                <Text>
                  {element.date ? dateDisplay(new Date(element.date)) : ''}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <View>
        <Modal
          isVisible={toggleModal}
          onBackdropPress={() => setToggleModal(false)}
          backdropOpacity={0.3}
          style={{margin: 0, justifyContent: 'flex-end'}}>
          <CustomKeyboard
            type={type}
            removeModal={element => setToggleModal(element)}
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
                    setToggleModal(true);
                    setCategoryType(element.name);
                    setCategoryIcon(element.iconName);
                  }}>
                  <CategoryIcon
                    iconName={element.iconName}
                    name={element.name}
                    styles={{width: 50}}
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
                    setToggleModal(true);
                    setCategoryType(element.name);
                    setCategoryIcon(element.iconName);
                  }}>
                  <CategoryIcon
                    iconName={element.iconName}
                    name={element.name}
                    styles={{width: 50}}
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
    // borderWidth: StyleSheet.hairlineWidth,
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
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  componentWrap: {
    flexDirection: 'row',
  },
  buttonWrap: {
    width: 150,
    alignItems: 'center',
    backgroundColor: '#e028fc',
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  textWrap: {
    color: '#fff',
    fontSize: 15,
    marginVertical: 5,
    marginLeft: 15,
  },
  textContainer: {
    backgroundColor: '#a35f1b',
  },
});
const mapStateToProps = state => {
  return {
    balance: state.balanceReducer.balance,
    incomeCategory: state.categoriesReducer.income,
    costsCategory: state.categoriesReducer.costs,
  };
};
// eslint-disable-next-line prettier/prettier
export default connect(
  mapStateToProps,
  null,
)(HomeScreen);
