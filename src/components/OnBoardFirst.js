import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import OnBoardFirstSvg from '../../assets/svg/OnBoardFirstSvg';

const OnBoardFirst = ({title}) => {
  return (
    <View style={{}}>
      <OnBoardFirstSvg />
    </View>
  );
};

export default OnBoardFirst;

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
});
