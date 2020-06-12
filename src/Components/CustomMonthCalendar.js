/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

const CustomMonthCalendar = ({
  month,
  year,
  setMonth,
  setYear,
  hideCalendar,
  hideAnimCalendar,
  setIsHideAnimCalendar,
}) => {
  const monthArray = [
    {monthNumber: 1, monthName: 'Янв'},
    {monthNumber: 2, monthName: 'Фев'},
    {monthNumber: 3, monthName: 'Мар'},
    {monthNumber: 4, monthName: 'Апр'},
    {monthNumber: 5, monthName: 'Май'},
    {monthNumber: 6, monthName: 'Июн'},
    {monthNumber: 7, monthName: 'Июл'},
    {monthNumber: 8, monthName: 'Авг'},
    {monthNumber: 9, monthName: 'Сен'},
    {monthNumber: 10, monthName: 'Окт'},
    {monthNumber: 11, monthName: 'Ноя'},
    {monthNumber: 12, monthName: 'Дек'},
  ];

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          height: 50,
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTopWidth: StyleSheet.hairlineWidth,
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}>
        <TouchableOpacity
          style={{
            height: 50,
            width: '33%',
            justifyContent: 'center',
            paddingLeft: 20,
          }}
          onPress={() => setYear(year - 1)}>
          <Icon name="chevron-left" size={20} />
        </TouchableOpacity>
        <Text>{year}</Text>
        <TouchableOpacity
          style={{
            height: 50,
            width: '33%',
            justifyContent: 'center',
            alignItems: 'flex-end',
            paddingRight: 20,
          }}
          onPress={() => setYear(year + 1)}>
          <Icon name="chevron-right" size={20} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          paddingVertical: 10,
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}>
        {monthArray.map((element, index) => {
          return (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                width: '16.66%',
                height: 50,
                alignItems: 'center',
                justifyContent: 'space-around',
              }}>
              <TouchableOpacity
                onPress={() => {
                  setMonth(element.monthNumber);
                  hideCalendar(hideAnimCalendar);
                  setIsHideAnimCalendar(true);
                }}>
                <Text
                  style={{
                    backgroundColor:
                      month !== element.monthNumber ? '#e8e8e8' : '#470736',
                    color: month !== element.monthNumber ? '#000' : '#fff',
                    width: 40,
                    height: 40,
                    textAlign: 'center',
                    paddingTop: 10,
                    borderRadius: 5,
                  }}>
                  {element.monthName}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default CustomMonthCalendar;
