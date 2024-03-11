/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../components/Loader';

const CoffeContinue = ({navigation, route}) => {
  const [id, setId] = useState(route.params.coffeeId);
  const [userId, setUserId] = useState('');
  const [text, setText] = useState('');
  const [date, setDate] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    await axios
      .get(
        `https://bizimabla.herokuapp.com/api/v1/coffee/getCoffeeResult?id=${id}`,
      )
      .then(function (response) {
        setDate(
          new Date(response.data.uploadedAt).toLocaleString('tr-TR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: 'numeric',
            hourCycle: 'h23',
          }),
        );
        setText(response.data.result);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        Alert.alert(
          'Fal Yorumu',
          'Üzgünüz, yorumunuz yüklenemedi lütfen daha sonra tekrar deneyin.',
          [{text: 'Tamam', onPress: () => console.log('Ok Pressed')}],
        );
      });
  }

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      if (jsonValue === null) {
        setTimeout(() => {
          navigation.replace('OnBoard');
        }, 1000);
      } else {
        let parsed = JSON.parse(jsonValue);
        setUserId(parsed.userId);
        fetchData();
      }
    } catch (e) {
      console.log('Asenkron data error burç yorum ekranında=>', e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.headerButton}>
              <Ionicons name="chevron-back-outline" color="#000" size={25} />
            </TouchableOpacity>
            <Text style={styles.title}>Fal Durumu</Text>
            <View style={styles.headerButton}></View>
          </View>

          <View style={styles.body}>
            <ScrollView showsVerticalScrollIndicator={false} style={{}}>
              <View
                style={{
                  marginBottom: '10%',
                  paddingBottom: '15%',
                }}>
                <Text style={styles.blogTitle}>
                  Neyse Halin Çıksın Falın...
                </Text>
                <View style={styles.blogDateArea}>
                  <Ionicons name="calendar-outline" color="#73DBC8" size={25} />
                  <Text style={styles.dateText}>{date} Tarihli Falın</Text>
                </View>

                <Text style={styles.longText}>{text}</Text>
              </View>
            </ScrollView>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default CoffeContinue;

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
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    flex: 1,
    paddingHorizontal: 10,
  },
  title: {
    fontFamily: 'Gothamrounded-Bold',
    fontSize: 20,
    color: '#333',
    textAlign: 'center',
    alignSelf: 'center',
  },
  blogTitle: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 16,
    color: '#333',
    lineHeight: 20,
  },
  longText: {
    fontFamily: 'GothamRounded-Book',
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginTop: 10,
  },
  blogDateArea: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  dateText: {
    fontFamily: 'GothamRounded-Light',
    fontSize: 13,
    color: '#333',
    marginLeft: 5,
  },
});
