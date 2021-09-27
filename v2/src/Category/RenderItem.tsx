import React from 'react';
import { View, Text, Pressable, Dimensions } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import Animated, { multiply, sub } from 'react-native-reanimated';
import SwipeableItem from 'react-native-swipeable-item';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CategoryType } from '../store/category';
import { getCurrentTheme } from '../Theme';

type RenderItem = {
  categoryItem: CategoryType;
  drag: () => void;
  isActive: boolean;
  itemRefs: any;
};

const RenderItem = ({ categoryItem, drag, isActive, itemRefs }: RenderItem) => {
  const scheme = useColorScheme();
  const { colors } = getCurrentTheme(scheme);
  const renderOverlay = (params, { categoryItem, drag, isActive }) => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background,
          alignItems: 'center',
          flexDirection: 'row',
          paddingVertical: 10,
          paddingLeft: 15,
        }}>
        <View
          style={{
            borderColor: 'tomato',
            borderWidth: 3,
            borderRadius: 12,
            width: 45,
            height: 45,
            overflow: 'hidden',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 15,
          }}>
          <Icon name={categoryItem.iconName} size={25} color="#fff" />
        </View>
        <Text
          style={{
            color: '#fff',
          }}>
          {categoryItem.name}
        </Text>
      </View>
    );
  };

  return (
    <SwipeableItem
      key={categoryItem.id}
      item={{ categoryItem, drag }}
      ref={(ref) => {
        if (ref && !itemRefs.get(categoryItem.id)) {
          itemRefs.set(categoryItem.id, ref);
        }
      }}
      onChange={({ open, snapPoint }) => {
        if (open) {
          // Close all other open items
          [...itemRefs.entries()].forEach(([key, ref]) => {
            if (key !== categoryItem.id) ref.close();
          });
        }
      }}
      swipeEnabled={!isActive ? true : false}
      overSwipe={50}
      renderUnderlayLeft={({ percentOpen }) => {
        return (
          <Animated.View
            style={{
              flex: 1,
              backgroundColor: 'red',
              paddingRight: multiply(sub(1, percentOpen), 100),
            }}>
            <Pressable
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'flex-end',
                marginRight: '7%',
              }}>
              <Text style={{ color: '#fff' }}>Delete</Text>
            </Pressable>
          </Animated.View>
        );
      }}
      snapPointsLeft={[100]}
      renderUnderlayRight={({ percentOpen }) => {
        return (
          <Animated.View
            style={{
              flex: 1,
              backgroundColor: 'green',
              paddingLeft: multiply(sub(1, percentOpen), 100),
            }}>
            <Pressable
              style={{
                backgroundColor: 'green',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'flex-start',
                marginLeft: '7%',
              }}>
              <Text style={{ color: '#fff' }}>Red</Text>
            </Pressable>
          </Animated.View>
        );
      }}
      snapPointsRight={[100]}
      renderOverlay={(props) =>
        renderOverlay(props, { categoryItem, drag, isActive })
      }
    />
  );
};

export default RenderItem;
