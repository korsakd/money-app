import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {removeCategoryDb} from '../services/categoriesFunctions';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import translate from '../translate/Translate';
import {regexpMissing} from '../utils/RegExpFunction';

const CategoryIcon = ({iconName, name, index, drag, id, remove, type}) => {
  const showIncome = type === 'Income';
  const showCosts = type === 'Costs';
  if (showIncome || showCosts) {
    return (
      <View style={styles.categoryWrap}>
        <View style={styles.iconeContainer}>
          <TouchableOpacity
            style={{
              paddingHorizontal: 20,
              paddingVertical: 10,
            }}
            onPress={() => {
              remove(index, type, id);
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
              {regexpMissing.test(translate(name)) ? name : translate(name)}
            </Text>
          ) : null}
          <View>
            <TouchableOpacity
              onLongPress={drag}
              style={{
                paddingHorizontal: 25,
                paddingVertical: 10,
              }}>
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
              {regexpMissing.test(translate(name)) ? name : translate(name)}
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
    marginLeft: 5,
  },
  iconStyle: {
    backgroundColor: '#e8e8e8',
    borderRadius: 12,
    width: 45,
    height: 45,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
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
