import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import IconItem from '../IconItem';
import styles from './styles';

const CategoryItem = ({ categoryList, type }) => {
  const [list, setList] = useState(categoryList);
  useEffect(() => {
    setList(categoryList);
  }, [categoryList]);
  const renderItem = ({ item, index, drag, isActive }) => {
    return (
      <View
        key={index}
        style={[
          styles.container,
          { backgroundColor: isActive ? '#525252' : 'transparent' },
        ]}>
        <TouchableOpacity delayPressIn={100} onLongPress={drag}>
          <View style={styles.categoryIcon}>
            <View style={styles.iconItem}>
              <IconItem item={item} />
            </View>
            <Text>{item.name}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <DraggableFlatList
        activationDistance={10}
        data={list}
        renderItem={renderItem}
        keyExtractor={(item, index) => `draggable-item-${index}`}
        // onDragEnd={({ data }) => applySort(data)}
      />
    </View>
  );
};

export default CategoryItem;
