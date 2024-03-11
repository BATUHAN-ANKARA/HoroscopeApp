/* eslint-disable react-hooks/exhaustive-deps */
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import React, {useEffect, useRef} from 'react';
import Logo from '../../assets/svg/Logo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Splash = ({navigation}) => {
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      console.log(jsonValue);
      if (jsonValue === null) {
        setTimeout(() => {
          navigation.replace('OnBoard');
        }, 1000);
      } else {
        let parsed = JSON.parse(jsonValue);
        navigation.replace('BottomTab');
      }
    } catch (e) {
      console.log('Splash error=>', e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <Logo />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
