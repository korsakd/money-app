import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

const container: ViewStyle = {
  borderRadius: 5,
  marginBottom: 10,
  padding: 10,
  width: 100,
};
const buttonContainer: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
};
const text: TextStyle = { marginRight: 10, fontSize: 20 };

export default StyleSheet.create({ container, buttonContainer, text });
