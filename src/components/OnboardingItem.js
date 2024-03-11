import {StyleSheet, Text, View, Image, useWindowDimensions} from 'react-native';
import React from 'react';
import OnBoardFirst from './OnBoardFirst';
import OnBoradSecond from './OnBoradSecond';
import OnBoardThird from './OnBoardThird';

const OnboardingItem = ({item}) => {
  const {width} = useWindowDimensions();
  return (
    <View style={[styles.container, {width}]}>
      {item.id === '1' ? <OnBoardFirst /> : null}
      {item.id === '2' ? <OnBoradSecond /> : null}
      {item.id === '3' ? <OnBoardThird /> : null}
    </View>
  );
};

export default OnboardingItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    flex: 0.7,
    justifyContent: 'center',
  },
  title: {
    fontWeight: '800',
    fontSize: 28,
    marginTop: 30,
  },
});
