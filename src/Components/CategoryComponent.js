import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {useRoute} from '@react-navigation/native';

import {removeCategoryDb} from '../services/categoriesFunctions';
import {connect} from 'react-redux';

import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

const CategoryIcon = ({iconName, name, index, drag, id, remove}) => {
  const route = useRoute();
  const showIncome = route.name === 'Income';
  const showCosts = route.name === 'Costs';
  if (showIncome || showCosts) {
    return (
      <View style={styles.categoryWrap}>
        <View style={styles.iconeContainer}>
          <TouchableOpacity
            style={{marginLeft: 10}}
            onPress={() => {
              remove(index, route.name, id);
            }}>
            <Icon name="minus-circle" size={20} color="#d10000" />
          </TouchableOpacity>
          <View style={styles.iconStyle}>
            <Icon name={iconName} size={25} color="#525252" />
          </View>
          {name ? (
            <Text
              numberOfLines={1}
              ellipsizeMode={'tail'}
              style={styles.textItem}>
              {name}
            </Text>
          ) : null}
          <View style={{marginRight: 15}}>
            <TouchableOpacity onLongPress={drag}>
              <Icon name="menu" size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.categoryWrapDefault}>
        <View style={styles.iconeContainerDefault}>
          <View style={styles.iconStyleDefault}>
            <Icon name={iconName} size={25} color="#525252" />
          </View>
          {name ? (
            <Text
              numberOfLines={1}
              ellipsizeMode={'tail'}
              style={styles.textItemDefault}>
              {name}
            </Text>
          ) : null}
        </View>
      </View>
    );
  }
};
const styles = StyleSheet.create({
  categoryWrap: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryWrapDefault: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textItemDefault: {
    textAlign: 'center',
    flexGrow: 1,
    width: 50,
  },
  textItem: {
    textAlign: 'left',
    flexGrow: 1,
    width: 50,
  },
  iconeContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 10,
    flex: 1,
  },
  iconeContainerDefault: {
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 5,
  },
  iconStyle: {
    backgroundColor: '#e8e8e8',
    borderRadius: 12,
    width: 45,
    height: 45,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  iconStyleDefault: {
    backgroundColor: '#e8e8e8',
    borderRadius: 12,
    width: 45,
    height: 45,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
  },
});

const mapDispatchToProps = dispatch => {
  return {
    remove: (index, type, id) => dispatch(removeCategoryDb(index, type, id)),
  };
};

// eslint-disable-next-line prettier/prettier
export default connect(
  null,
  mapDispatchToProps,
)(CategoryIcon);
