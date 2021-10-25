import React from 'react';
import { View } from 'react-native';
import DraggableFlatList, {
  RenderItemParams,
} from 'react-native-draggable-flatlist';
import { CategoryType } from '../store/category';
import AddCategory from './AddCategory';
import RenderItem from './RenderItem';

type CategoryListType = {
  categoryList: CategoryType[];
  type: string;
};

const CategoryList = ({ categoryList, type }: CategoryListType) => {
  const itemRefs = new Map();
  const renderSeparator = () => {
    return (
      <View
        style={{
          height: 0.5,
          backgroundColor: '#CED0CE',
        }}
      />
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <DraggableFlatList
        activationDistance={15}
        keyboardShouldPersistTaps="handled"
        ItemSeparatorComponent={renderSeparator}
        data={categoryList}
        renderItem={({
          item,
          index,
          drag,
          isActive,
        }: RenderItemParams<CategoryType>) => (
          <RenderItem
            categoryItem={item}
            type={type}
            drag={drag}
            isActive={isActive}
            itemRefs={itemRefs}
          />
        )}
        keyExtractor={(item, index) => `draggable-item-${item.id}`}
        // onDragEnd={({ data }) => this.setState({ data })}
      />
      <AddCategory from={type} />
    </View>
  );
};

export default CategoryList;
