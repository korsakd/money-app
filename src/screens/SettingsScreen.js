import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import LoginHome from '../Components/LoginHome';

const Settings = ({user}) => {
  const [avatar, setAvatar] = useState();

  // return <LoginHome />;
  return (
    <View>
      <Text>hello</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textWrap: {
    flex: 1,
  },
});

const mapStateToProps = state => {
  return {
    user: state.userReduсer.user,
  };
};

export default connect(
  mapStateToProps,
  null,
)(Settings);

// <View style={styles.textWrap}>
//   <View style={{flexDirection: 'row', marginTop: 10, marginLeft: 10}}>
//     <Image
//       style={{
//         width: 100,
//         height: 100,
//         backgroundColor: '#e8e8e8',
//         borderRadius: 20,
//       }}
//       source={require('../img/user-picture.png')}
//     />
//     <TouchableOpacity
//       onPress={() => {
//         ImagePicker.showImagePicker({}, response => {
//           // console.tron(response);
//           return setAvatar(response.uri);
//         });
//       }}>
//       <Text>ryjgr</Text>
//     </TouchableOpacity>
//     <View style={{backgroundColor: 'red', flex: 1}}>
//       <Text>{`Имя: ${user.displayName}`}</Text>
//       <Text>{`E-mail: ${user.email}`}</Text>
//     </View>
//   </View>
// </View>
