/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import Loader from '../../components/Loader';
import AnimatedLottieView from 'lottie-react-native';

const Home = ({navigation}) => {
  const [name, setName] = useState('');
  const [zodiacName, setZodiacName] = useState('');
  const [userParsed, setUserParsed] = useState(null);
  const [image, setImage] = useState(null);
  const [coins, setCoins] = useState(null);
  const [show, setShow] = useState(true);
  const [loader, setLoader] = useState(false);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const date = new Date();
    const hour = date.getUTCHours() + 3; // Türkiye saatine göre ayarla
    if (hour < 12) {
      setGreeting('Günaydın');
    } else if (hour >= 12 && hour < 17) {
      setGreeting('İyi Günler');
    } else if (hour >= 17 && hour < 24) {
      setGreeting('İyi Akşamlar');
    } else {
      setGreeting('İyi Geceler');
    }
  }, []);

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
        setUserParsed(parsed);
        fetchData(parsed);
      }
    } catch (e) {
      console.log('asenkron işlem hatası=>', e);
    }
  };

  async function fetchData(parsed) {
    setLoader(true);
    await axios
      .get(
        `https://bizimabla.herokuapp.com/api/v1/profile/getUser/${parsed.userId}`,
      )
      .then(function (response) {
        if (response.data.data.avatar) {
          setImage(response.data.data.avatar);
        }
        setName(response.data.data.name);
        setZodiacName(response.data.data.zodiac);
        setCoins(response.data.data.coins);
        setTimeout(() => {
          setLoader(false);
        }, 1700);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useFocusEffect(
    React.useCallback(() => {
      getData();
      return () => {
        // Burada temizleme işlemleri yapabilirsiniz
      };
    }, []),
  );

  const pressClose = () => {
    setShow(false);
    setTimeout(() => {
      setShow(true);
    }, 20000);
  };

  const next = () => {
    setLoader(true);
    setTimeout(() => {
      navigation.navigate('WalletStack');
    }, 700);
  };

  return (
    <SafeAreaView style={styles.container}>
      {loader ? (
        <Loader />
      ) : (
        <>
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              {image != null || image === '' ? (
                <View style={styles.avatar}>
                  <Image source={{uri: image}} style={styles.avatarImg} />
                </View>
              ) : (
                <AnimatedLottieView
                  source={require('../../../assets/animation/avatar.json')}
                  style={{width: 60}}
                  autoPlay
                  loop
                  speed={0.6}
                />
              )}

              <View style={{marginLeft: 10}}>
                <Text style={styles.lightText}>{greeting}</Text>
                <View style={styles.row}>
                  <Text style={styles.boldText}>
                    Hoşgeldin, <Text style={styles.boldText}>{name}</Text>
                  </Text>
                </View>
              </View>
            </View>

            <TouchableOpacity style={styles.row} onPress={() => next()}>
              <Text style={styles.coin}>{coins}</Text>
              <AnimatedLottieView
                source={require('../../../assets/animation/coin.json')}
                style={{width: 50}}
                autoPlay
                loop
              />
            </TouchableOpacity>
          </View>

          <View style={styles.body}>
            {coins === 0 && show === true ? (
              <View style={styles.walletInfo}>
                <TouchableOpacity
                  onPress={() => pressClose()}
                  style={styles.infoCloseButton}>
                  <Ionicons name="close-circle" color="#fff" size={25} />
                </TouchableOpacity>
                <Text style={styles.walletInfoText}>
                  Hesabınızda hiç coin kalmadı. Cazip paketlerimizden
                  faydalanarak coin satın alabilirsiniz.
                </Text>

                <TouchableOpacity
                  onPress={() => navigation.navigate('WalletStack')}
                  style={styles.walletInfoButton}>
                  <Text style={styles.walletInfoButtonText}>Coin Al</Text>
                </TouchableOpacity>
              </View>
            ) : null}

            <ScrollView showsVerticalScrollIndicator={false} style={{}}>
              <View style={{marginBottom: '8%'}}>
                <View style={styles.cardArea}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Discover')}
                    activeOpacity={0.6}
                    style={styles.card1}>
                    <Text style={styles.cardText}>Sosyalleş</Text>
                    <AnimatedLottieView
                      style={{width: '90%'}}
                      source={require('../../../assets/animation/social.json')}
                      autoPlay
                      loop
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => navigation.navigate('ZodiacRelationship')}
                    style={styles.card2}>
                    <Text style={styles.cardText}>Burç Uyumu</Text>
                    <AnimatedLottieView
                      style={{width: '90%'}}
                      source={require('../../../assets/animation/zodiacrelationship.json')}
                      autoPlay
                      loop
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.cardArea}>
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => navigation.navigate('Tarot')}
                    style={styles.card3}>
                    <Text style={styles.cardText}>Tarot</Text>
                    <AnimatedLottieView
                      style={{width: '100%'}}
                      source={require('../../../assets/animation/tarot.json')}
                      autoPlay
                      loop
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => navigation.navigate('Blog')}
                    style={styles.card4}>
                    <Text style={styles.cardText}>Astro Blog</Text>
                    <AnimatedLottieView
                      style={{width: '90%'}}
                      source={require('../../../assets/animation/blog.json')}
                      autoPlay
                      loop
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.cardArea}>
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() =>
                      navigation.navigate('ZodiacDetail', {
                        zodiacName: zodiacName,
                      })
                    }
                    style={styles.card5}>
                    <Text style={styles.cardText}>Burç Yorumun</Text>
                    <AnimatedLottieView
                      style={{width: '90%'}}
                      source={require('../../../assets/animation/zodiac.json')}
                      autoPlay
                      loop
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => navigation.navigate('CoffeeImageUpload')}
                    style={styles.card6}>
                    <Text style={styles.cardText}>Kahve Falı</Text>
                    <AnimatedLottieView
                      style={{width: '80%'}}
                      source={require('../../../assets/animation/coffee.json')}
                      autoPlay
                      loop
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backgroundVideo: {
    height: Dimensions.get('screen').height,
    position: 'absolute',
    top: 0,
    left: 0,
    alignItems: 'stretch',
    bottom: 0,
    right: 0,
    opacity: 0.7,
  },
  header: {
    flex: 0.12,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 0.8,
  },
  avatar: {
    width: 65,
    height: 65,
    borderRadius: 99,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFD29E',
    borderWidth: 1,
  },
  avatarImg: {
    height: 65,
    width: 65,
    borderRadius: 99,
    borderWidth: 1,
  },
  profileButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#73DBC8',
    borderRadius: 12,
    marginLeft: 10,
    padding: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderStyle: 'dashed',
    width: 200,
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  body: {
    flex: 1,
  },
  mainText: {
    alignSelf: 'center',
    fontFamily: 'GothamRounded-Book',
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    marginVertical: 15,
  },
  cardArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 10,
  },
  card1: {
    width: (Dimensions.get('screen').width - 35) / 2,
    height: 250,
    backgroundColor: '#FFC8A9',
    borderRadius: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  card2: {
    width: (Dimensions.get('screen').width - 35) / 2,
    height: 250,
    backgroundColor: '#9789D4',
    borderRadius: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  card3: {
    width: (Dimensions.get('screen').width - 35) / 2,
    height: 250,
    backgroundColor: '#FFD29E',
    borderRadius: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  card4: {
    width: (Dimensions.get('screen').width - 35) / 2,
    height: 250,
    backgroundColor: '#70C8DC',
    borderRadius: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  card5: {
    width: (Dimensions.get('screen').width - 35) / 2,
    height: 250,
    backgroundColor: '#DEB9E2',
    borderRadius: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  card6: {
    width: (Dimensions.get('screen').width - 35) / 2,
    height: 250,
    backgroundColor: '#E5B7B7',
    borderRadius: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  cardText: {
    fontFamily: 'GothamRounded-Bold',
    fontSize: 16,
    color: '#fff',
  },
  lightText: {
    fontFamily: 'GothamRounded-Light',
    fontSize: 14,
  },
  boldText: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 14,
    width: 250,
    lineHeight: 20,
  },
  coin: {
    fontFamily: 'GothamRounded-Bold',
    fontSize: 14,
    color: '#333',
    alignSelf: 'center',
    marginRight: 3,
  },
  warningText: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 14,
    color: '#333',
  },
  walletInfo: {
    position: 'absolute',
    zIndex: 9,
    paddingHorizontal: 10,
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: '#FA9884',
    marginTop: 30,
  },
  walletInfoText: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 15,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 23,
  },
  walletInfoButton: {
    width: '50%',
    height: 40,
    backgroundColor: '#FFE5CA',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 10,
  },
  walletInfoButtonText: {
    fontFamily: 'GothamRounded-Bold',
    fontSize: 15,
    color: '#333',
    textAlign: 'center',
    lineHeight: 23,
  },
  infoCloseButton: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 2,
    top: 0,
    zIndex: 1,
  },
});
