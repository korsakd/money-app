import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import Graphs from '../Components/Graphs';
import {connect} from 'react-redux';

const GraphsScreen = ({balance}) => {
  const incomeBalance = balance.filter(
    element => element.categoryType === 'Income',
  );
  const costsBalance = balance.filter(
    element => element.categoryType === 'Costs',
  );
  if (Object.keys(balance).length === 0) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Здесь будут отображены графики</Text>
        <Text>ваших расходов и доходов.</Text>
      </View>
    );
  } else {
    return (
      <ScrollView>
        {incomeBalance.length === 0 ? null : (
          <View style={{marginVertical: 10}}>
            <Text
              style={{
                marginBottom: 15,
                alignSelf: 'center',
                fontSize: 15,
                fontWeight: 'bold',
              }}>
              Доходы
            </Text>
            <Graphs balance={incomeBalance} />
          </View>
        )}
        {costsBalance.length === 0 ? null : (
          <View style={{marginVertical: 10}}>
            <Text
              style={{
                marginBottom: 15,
                alignSelf: 'center',
                fontSize: 15,
                fontWeight: 'bold',
              }}>
              Расходы
            </Text>
            <Graphs balance={costsBalance} />
          </View>
        )}
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  textWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = state => {
  return {
    balance: state.balanceReducer.balance,
  };
};

export default connect(
  mapStateToProps,
  null,
)(GraphsScreen);
