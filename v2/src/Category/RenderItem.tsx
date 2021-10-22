import React from 'react';
import { Text, Pressable, TouchableOpacity, StyleSheet } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import Animated, { multiply, sub } from 'react-native-reanimated';
import SwipeableItem from 'react-native-swipeable-item';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconItem from '../Components/IconItem';
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
      <TouchableOpacity
        onLongPress={drag}
        activeOpacity={1}
        style={[
          {
            backgroundColor: colors.background,
          },
          styles.itemWrap,
        ]}>
        <>
          <IconItem name={categoryItem.iconName} />
          <Text style={[styles.text, { color: colors.text }]}>
            {categoryItem.name}
          </Text>
        </>
      </TouchableOpacity>
    );
  };

  return (
    <SwipeableItem
      key={categoryItem.id}
      item={{ categoryItem, drag }}
      ref={ref => {
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
      renderUnderlayLeft={({ percentOpen }) => {
        return (
          <Animated.View
            style={[
              {
                paddingRight: multiply(sub(1, percentOpen), 100),
              },
              styles.animatedView,
            ]}>
            <Pressable style={styles.deleteButton}>
              <Text style={styles.deleteText}>{'Delete'}</Text>
            </Pressable>
          </Animated.View>
        );
      }}
      snapPointsLeft={[100]}
      renderOverlay={props =>
        renderOverlay(props, { categoryItem, drag, isActive })
      }
    />
  );
};

export default RenderItem;

const styles = StyleSheet.create({
  animatedView: { flex: 1, backgroundColor: 'red' },
  deleteButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginRight: '7%',
  },
  deleteText: { color: '#fff', fontWeight: '700' },
  itemWrap: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 10,
    paddingLeft: 15,
  },
  text: {
    fontWeight: '700',
    marginLeft: 10,
  },
});
