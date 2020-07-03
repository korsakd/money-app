import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import Graphs from '../Components/Graphs';
import {connect} from 'react-redux';
import translate from '../translate/Translate';

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
        <Text>{translate('graphWelcomeTop')}</Text>
        <Text>{translate('graphWelcomeBottom')}</Text>
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
              {translate('incomes')}
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
              {translate('costs')}
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
