import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import OnBoardThirdSvg from '../../assets/svg/OnBoardThirdSvg';

const OnBoardThird = ({title}) => {
  return (
    <View style={{alignItems: 'center'}}>
      <OnBoardThirdSvg />
    </View>
  );
};

export default OnBoardThird;

const styles = StyleSheet.create({
  footer_container: {
    flex: 0.2,
    marginBottom: 20,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    color: '#fff',
  },
  name: {
    fontSize: 22,
    color: '#fff',
    textAlign: 'center',
  },
  button_text: {
    color: '#fff',
    fontSize: 20,
  },
});
