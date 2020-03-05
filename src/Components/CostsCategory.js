import React, {useState, useContext, useEffect} from 'react';
import {ScrollView, View, Text} from 'react-native';

import AddCategory from './AddButtonComponent';
import IconItem from './IconItem';
import {CategoryContext} from '../navigation';

const Costs = () => {
  const categoryContext = useContext(CategoryContext);
  const [costsCategory, setCostsCategory] = useState(
    categoryContext.costsCategory,
  );

  useEffect(() => {
    setCostsCategory(categoryContext.costsCategory);
  }, [categoryContext]);
  return (
    <>
      <View>
        <Text
          style={{
            margin: 10,
            fontSize: 15,
          }}>
          Расходы
        </Text>
      </View>
      <ScrollView horizontal>
        <IconItem categoryList={costsCategory} />
        <AddCategory from="Costs" />
      </ScrollView>
    </>
  );
};

export default Costs;
