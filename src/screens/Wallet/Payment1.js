/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AnimatedLottieView from 'lottie-react-native';
import {WebView} from 'react-native-webview';

const Payment1 = ({navigation, route}) => {
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [amount, setAmount] = useState(route.params.amount);
  const [cost, setCost] = useState(route.params.cost);
  const [orderStatus, setOrderStatus] = useState(null);
  const [userId, setUserId] = useState('');
  const [showWebView, setShowWebView] = useState(false);

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
      }
    } catch (e) {
      console.log(e);
    }
  };

  async function createOrder(type) {
    await axios
      .post(
        `https://bizimabla.herokuapp.com/api/v1/general/createOrder?id=${userId}`,
        {
          product: `${amount} Coin`,
          cost: cost,
        },
      )
      .then(function (response) {
        console.log(response.data);
        setOrderStatus(response.data.status);
        if (type === 1) {
          setTimeout(() => {
            orderSuccess(response.data._id);
          }, 1500);
        } else {
          setTimeout(() => {
            setOrderStatus(-1);
            orderFail(response.data._id);
          }, 1500);
        }
      })
      .catch(function (error) {
        console.log('ödeme ekranı fetch data hatası=>', error);
      });
  }

  async function orderSuccess(id) {
    await axios
      .put(
        `https://bizimabla.herokuapp.com/api/v1/general/orderSuccess?id=${id}`,
      )
      .then(function (response) {
        purchaseCoin(amount);
        setOrderStatus(response.data);
        setPaymentStatus(1);
      })
      .catch(function (error) {
        console.log('ödeme ekranı fetch data hatası=>', error);
      });
  }

  async function purchaseCoin(amount) {
    await axios
      .put(
        `https://bizimabla.herokuapp.com/api/v1/general/purchaseCoin?id=${userId}`,
        {
          coinAmount: amount,
        },
      )
      .then(function (response) {
        console.log('satın alma=>', response.data);
        setOrderStatus(1);
      })
      .catch(function (error) {
        console.log('ödeme ekranı fetch data hatası=>', error);
      });
  }

  async function orderFail(id) {
    await axios
      .put(`https://bizimabla.herokuapp.com/api/v1/general/orderFail?id=${id}`)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log('ödeme ekranı fetch data hatası=>', error);
      });
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {orderStatus === -1 ? (
        <AnimatedLottieView
          source={require('../../../assets/animation/fail.json')}
          autoPlay={true}
          loop={false}
          style={{position: 'absolute', zIndex: 9}}
          onAnimationFinish={() =>
            setTimeout(() => {
              navigation.goBack();
            }, 1800)
          }
          speed={0.7}
        />
      ) : null}

      {paymentStatus === 1 ? (
        <AnimatedLottieView
          source={require('../../../assets/animation/payment_success.json')}
          autoPlay={true}
          loop={false}
          style={{position: 'absolute', zIndex: 9}}
          onAnimationFinish={() =>
            setTimeout(() => {
              navigation.replace('ProfileStack', {screen: 'Orders'});
            }, 1800)
          }
          speed={0.7}
        />
      ) : null}

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.headerButton}>
          <Ionicons name="chevron-back-outline" color="#000" size={25} />
        </TouchableOpacity>
        <Text style={styles.title}>Ödeme</Text>
        <View style={styles.headerButton}></View>
      </View>

      <View style={styles.body}>
        <Text style={styles.welcomeText}>
          Ödeme talebiniz bankanız tarafından onaylandkıktan sonra işleminiz
          başarılı olacaktır. Hesabınızdaki Coin miktarını cüzdan bölümünden
          kontrol edebilirsiniz.
        </Text>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Sipariş Özeti</Text>
          <View style={styles.cell}>
            <Text style={styles.summaryCardAmount}>{amount} Coin</Text>
            <Text style={styles.summaryCardCost}>{cost} TL</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.summaryCardMethod}>Ödeme Yöntemi</Text>
            <Text style={styles.summaryCardMethodDetail}>Kredi Kartı</Text>
          </View>
        </View>

        <TouchableOpacity onPress={() => createOrder(1)} style={styles.button}>
          <Text style={styles.buttonText}>Ödeme Yap</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Payment1;

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
    paddingHorizontal: 10,
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
  welcomeText: {
    fontFamily: 'GothamRounded-Book',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    color: '#333',
    padding: 10,
  },
  button: {
    marginTop: 20,
    width: '50%',
    backgroundColor: '#000',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    alignSelf: 'center',
  },
  buttonText: {
    fontFamily: 'GothamRounded-Bold',
    fontSize: 18,
    color: '#fff',
  },
  summaryCardAmount: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 14,
  },
  summaryCardCost: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 14,
  },
  summaryCardMethod: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 14,
  },
  summaryCardMethodDetail: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 14,
  },
  summaryCard: {
    width: Dimensions.get('screen').width - 20,
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: '#E4DCCF',
    height: null,
    marginTop: 50,
    paddingVertical: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  summaryTitle: {
    alignSelf: 'center',
    fontFamily: 'GothamRounded-Medium',
    fontSize: 15,
    paddingBottom: 10,
  },
  cell: {
    width: '100%',
    padding: 10,
    borderTopColor: '#ccc',
    borderTopWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
