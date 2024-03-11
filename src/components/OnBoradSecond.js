import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import OnBoardSecondSvg from '../../assets/svg/OnBoardSecondSvg';

const OnBoradSecond = () => {
  return (
    <View style={{}}>
      <OnBoardSecondSvg />
    </View>
  );
};

export default OnBoradSecond;

const styles = StyleSheet.create({
  name: {
    fontSize: 20,
    color: '#fff',
  },
  matching_tex: {
    fontSize: 12,
    color: '#fff',
  },
});
