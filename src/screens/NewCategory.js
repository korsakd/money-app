import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {useNavigation, useRoute} from '@react-navigation/native';
import {connect} from 'react-redux';
import {replaceCategoryDb} from '../services/categoriesFunctions';
import {setCategoryDb} from '../services/categoriesFunctions';
import CategoryList from '../Components/CategoryList';
import CategoryIcon from '../Components/CategoryComponent';
import UUIDGenerator from 'react-native-uuid-generator';
import translate from '../translate/Translate';
import FocusAwareStatusBar from '../utils/StatusBarColor';

const NewCategory = ({add, categoriesIcon, replace, income, costs}) => {
  const navigation = useNavigation();
  const route = useRoute();
  const [choosenIcon, setChooseIcon] = useState(
    route.params.item ? route.params.item.iconName : categoriesIcon.Food[0],
  );
  const [text, setText] = useState(
    route.params.item ? route.params.item.name : '',
  );

  const check = async () => {
    if (text === '') {
      return Alert.alert(translate('сategoryNameInput'));
    }
    if (text !== '') {
      const id = await UUIDGenerator.getRandomUUID();
      add(
        {
          iconName: choosenIcon,
          name: text,
          id: id,
          index: route.params.from === 'Income' ? income.length : costs.length,
        },
        route.params.from,
      );
      if (route.params.type === 'Income' || route.params.type === 'Costs') {
        replace(
          {
            iconName: choosenIcon,
            name: text,
            id: route.params.item.id,
          },
          route.params.index,
          route.params.type,
        );
      }
      navigation.goBack();
    }
  };
  navigation.setOptions({
    headerRight: () => (
      <TouchableOpacity
        style={{marginRight: 15}}
        onPress={() => {
          check();
        }}>
        <Icon name="check" size={25} color="#fff" />
      </TouchableOpacity>
    ),
  });

  return (
    <View style={{backgroundColor: 'white'}}>
      <FocusAwareStatusBar backgroundColor="#694fad" barStyle="light-content" />
      <View>
        <Text
          style={{
            fontSize: 15,
            marginTop: 10,
            marginLeft: 15,
          }}>
          {translate('сategoryNameInput')}
        </Text>
        <Text
          style={{
            fontSize: 10,
            marginBottom: 10,
            marginLeft: 15,
          }}>
          {translate('nameLimit')}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <CategoryIcon iconName={choosenIcon} />
          <TextInput
            style={{
              flex: 1,
              marginRight: 10,
              borderBottomWidth: 1,
              marginTop: 0,
              paddingBottom: 0,
              paddingTop: 0,
            }}
            placeholder={translate('categoryNamePlaceHolder')}
            onChangeText={setText}
            value={text}
            maxLength={20}
          />
        </View>
      </View>
      <ScrollView style={{marginBottom: 110}}>
        {Object.entries(categoriesIcon).map(([key, value]) => {
          return (
            <View key={key}>
              <View style={styles.textContainer}>
                <Text style={styles.textWrap}>{translate(key)}</Text>
              </View>
              <View style={{marginBottom: 10}}>
                <CategoryList
                  categoryArray={value}
                  setChooseIcon={setChooseIcon}
                />
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  textWrap: {
    color: '#fff',
    fontSize: 15,
    marginVertical: 5,
    marginLeft: 15,
  },
  textContainer: {
    backgroundColor: '#694fad',
    marginVertical: 3,
  },
});

const mapStateToProps = state => {
  return {
    income: state.categoriesReducer.income,
    costs: state.categoriesReducer.costs,
    categoriesIcon: state.categoriesReducer.categoriesIcon,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    add: (category, from) => {
      dispatch(setCategoryDb(category, from));
    },
    replace: (element, index, type) => {
      dispatch(replaceCategoryDb(element, index, type));
    },
  };
};

// eslint-disable-next-line prettier/prettier
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewCategory);
