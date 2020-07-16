import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import translate from '../translate/Translate';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {connect} from 'react-redux';

const BalanceHeader = ({
  navigation,
  filterBalanceMonth,
  setLoginModal,
  user,
}) => {
  const incomeArray = filterBalanceMonth.filter(
    element => element.categoryType === 'Income',
  );
  const costsArray = filterBalanceMonth.filter(
    element => element.categoryType === 'Costs',
  );
  const summValues = (a, c) => Number(a) + Number(c.inputValue);
  const incomeValue = incomeArray.reduce(summValues, 0);
  const costsValue = costsArray.reduce(summValues, 0);
  return (
    <View style={{zIndex: 1}}>
      <TouchableOpacity
        style={styles.balanceWrap}
        onPress={() => navigation.navigate('Graphs')}>
        <View />
        <View>
          <Text style={styles.balanceType}>{translate('income')}</Text>
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
          <Text style={styles.balanceType}>{translate('Costs')}</Text>
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
          <Text style={styles.balanceType}>{translate('balance')}</Text>
          <Text style={styles.balanceValue}>
            {(Number(incomeValue) - Number(costsValue)).toFixed(2)}
          </Text>
        </View>
        <View />
      </TouchableOpacity>
      {!user ? (
        <TouchableOpacity
          onPress={() => setLoginModal(true)}
          style={styles.attentionWrap}>
          <Icon name="alert-decagram-outline" size={20} color="#FF0000" />
          <Text style={{color: '#FF0000', marginLeft: 5}}>
            {translate('attention')}
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  balanceWrap: {
    marginTop: 15,
    marginBottom: 15,
    alignSelf: 'center',
    width: 400,
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderColor: '#000',
    shadowColor: '#000',
    elevation: 2,
  },
  attentionWrap: {
    flexDirection: 'row',
    backgroundColor: '#FA8072',
    opacity: 0.5,
    marginBottom: 15,
    marginHorizontal: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
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
});

const mapStateToProps = state => {
  return {
    user: state.userReducer.user,
  };
};

export default connect(
  mapStateToProps,
  null,
)(BalanceHeader);
