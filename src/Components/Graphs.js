import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {PieChart} from 'react-native-svg-charts';

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
            borderRadius: 7,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,

            elevation: 1,
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
                  <Text style={{marginLeft: 10}}>{key}</Text>
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

const styles = StyleSheet.create({
  textWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Graphs;
