import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import {useNavigation} from '@react-navigation/native';
import CategoryIcon from './CategoryComponent';
import DeletedCategory from './DeltedCategory';
const IconItem = ({categoryList, applySort, type}) => {
  const navigation = useNavigation();
  const [list, setList] = useState(categoryList);
  useEffect(() => {
    setList(categoryList);
  }, [categoryList]);
  const renderItem = ({item, index, drag, isActive}) => {
    return (
      <View>
        <View
          key={index}
          style={{backgroundColor: isActive ? '#525252' : 'transparent'}}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('NewCategory', {item, index, type});
            }}>
            <CategoryIcon
              index={index}
              iconName={item.iconName}
              name={item.name}
              id={item.id}
              drag={drag}
            />
          </TouchableOpacity>
        </View>
        {list.length - 1 === index ? (
          <View>
            <DeletedCategory type={type} />
          </View>
        ) : null}
      </View>
    );
  };
  return (
    <View style={styles.iconWrap}>
      <DraggableFlatList
        activationDistance={10}
        data={list}
        renderItem={renderItem}
        keyExtractor={(item, index) => `draggable-item-${index}`}
        onDragEnd={({data}) => applySort(data)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  iconWrap: {flex: 1},
});

export default IconItem;
