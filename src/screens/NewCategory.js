import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Button,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {CategoryContext} from '../navigation/index';

import CategoryIcon from '../Components/CategoryComponent';
import {useNavigation, useRoute} from '@react-navigation/native';

const NewCategory = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [text, setText] = useState('');
  const iconNameArray = [
    'basecamp',
    'baseball-bat',
    'basket',
    'basket-fill',
    'basket-unfill',
    'basketball',
    'battery',
    'battery-10',
    'battery-10-bluetooth',
    'battery-20',
    'battery-20-bluetooth',
    'battery-30',
    'battery-30-bluetooth',
    'battery-40',
    'battery-40-bluetooth',
    'battery-50',
    'basecamp',
    'baseball-bat',
    'basket',
    'basket-fill',
    'basket-unfill',
    'basketball',
    'battery',
    'battery-10',
    'battery-10-bluetooth',
    'battery-20',
    'battery-20-bluetooth',
    'battery-30',
    'battery-30-bluetooth',
    'battery-40',
    'battery-40-bluetooth',
    'battery-50',
    'basecamp',
    'baseball-bat',
    'basket',
    'basket-fill',
    'basket-unfill',
    'basketball',
    'battery',
    'battery-10',
    'battery-10-bluetooth',
    'battery-20',
    'battery-20-bluetooth',
    'battery-30',
    'battery-30-bluetooth',
    'battery-40',
    'battery-40-bluetooth',
    'battery-50',
    'basecamp',
    'baseball-bat',
    'basket',
    'basket-fill',
    'basket-unfill',
    'basketball',
    'battery',
    'battery-10',
    'battery-10-bluetooth',
    'battery-20',
    'battery-20-bluetooth',
    'battery-30',
    'battery-30-bluetooth',
    'battery-40',
    'battery-40-bluetooth',
    'battery-50',
  ];
  const [choosenIcon, setChoosenIcon] = useState('');
  const contextValue = useContext(CategoryContext);
  return (
    <>
      <View>
        <Text>Введите название категории</Text>
        <Text>{choosenIcon}</Text>
        <View style={{flexDirection: 'row'}}>
          <TextInput
            style={{
              borderWidth: 2,
              flex: 1,
            }}
            value={text}
            onChangeText={setText}
          />
          <Button
            title="add"
            disabled={text === '' ? true : choosenIcon === '' ? true : false}
            onPress={() => {
              route.params.from === 'Profile'
                ? contextValue.addCategory({iconName: choosenIcon, name: text})
                : contextValue.addCostCategory({
                    iconName: choosenIcon,
                    name: text,
                  });
              navigation.goBack();
            }}
          />
        </View>
      </View>
      <View>
        <Text>Выберите иконку категории</Text>
        <ScrollView contentContainerStyle={styles.iconWrap}>
          {iconNameArray.map((element, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => setChoosenIcon(element)}>
                <View style={{marginVertical: 5}}>
                  <CategoryIcon iconName={element} />
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  iconWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});
export default NewCategory;
