import React from 'react';
import {View, Text} from 'react-native';
import {PieChart} from 'react-native-svg-charts';
import translate from '../translate/Translate';
import {regexpMissing} from '../utils/RegExpFunction';

const Graphs = ({balance}) => {
  let newBalance = {};
  for (const element of balance) {
    if (newBalance[element.categoryName]) {
      newBalance[element.categoryName] = (
        Number(newBalance[element.categoryName]) + Number(element.inputValue)
      ).toFixed(2);
    } else {
      newBalance[element.categoryName] = Number(element.inputValue);
    }
  }
  const data = Object.values(newBalance);
  const summValues = (a, c) => Number(a) + Number(c);
  const summData = data.reduce(summValues, 0);
  const randomColor = () =>
    ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(
      0,
      7,
    );
  const pieData = data
    .filter(value => value > 0)
    .map((value, index) => ({
      value,
      svg: {fill: randomColor()},
      key: `pie-${index}`,
    }));
  return (
    <View>
      <View>
        <PieChart
          style={{height: 200, width: 200, alignSelf: 'center'}}
          data={pieData}
          innerRadius={40}
          outerRadius={100}
        />
        <View
          style={{
            marginTop: 10,
            marginHorizontal: 10,
            borderColor: '#000',
            shadowColor: '#000',
            elevation: 2,
          }}>
          {Object.entries(newBalance).map(([key, value]) => {
            let color;
            for (const element of pieData) {
              if (element.value === value) {
                color = element.svg.fill;
              }
            }
            return (
              <View
                key={key}
                style={{
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginVertical: 10,
                    width: '50%',
                  }}>
                  <View
                    style={{
                      marginLeft: 10,
                      width: 20,
                      height: 20,
                      borderRadius: 10,
                      backgroundColor: color,
                    }}
                  />
                  <Text style={{marginLeft: 10}}>
                    {regexpMissing.test(translate(key)) ? key : translate(key)}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 10,
                    flex: 1,
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{marginLeft: 10}}>{value}</Text>
                  <Text style={{marginRight: 20}}>{`${(
                    (value * 100) /
                    summData
                  ).toFixed(1)}%`}</Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default Graphs;
