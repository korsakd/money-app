import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {connect} from 'react-redux';
import {removeDeletedCategory} from '../redux/reducers/categoriesReducer';
import {setCategoryDb} from '../services/categoriesFunctions';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import translate from '../translate/Translate';
import {regexpMissing} from '../utils/RegExpFunction';

const DeletedCategory = ({
  deletedIncomeCategory,
  deletedCostsCategory,
  type,
  removeDeleted,
  add,
}) => {
  if (type === 'Income') {
    return (
      <View>
        {deletedIncomeCategory.length === 0 ? null : (
          <Text style={styles.textWrap}>{translate('recentlyDdeleted')}</Text>
        )}
        {deletedIncomeCategory.map((element, index) => {
          return (
            <View key={index} style={styles.categoryWrap}>
              <View style={styles.iconeContainer}>
                <TouchableOpacity
                  style={{
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                  }}
                  onPress={() => {
                    add(
                      {
                        iconName: element.iconName,
                        name: element.name,
                        id: element.id,
                      },
                      type,
                    );
                    removeDeleted(index, type);
                  }}>
                  <Icon name="plus-circle" size={20} color="green" />
                </TouchableOpacity>
                <View style={styles.iconStyle}>
                  <Icon name={element.iconName} size={24} />
                </View>
                <Text
                  numberOfLines={1}
                  ellipsizeMode={'tail'}
                  style={styles.textItem}>
                  {regexpMissing.test(translate(element.name))
                    ? element.name
                    : translate(element.name)}
                </Text>
                <View>
                  <TouchableOpacity
                    style={{
                      paddingHorizontal: 25,
                      paddingVertical: 10,
                    }}
                    onPress={() => {
                      removeDeleted(index, type);
                    }}>
                    <Icon name="delete" size={20} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        })}
      </View>
    );
  }
  if (type === 'Costs') {
    return (
      <View>
        {deletedCostsCategory.length === 0 ? null : (
          <Text style={styles.textWrap}>{translate('recentlyDdeleted')}</Text>
        )}
        {deletedCostsCategory.map((element, index) => {
          return (
            <View key={index} style={styles.categoryWrap}>
              <View style={styles.iconeContainer}>
                <TouchableOpacity
                  style={{
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                  }}
                  onPress={() => {
                    add(
                      {
                        iconName: element.iconName,
                        name: element.name,
                        id: element.id,
                      },
                      type,
                    );
                    removeDeleted(index, type);
                  }}>
                  <Icon name="plus-circle" size={20} color="green" />
                </TouchableOpacity>
                <View style={styles.iconStyle}>
                  <Icon name={element.iconName} size={24} />
                </View>
                <Text
                  numberOfLines={1}
                  ellipsizeMode={'tail'}
                  style={styles.textItem}>
                  {regexpMissing.test(translate(element.name))
                    ? element.name
                    : translate(element.name)}
                </Text>
                <View>
                  <TouchableOpacity
                    style={{
                      paddingHorizontal: 25,
                      paddingVertical: 10,
                    }}
                    onPress={() => {
                      removeDeleted(index, type);
                    }}>
                    <Icon name="delete" size={20} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        })}
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
  textWrap: {
    paddingLeft: 15,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: '#694fad',
    color: '#fff',
    fontSize: 15,
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
});

const mapStateToProps = state => {
  return {
    deletedIncomeCategory: state.categoriesReducer.deletedIncomeCategory,
    deletedCostsCategory: state.categoriesReducer.deletedCostsCategory,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    removeDeleted: (index, type) =>
      dispatch(removeDeletedCategory(index, type)),
    add: (category, type) => dispatch(setCategoryDb(category, type)),
  };
};

// eslint-disable-next-line prettier/prettier
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeletedCategory);
