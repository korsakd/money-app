import React, { useState } from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import UserImage from '../UserImage';
import NextButtonWithLoader from './NextButtonWithLoader';
import UserInfoInput from './UserInfoInput';
import ImagePicker from 'react-native-image-crop-picker';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/core';

type ThirdStepType = {
  width: number;
};

const ThirdStep = ({ width }: ThirdStepType) => {
  const [firstName, setFirstName] = useState('');
  const [secondName, setSecondName] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const onFinishPress = async () => {
    try {
      setIsLoading(true);
      setIsLoading(false);
      navigation.pop();
    } catch (error) {
      setIsLoading(false);
      console.tron({ error });
    }
  };

  return (
    <View style={[styles.mainContainer, { width }]}>
      <View style={styles.photoContainer}>
        <UserImage imageUri={imageUri} firstName={'new'} secondName={'user'} />
        <Pressable
          onPress={() => {
            ImagePicker.openPicker({
              width: 400,
              height: 400,
              cropping: true,
              includeBase64: true,
            }).then(image => {
              setImageUri(`data:image/png;base64,${image.data}`);
            });
          }}>
          <Text style={styles.photoText}>{'Add photo'}</Text>
        </Pressable>
      </View>
      <View style={styles.inputWrap}>
        <UserInfoInput
          title={'First name'}
          value={firstName}
          setValue={setFirstName}
        />
        <UserInfoInput
          title={'Second name'}
          value={secondName}
          setValue={setSecondName}
        />
      </View>
      <NextButtonWithLoader
        title={'Finish'}
        onPress={onFinishPress}
        isLoading={isLoading}
      />
    </View>
  );
};

export default ThirdStep;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  photoText: {
    color: 'tomato',
    textDecorationLine: 'underline',
    marginLeft: 15,
  },
  inputWrap: {
    width: '100%',
    height: 140,
    justifyContent: 'space-between',
    marginBottom: 20,
  },
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
