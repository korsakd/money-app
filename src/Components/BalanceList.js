import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import translate from '../translate/Translate';
import {dateDisplay} from '../utils/dateHelpers';
import CategoryIcon from '../Components/CategoryComponent';
import {regexpMissing} from '../utils/RegExpFunction';

const BalanceList = ({dates, navigation}) => {
  const summValues = (a, c) => Number(a) + Number(c.inputValue);
  return (
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
                {incomeValueArray.length === 0
                  ? null
                  : `${translate('income')}: ${Number(incomeValues).toFixed(
                      2,
                    )}`}
              </Text>
              <Text>
                {costsValueArray.length === 0
                  ? null
                  : `${translate('cost')}: - ${Number(costsValues).toFixed(2)}`}
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
                    <Text style={{fontSize: 17}}>
                      {regexpMissing.test(translate(element.categoryName))
                        ? element.categoryName
                        : translate(element.categoryName)}
                    </Text>
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
  );
};

const styles = StyleSheet.create({
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

    elevation: 1,
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
});

export default BalanceList;
