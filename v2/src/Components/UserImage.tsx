import React from 'react';
import { Text, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

type UserImageType = {
  imageUri: string | null;
  width: number | string;
  height: number | string;
  radius: number;
  firstName: string;
  lastName: string;
};

const UserImage = ({
  imageUri,
  width,
  height,
  radius,
  firstName,
  lastName,
}: UserImageType) => {
  return (
    <>
      {imageUri ? (
        <Image
          source={{ uri: imageUri }}
          style={{
            width,
            height,
            borderRadius: radius,
          }}
        />
      ) : (
        <LinearGradient
          colors={['grey', 'tomato']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            width,
            height,
            borderRadius: radius,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: '#fff',
              fontSize: 20,
              fontWeight: '700',
            }}>{`${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}`}</Text>
        </LinearGradient>
      )}
    </>
  );
};

export default UserImage;
