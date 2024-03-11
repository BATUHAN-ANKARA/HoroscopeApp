import React, {useRef, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from 'react-native';
import OnBoardFirst from '../../assets/svg/OnBoardFirstSvg';
import OnBoardSecond from '../../assets/svg/OnBoardSecondSvg';

const OnBoardScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1}}>
        <View style={{marginTop: '10%'}}>
          <OnBoardFirst />
        </View>

        <View style={{alignSelf: 'center', marginTop: 40}}>
          <OnBoardSecond />
        </View>

        <View style={{}}>
          <Text style={styles.mainText}>Burç Yorumları ve Fal</Text>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('AuthStack')}
          style={styles.button}>
          <Text style={styles.buttonText}>Başla</Text>
        </TouchableOpacity>

        <Text style={styles.version}>Version 1.0</Text>
      </View>
    </SafeAreaView>
  );
};

export default OnBoardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mainText: {
    alignSelf: 'center',
    marginTop: 30,
    fontFamily: 'GothamRounded-Book',
    fontSize: 15,
  },
  button: {
    height: 60,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#73DBC8',
    alignSelf: 'center',
    marginTop: 30,
    borderColor: '#222',
    borderWidth: 1,
    borderBottomWidth: 4,
    borderRightWidth: 4,
  },
  buttonText: {
    color: '#000',
    fontFamily: 'GothamRounded-Medium',
    fontSize: 15,
  },
  version: {
    alignSelf: 'center',
    fontFamily: 'GothamRounded-Book',
    fontSize: 15,
    position: 'absolute',
    bottom: '5%',
  },
});
