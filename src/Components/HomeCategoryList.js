import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  ScrollView,
} from 'react-native';
import translate from '../translate/Translate';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import CategoryIcon from '../Components/CategoryComponent';
import Modal from 'react-native-modal';
import CustomKeyboard from '../Components/Keyboard';

const HomeCategoryList = ({type, categoryList}) => {
  const [toggleKeyboardModal, setToggleKeyboardModal] = useState(false);
  const [categoryType, setCategoryType] = useState('');
  const [categoryIcon, setCategoryIcon] = useState('');
  const [isHideAnim, setIsHideAnim] = useState(true);
  const hideAnim = useRef(new Animated.Value(1)).current;
  const hideIn = value => {
    Animated.timing(value, {
      toValue: 85,
      duration: 500,
    }).start();
  };

  const hideOut = value => {
    Animated.timing(value, {
      toValue: 1,
      duration: 500,
    }).start();
  };
  return (
    <View>
      <Modal
        isVisible={toggleKeyboardModal}
        onBackdropPress={() => setToggleKeyboardModal(false)}
        backdropOpacity={0.3}
        style={{margin: 0, justifyContent: 'flex-end'}}>
        <CustomKeyboard
          type={type}
          removeModal={element => setToggleKeyboardModal(element)}
          categoryType={categoryType}
          categoryIcon={categoryIcon}
        />
      </Modal>
      <TouchableOpacity
        onPress={() => {
          if (isHideAnim) {
            setIsHideAnim(false);
            hideIn(hideAnim);
          }
          if (!isHideAnim) {
            setIsHideAnim(true);
            hideOut(hideAnim);
          }
        }}>
        <View style={styles.textContainer}>
          {isHideAnim ? (
            <Icon name="chevron-up" size={24} color={'white'} />
          ) : (
            <Icon name="chevron-down" size={24} color={'white'} />
          )}
          <Text style={styles.textWrap}>
            {type === 'Costs' ? translate(type) : translate('Incomes')}
          </Text>
        </View>
      </TouchableOpacity>
      <Animated.View style={{height: hideAnim}}>
        <ScrollView horizontal>
          {categoryList.map((element, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setToggleKeyboardModal(true);
                  setCategoryType(element.name);
                  setCategoryIcon(element.iconName);
                }}>
                <CategoryIcon iconName={element.iconName} name={element.name} />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  textWrap: {
    color: '#fff',
    fontSize: 15,
    marginVertical: 5,
    marginLeft: 15,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1c2b59',
  },
});

export default HomeCategoryList;
