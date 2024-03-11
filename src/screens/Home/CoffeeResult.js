/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Alert,
  FlatList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AnimatedLottieView from 'lottie-react-native';
import CoffeeSvg from '../../../assets/svg/CoffeeSvg';
import Loader from '../../components/Loader';

const CoffeResult = ({navigation, route}) => {
  const [periode, setPeriode] = useState('Hazırlananlar');
  const [userId, setUserId] = useState('');
  const [continueCoffee, setContinueCoffee] = useState([]);
  const [finishedCoffee, setFinishedCoffee] = useState([]);
  const [loading, setLoading] = useState(true);

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
        setUserId(parsed.userId);
        fetchDataContinue(parsed);
        fetchDataFinished(parsed);
      }
    } catch (e) {
      console.log('Asenkron data error burç yorum ekranında=>', e);
    }
  };

  async function fetchDataContinue(parsed) {
    await axios
      .get(
        `https://bizimabla.herokuapp.com/api/v1/coffee/getCoffeeByUserContinue?id=${parsed.userId}`,
      )
      .then(function (response) {
        setContinueCoffee(response.data);
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

  async function fetchDataFinished(parsed) {
    await axios
      .get(
        `https://bizimabla.herokuapp.com/api/v1/coffee/getCoffeeByUserFinished?id=${parsed.userId}`,
      )
      .then(function (response) {
        setFinishedCoffee(response.data);
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

  useEffect(() => {
    getData();
  }, []);

  const renderItemFinished = ({item}) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('CoffeFinished', {coffeeId: item._id})}
      style={styles.card}>
      <View style={styles.img}>
        <CoffeeSvg />
      </View>
      <Text style={styles.dateText}>
        {new Date(item.uploadedAt).toLocaleString('tr-TR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: 'numeric',
          hourCycle: 'h23',
        })}{' '}
        - {item.status}
      </Text>
    </TouchableOpacity>
  );

  const renderItemContinue = ({item}) => (
    <TouchableOpacity
      onPress={() =>
        Alert.alert(
          'Fal Durumu',
          'Falınız şu an hazırlanıyor. Falınız hazır olduğunda size bildirim ileteceğiz.',
          [{text: 'Tamam', onPress: () => console.log('OK Pressed')}],
        )
      }
      style={styles.card}>
      <View style={styles.img}>
        <CoffeeSvg />
      </View>
      <Text style={styles.dateText}>
        {new Date(item.uploadedAt).toLocaleString('tr-TR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: 'numeric',
          hourCycle: 'h23',
        })}{' '}
        - {item.status}
      </Text>
    </TouchableOpacity>
  );

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
            <Text style={styles.title}>Fallarım</Text>
            <View style={styles.headerButton}></View>
          </View>

          <View style={styles.body}>
            <View style={styles.buttonsRow}>
              {periode === 'Hazırlananlar' ? (
                <TouchableOpacity
                  onPress={() => setPeriode('Hazırlananlar')}
                  style={{
                    ...styles.topButtons,
                    backgroundColor: '#73DBC8',
                    borderStyle: 'dashed',
                  }}>
                  <Text style={styles.periodeText}>Hazırlananlar</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => setPeriode('Hazırlananlar')}
                  style={styles.topButtons}>
                  <Text style={styles.periodeText}>Hazırlananlar</Text>
                </TouchableOpacity>
              )}
              {periode === 'Bitenler' ? (
                <TouchableOpacity
                  onPress={() => setPeriode('Bitenler')}
                  style={{
                    ...styles.topButtons,
                    backgroundColor: '#73DBC8',
                    borderStyle: 'dashed',
                  }}>
                  <Text style={styles.periodeText}>Bitenler</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => setPeriode('Bitenler')}
                  style={styles.topButtons}>
                  <Text style={styles.periodeText}>Bitenler</Text>
                </TouchableOpacity>
              )}
            </View>
            {periode === 'Bitenler' ? (
              <View>
                <FlatList
                  data={finishedCoffee}
                  renderItem={renderItemFinished}
                  keyExtractor={(item, index) => index.toString()}
                  style={{paddingBottom: '20%'}}
                />
                {finishedCoffee[0] ? null : (
                  <View>
                    <Text style={styles.infoText}>
                      Henüz bakımı biten bir falınız bulunmuyor.
                    </Text>
                    <AnimatedLottieView
                      style={{width: '90%', alignSelf: 'center'}}
                      source={require('../../../assets/animation/coffeewaiting.json')}
                      autoPlay
                      loop
                    />
                  </View>
                )}
              </View>
            ) : null}

            {periode === 'Hazırlananlar' ? (
              <View>
                <FlatList
                  data={continueCoffee}
                  renderItem={renderItemContinue}
                  keyExtractor={(item, index) => index.toString()}
                  style={{paddingBottom: '20%'}}
                />
                {continueCoffee[0] ? null : (
                  <View>
                    <Text style={styles.infoText}>
                      Henüz fal baktırmadınız. Falınızı yorumlamak için hazırız.
                    </Text>
                    <AnimatedLottieView
                      style={{width: '90%', alignSelf: 'center'}}
                      source={require('../../../assets/animation/ready_team.json')}
                      autoPlay
                      loop
                    />
                  </View>
                )}
              </View>
            ) : null}
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default CoffeResult;

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
  title: {
    fontFamily: 'Gothamrounded-Bold',
    fontSize: 20,
    color: '#333',
    textAlign: 'center',
    alignSelf: 'center',
  },
  body: {
    flex: 1,
  },
  topButtons: {
    width: (Dimensions.get('screen').width - 45) / 3,
    height: 45,
    backgroundColor: '#fff',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  buttonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingBottom: 10,
    width: Dimensions.get('screen').width - 20,
    alignSelf: 'center',
  },
  periodeText: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 15,
    color: '#333',
  },
  card: {
    backgroundColor: '#DEB9E2',
    marginTop: 20,
    width: Dimensions.get('screen').width - 20,
    alignSelf: 'center',
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  img: {
    width: 45,
    height: 45,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: '#fff',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 15,
    color: '#333',
  },
  infoText: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 15,
    color: '#333',
    textAlign: 'center',
    alignSelf: 'center',
    width: Dimensions.get('screen').width - 20,
    lineHeight: 23,
    marginTop: 20,
  },
});
