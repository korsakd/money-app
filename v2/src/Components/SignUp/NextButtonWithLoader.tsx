import React from 'react';
import {
  Text,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  View,
} from 'react-native';

type NextButtonType = {
  title: string;
  onPress: () => void;
  isLoading?: boolean;
};

const NextButtonWithLoader = ({
  title,
  onPress,
  isLoading = false,
}: NextButtonType) => {
  return (
    <>
      {isLoading ? (
        <View style={styles.btn}>
          <ActivityIndicator color={'#fff'} />
        </View>
      ) : (
        <Pressable onPress={onPress} style={styles.btn}>
          <Text style={styles.btnText}>{title}</Text>
        </Pressable>
      )}
    </>
  );
};

export default NextButtonWithLoader;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: 'tomato',
    width: '100%',
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 17 },
});
