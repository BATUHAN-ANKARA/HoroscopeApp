/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../components/Loader';

const DiceResult = ({navigation, route}) => {
  const [total, setTotal] = useState(route.params.total);
  const [matchCount, setMatchCount] = useState(
    Math.floor(Math.random() * 20) + 1,
  );
  const [userId, setUserId] = useState(null);
  const [loader, setLoader] = useState(false);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      console.log('asenkronda kayıtlı ilgileri=>', jsonValue);
      if (jsonValue === null) {
        setTimeout(() => {
          navigation.replace('OnBoard');
        }, 1000);
      } else {
        let parsed = JSON.parse(jsonValue);
        setUserId(parsed.userId);
        setLoader(true);
      }
    } catch (e) {
      console.log('asenkron işlem hatası=>', e);
    }
  };

  async function fetchData() {
    await axios
      .post(`https://bizimabla.herokuapp.com/api/v1/dice/createDiceResult`, {
        userId: userId,
        diceResult: total,
      })
      .then(function (response) {
        console.log(response.data);
        navigation.navigate('DiceExplore', {result: total});
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerButton}></View>
        <Text style={styles.title}>Başla</Text>
        <View style={styles.headerButton}></View>
      </View>

      <View style={styles.body}>
        <View style={styles.infoArea}>
          <Text style={styles.largeText}>Zarların Toplamı</Text>
          <Text style={styles.totalText}>{total}</Text>
          <Text style={styles.largeText}>Toplam Eşleşme</Text>
          <Text style={styles.largeText}>{matchCount}</Text>
          <TouchableOpacity
            onPress={() => fetchData()}
            style={{
              ...styles.button,
              backgroundColor: '#FFEDED',
            }}>
            <Text style={{...styles.buttonText, color: '#FF6464'}}>Eşleş</Text>
            <Ionicons name="flame" color="#FF6464" size={25} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.button}>
            <Text style={styles.buttonText}>Zar At</Text>
            <Ionicons name="sync" color="#fff" size={25} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DiceResult;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 0.1,
  },
  headerButton: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Gothamrounded-Bold',
    fontSize: 20,
    color: '#333',
    textAlign: 'center',
    alignSelf: 'center',
  },
  body: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  infoArea: {
    flex: 0.9,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  button: {
    width: 200,
    height: 55,
    backgroundColor: '#3C2A8F',
    alignItems: 'center',
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  buttonText: {
    fontFamily: 'GothamRounded-Bold',
    fontSize: 20,
    color: '#fff',
    marginRight: 10,
  },
  largeText: {
    fontFamily: 'Gothamrounded-Book',
    fontSize: 20,
    color: '#333',
    lineHeight: 23,
  },
  totalText: {
    fontFamily: 'Gothamrounded-Bold',
    fontSize: 140,
    color: '#333',
  },
});
