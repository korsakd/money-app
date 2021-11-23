import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RED } from '../Constants';

type ErrorInfoType = { error: string };

const ErrorInfo = ({ error }: ErrorInfoType) => {
  return (
    <View style={styles.errorWrap}>
      <Text style={styles.errorText}>{error}</Text>
    </View>
  );
};

export default ErrorInfo;

const styles = StyleSheet.create({
  errorWrap: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 17,
    marginBottom: 10,
  },
  errorText: { color: RED, fontWeight: '700' },
});
