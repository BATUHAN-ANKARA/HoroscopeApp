/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  FlatList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../components/Loader';

const Orders = ({navigation}) => {
  const [periode, setPeriode] = useState('Günlük');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      if (jsonValue === null) {
        setTimeout(() => {
          navigation.replace('OnBoard');
        }, 1000);
      } else {
        let parsed = JSON.parse(jsonValue);
        fetchData(parsed.userId);
      }
    } catch (e) {
      console.log(e);
    }
  };

  async function fetchData(id) {
    await axios
      .get(
        `https://bizimabla.herokuapp.com/api/v1/general/getOrderByUserSuccess?id=${id}`,
      )
      .then(function (response) {
        setOrders(response.data);
        setLoading(false);
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
            <Text style={styles.title}>Siparişlerim</Text>
            <View style={styles.headerButton}></View>
          </View>

          <View style={styles.body}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{marginTop: 10, paddingBottom: 20}}>
              <View style={{paddingBottom: 60, marginTop: 10}}>
                <FlatList
                  data={orders}
                  keyExtractor={item => item._id.toString()}
                  renderItem={({item}) => (
                    <TouchableOpacity style={styles.blogCard}>
                      <Text style={styles.dateText}>
                        {new Date(item.createdAt).toLocaleString('tr-TR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: 'numeric',
                          hourCycle: 'h23',
                        })}{' '}
                        Tarihli
                      </Text>
                      <Text style={styles.cardText}>
                        {' '}
                        {item.cost} TL Değerindeki{' '}
                        <Text style={styles.cardText}>
                          {item.product} Alımı
                        </Text>
                      </Text>
                    </TouchableOpacity>
                  )}
                />
                {orders[0] ? null : (
                  <Text style={styles.infoText}>
                    Henüz bir alışveriş yapmadınız. Cazip tekliflerimizi
                    değerlendirmek isteyebilirsiniz
                  </Text>
                )}
              </View>
            </ScrollView>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default Orders;

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
    color: '#fff',
    alignSelf: 'center',
    width: '90%',
    lineHeight: 20,
  },
  blogCard: {
    width: Dimensions.get('screen').width - 20,
    alignSelf: 'center',
    backgroundColor: '#0EA293',
    borderRadius: 10,
    justifyContent: 'center',
    marginBottom: 20,
    paddingVertical: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
  loading: {
    position: 'absolute',
    backgroundColor: '#333',
    width: '50%',
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.7,
    borderRadius: 12,
    alignSelf: 'center',
    top: 150,
    zIndex: 9,
  },
  loadingText: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 18,
    color: '#fff',
    lineHeight: 20,
    marginTop: 10,
  },
  dateText: {
    fontFamily: 'GothamRounded-Bold',
    fontSize: 14,
    color: '#fff',
    marginLeft: 10,
    lineHeight: 20,
  },
  cardText: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 14,
    color: '#fff',
    marginLeft: 10,
    lineHeight: 20,
  },
  infoText: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 15,
    color: '#333',
    textAlign: 'center',
    alignSelf: 'center',
    width: Dimensions.get('screen').width - 20,
    lineHeight: 23,
  },
});
