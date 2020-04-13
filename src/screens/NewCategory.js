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
import {
  addCategory,
  replaceCategory,
} from '../redux/reducers/categoriesReducer';

import CategoryList from '../Components/CategoryList';
import CategoryIcon from '../Components/CategoryComponent';

const NewCategory = ({add, categoriesIcon, replace}) => {
  const navigation = useNavigation();
  const route = useRoute();
  const [choosenIcon, setChooseIcon] = useState(
    route.params.item ? route.params.item.iconName : categoriesIcon.Food[0],
  );
  const [text, setText] = useState(
    route.params.item ? route.params.item.name : '',
  );
  const check = () => {
    if (text === '') {
      return Alert.alert('Введите текст');
    }
    if (text !== '') {
      add(
        {
          iconName: choosenIcon,
          name: text,
        },
        route.params.from,
      );
      if (route.params.type === 'Income' || route.params.type === 'Costs') {
        replace(
          {
            iconName: choosenIcon,
            name: text,
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
      <View>
        <Text
          style={{
            fontSize: 15,
            marginVertical: 10,
            marginLeft: 15,
          }}>
          Введите название категории
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
            placeholder="Category name"
            onChangeText={setText}
            value={text}
          />
        </View>
      </View>
      <ScrollView style={{marginBottom: 110}}>
        {Object.entries(categoriesIcon).map(([key, value]) => {
          return (
            <View key={key}>
              <View style={styles.textContainer}>
                <Text style={styles.textWrap}>{key}</Text>
              </View>
              <CategoryList
                categoryArray={value}
                setChooseIcon={setChooseIcon}
              />
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
    categoriesIcon: state.categoriesReducer.categoriesIcon,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    add: (category, from) => {
      dispatch(addCategory(category, from));
    },
    replace: (element, index, type) => {
      dispatch(replaceCategory(element, index, type));
    },
  };
};

// eslint-disable-next-line prettier/prettier
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewCategory);
