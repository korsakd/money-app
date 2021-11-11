import React from 'react';
import { View, Text, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

type UserImageType = {
  imageUri: string | null;
  firstName: string;
  secondName: string;
};

const UserImage = ({ imageUri, firstName, secondName }: UserImageType) => {
  return (
    <>
      {imageUri ? (
        <Image
          source={{ uri: imageUri }}
          style={{
            width: 70,
            height: 70,
            borderRadius: 35,
          }}
        />
      ) : (
        <LinearGradient
          colors={['grey', 'tomato']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            width: 70,
            height: 70,
            borderRadius: 35,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: '#fff',
              fontSize: 20,
              fontWeight: '700',
            }}>{`${firstName[0].toUpperCase()}${secondName[0].toUpperCase()}`}</Text>
        </LinearGradient>
      )}
    </>
  );
};

export default UserImage;
