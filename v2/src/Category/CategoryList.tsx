import React from 'react';
import { FlatList, View } from 'react-native';
import { CategoryType } from '../store/category';
import AddCategory from './AddCategory';
import RenderItem from './RenderItem';

type CategoryListType = {
  categoryList: CategoryType[];
  type: string;
};

const CategoryList = ({ categoryList, type }: CategoryListType) => {
  const renderItem = ({ item }: { item: CategoryType }) => {
    return <RenderItem categoryItem={item} type={type} />;
  };
  return (
    <>
      <FlatList
        keyboardShouldPersistTaps="handled"
        style={{ marginBottom: 10 }}
        bounces={false}
        showsVerticalScrollIndicator={false}
        data={categoryList}
        renderItem={renderItem}
        keyExtractor={item => `draggable-item-${item.id}`}
      />
      <AddCategory from={type} />
    </>
  );
};

export default CategoryList;
