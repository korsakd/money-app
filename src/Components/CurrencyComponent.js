import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {connect} from 'react-redux';
import {deleteExchangeRates} from '../redux/reducers/currencyReducer';

const CurrencyComponent = ({
  curAbbreviation,
  curOfficialRate,
  value,
  index,
  deleteExchangeRates,
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
        marginLeft: 20,
      }}>
      <View style={{flexDirection: 'row', width: 220}}>
        <Text
          style={{
            width: '45%',
            fontSize: 20,
          }}>{`${value} ${curAbbreviation}`}</Text>
        <Text style={{width: '10%', fontSize: 20}}>=</Text>
        <Text
          style={{
            width: '45%',
            fontSize: 20,
          }}>{`${curOfficialRate.toFixed(2)} BYN`}</Text>
      </View>
      <TouchableOpacity
        onPress={() => deleteExchangeRates(index, curAbbreviation)}
        style={{
          width: 30,
          height: 30,
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 30,
        }}>
        <Icon name="delete" size={25} color={'#505049'} />
      </TouchableOpacity>
    </View>
  );
};

const mapDispatchToProps = dispatch => ({
  deleteExchangeRates: (index, curAbbreviation) =>
    dispatch(deleteExchangeRates(index, curAbbreviation)),
});

export default connect(
  null,
  mapDispatchToProps,
)(CurrencyComponent);
