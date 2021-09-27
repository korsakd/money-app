import React from 'react';
import { View } from 'react-native';
import DraggableFlatList, {
  RenderItemParams,
} from 'react-native-draggable-flatlist';
import { CategoryType } from '../store/category';
import RenderItem from './RenderItem';

type CategoryListType = {
  categoryList: CategoryType[];
};

const CategoryList = ({ categoryList }: CategoryListType) => {
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
            drag={drag}
            isActive={isActive}
            itemRefs={itemRefs}
          />
        )}
        keyExtractor={(item, index) => `draggable-item-${item.id}`}
        // onDragEnd={({ data }) => this.setState({ data })}
      />
    </View>
  );
};

export default CategoryList;
