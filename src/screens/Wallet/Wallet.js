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
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AnimatedLottieView from 'lottie-react-native';
import {useFocusEffect} from '@react-navigation/native';
import Loader from '../../components/Loader';
import LinearGradient from 'react-native-linear-gradient';

const Wallet = ({navigation}) => {
  const [offer, setOffer] = useState(null);
  const [amount, setAmount] = useState(null);
  const [cost, setCost] = useState(null);
  const [balance, setBalance] = useState(null);
  const [loader, setLoader] = useState(false);

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
      .get(`https://bizimabla.herokuapp.com/api/v1/profile/getUser/${id}`)
      .then(function (response) {
        setBalance(response.data.data.coins);
      })
      .catch(function (error) {
        console.log('profil ekranı fetch data hatası=>', error);
      });
  }

  const next = () => {
    setLoader(true);
    setTimeout(() => {
      navigation.navigate('Payment1', {amount: amount, cost: cost});
    }, 1500);
  };

  useFocusEffect(
    React.useCallback(() => {
      getData();
      return () => {
        // Burada temizleme işlemleri yapabilirsiniz
      };
    }, []),
  );

  const choose = id => {
    if (id === 1) {
      setOffer(1);
      setCost(10);
      setAmount(1000);
      setLoader(true);
      setTimeout(() => {
        navigation.navigate('Payment1', {amount: 1000, cost: 10});
      }, 1500);
    } else if (id === 2) {
      setOffer(2);
      setCost(49);
      setAmount(5000);
      setLoader(true);
      setTimeout(() => {
        navigation.navigate('Payment1', {amount: 5000, cost: 49});
      }, 1500);
    } else if (id === 3) {
      setOffer(3);
      setCost(95);
      setAmount(10000);
      setLoader(true);
      setTimeout(() => {
        navigation.navigate('Payment1', {amount: 10000, cost: 95});
      }, 1500);
    } else if (id === 4) {
      setOffer(4);
      setCost(180);
      setAmount(20000);
      setLoader(true);
      setTimeout(() => {
        navigation.navigate('Payment1', {amount: 20000, cost: 180});
      }, 1500);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {loader ? <Loader /> : null}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.headerButton}>
          <Ionicons name="chevron-back-outline" color="#000" size={25} />
        </TouchableOpacity>
        <Text style={styles.title}>Cüzdan</Text>
        <View style={styles.headerButton}></View>
      </View>

      <View style={styles.body}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{paddingBottom: 80}}>
          <Text style={styles.walletText}>Cüzdanımdaki Coin Miktarı</Text>

          <Text style={styles.welcomeText}>
            Fal zevkiniz hiç bitmesin. Sınırlı bir süreliğine geçerli muhteşem
            tekliflerden birini seçerek uygulamayı kullanmaya devam edin.
          </Text>

          <Text style={styles.largeCoinText}>{balance} Coin</Text>

          <View style={styles.cardArea}>
            {offer === 1 ? (
              <TouchableOpacity
                onPress={() => choose(1)}
                style={{...styles.card, backgroundColor: '#CEEDC7'}}>
                <View style={{marginTop: 10}}>
                  <Text style={{...styles.cardText, color: '#333'}}>
                    1.000{' '}
                    <Text style={{...styles.coinText, color: '#FF8400'}}>
                      Coin
                    </Text>
                  </Text>
                  <Text style={{...styles.cardText, color: '#333'}}>
                    10 <Text style={styles.moneyText}>TL</Text>
                  </Text>
                </View>

                <AnimatedLottieView
                  style={{width: '60%'}}
                  source={require('../../../assets/animation/money.json')}
                  autoPlay
                  loop
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => choose(1)} style={styles.card}>
                <View style={{marginTop: 10}}>
                  <Text style={styles.cardText}>
                    1.000 <Text style={styles.coinText}>Coin</Text>
                  </Text>
                  <Text style={styles.cardText}>
                    10 <Text style={styles.moneyText}>TL</Text>
                  </Text>
                </View>

                <AnimatedLottieView
                  style={{width: '60%'}}
                  source={require('../../../assets/animation/money.json')}
                  autoPlay
                  loop
                />
              </TouchableOpacity>
            )}

            {offer === 2 ? (
              <TouchableOpacity
                onPress={() => choose(2)}
                style={{...styles.card, backgroundColor: '#CEEDC7'}}>
                <View style={{marginTop: 10}}>
                  <Text style={{...styles.cardText, color: '#333'}}>
                    5.000{' '}
                    <Text style={{...styles.coinText, color: '#FF8400'}}>
                      Coin
                    </Text>
                  </Text>
                  <Text style={{...styles.cardText, color: '#333'}}>
                    49 <Text style={styles.moneyText}>TL</Text>
                  </Text>
                </View>

                <AnimatedLottieView
                  style={{width: '60%'}}
                  source={require('../../../assets/animation/money.json')}
                  autoPlay
                  loop
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => choose(2)} style={styles.card}>
                <View style={{marginTop: 10}}>
                  <Text style={styles.cardText}>
                    5.000 <Text style={styles.coinText}>Coin</Text>
                  </Text>
                  <Text style={styles.cardText}>
                    49 <Text style={styles.moneyText}>TL</Text>
                  </Text>
                </View>

                <AnimatedLottieView
                  style={{width: '60%'}}
                  source={require('../../../assets/animation/money.json')}
                  autoPlay
                  loop
                />
              </TouchableOpacity>
            )}

            {offer === 3 ? (
              <TouchableOpacity
                onPress={() => choose(3)}
                style={{...styles.card, backgroundColor: '#CEEDC7'}}>
                <View style={{marginTop: 10}}>
                  <Text style={{...styles.cardText, color: '#333'}}>
                    10.000{' '}
                    <Text style={{...styles.coinText, color: '#FF8400'}}>
                      Coin
                    </Text>
                  </Text>
                  <Text style={{...styles.cardText, color: '#333'}}>
                    95 <Text style={styles.moneyText}>TL</Text>
                  </Text>
                </View>

                <AnimatedLottieView
                  style={{width: '60%'}}
                  source={require('../../../assets/animation/money.json')}
                  autoPlay
                  loop
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => choose(3)} style={styles.card}>
                <View style={{marginTop: 10}}>
                  <Text style={styles.cardText}>
                    10.000 <Text style={styles.coinText}>Coin</Text>
                  </Text>
                  <Text style={styles.cardText}>
                    95 <Text style={styles.moneyText}>TL</Text>
                  </Text>
                </View>

                <AnimatedLottieView
                  style={{width: '60%'}}
                  source={require('../../../assets/animation/money.json')}
                  autoPlay
                  loop
                />
              </TouchableOpacity>
            )}

            {offer === 4 ? (
              <TouchableOpacity
                onPress={() => choose(4)}
                style={{...styles.card, backgroundColor: '#CEEDC7'}}>
                <View style={{marginTop: 10}}>
                  <Text style={{...styles.cardText, color: '#333'}}>
                    20.000{' '}
                    <Text style={{...styles.coinText, color: '#FF8400'}}>
                      Coin
                    </Text>
                  </Text>
                  <Text style={{...styles.cardText, color: '#333'}}>
                    180 <Text style={styles.moneyText}>TL</Text>
                  </Text>
                </View>

                <AnimatedLottieView
                  style={{width: '60%'}}
                  source={require('../../../assets/animation/money.json')}
                  autoPlay
                  loop
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => choose(4)} style={styles.card}>
                <View style={{marginTop: 10}}>
                  <Text style={styles.cardText}>
                    20.000 <Text style={styles.coinText}>Coin</Text>
                  </Text>
                  <Text style={styles.cardText}>
                    180 <Text style={styles.moneyText}>TL</Text>
                  </Text>
                </View>

                <AnimatedLottieView
                  style={{width: '60%'}}
                  source={require('../../../assets/animation/money.json')}
                  autoPlay
                  loop
                />
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Wallet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  linearGradient: {
    padding: 20,
    width: null,
    height: null,
    alignSelf: 'center',
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
  card: {
    width: 150,
    height: 150,
    backgroundColor: '#576CBC',
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
  cardArea: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  cardText: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 15,
    color: '#fff',
    lineHeight: 20,
  },
  coinText: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 15,
    color: '#FFD93D',
  },
  moneyText: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 15,
    color: '#54B435',
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
  button: {
    width: '40%',
    height: 40,
    backgroundColor: '#03C988',
    alignSelf: 'center',
    borderRadius: 30,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  buttonText: {
    fontFamily: 'GothamRounded-Bold',
    fontSize: 16,
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
  walletCoinText: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 15,
    color: '#333',
    textAlign: 'center',
  },
  walletText: {
    fontFamily: 'GothamRounded-Book',
    fontSize: 15,
    color: '#333',
    paddingHorizontal: 10,
    textAlign: 'center',
  },
  largeCoinText: {
    fontFamily: 'GothamRounded-Bold',
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 10,
    color: '#F94A29',
  },
});
