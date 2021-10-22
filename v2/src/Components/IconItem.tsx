import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getCurrentTheme } from '../Theme';

type IconItemType = {
  name: string;
  check?: boolean;
};

const IconItem = ({ name, check = false }: IconItemType) => {
  const scheme = useColorScheme();
  const { colors } = getCurrentTheme(scheme);
  return (
    <View style={[styles.iconWrap, { backgroundColor: colors.background }]}>
      <Icon name={name} size={25} color="#fff" />
      {check && (
        <View style={styles.check}>
          <Icon name={'check'} size={10} color="#fff" />
        </View>
      )}
    </View>
  );
};

export default IconItem;

const styles = StyleSheet.create({
  iconWrap: {
    borderColor: 'tomato',
    borderWidth: 3,
    borderRadius: 12,
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  check: {
    width: 15,
    height: 15,
    borderRadius: 8,
    backgroundColor: 'green',
    position: 'absolute',
    top: -7.5,
    right: -7.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
