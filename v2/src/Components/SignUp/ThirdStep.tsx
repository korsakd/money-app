import React from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import { Auth } from 'aws-amplify';

type ThirdStepType = {
  width: number;
  flatListRef: React.MutableRefObject<FlatList<any> | null>;
};

const ThirdStep = ({ width, flatListRef }: ThirdStepType) => {
  const signOut = async () => {
    try {
      await Auth.signOut();
    } catch (error) {
      console.tron({ 'error signing out: ': error });
    }
  };

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width,
      }}>
      <Pressable
        onPress={() => {
          if (flatListRef.current) {
            signOut();
            flatListRef.current.scrollToIndex({ index: 0, animated: true });
          }
        }}
        style={{
          backgroundColor: 'tomato',
          width: '100%',
          height: 40,
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{ color: '#fff', fontWeight: '700', fontSize: 17 }}>
          {'Sign Out'}
        </Text>
      </Pressable>
    </View>
  );
};

export default ThirdStep;
