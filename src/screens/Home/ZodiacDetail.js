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
  ActivityIndicator,
  Alert,
  Share,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Virgo from '../../../assets/svg/Horoscopes/Virgo';
import Taurus from '../../../assets/svg/Horoscopes/Taurus';
import Scorpio from '../../../assets/svg/Horoscopes/Scorpio';
import Sagittarius from '../../../assets/svg/Horoscopes/Sagittarius';
import Pisces from '../../../assets/svg/Horoscopes/Pisces';
import Libra from '../../../assets/svg/Horoscopes/Libra';
import Leo from '../../../assets/svg/Horoscopes/Leo';
import Capricorn from '../../../assets/svg/Horoscopes/Capricorn';
import Cancer from '../../../assets/svg/Horoscopes/Cancer';
import Aries from '../../../assets/svg/Horoscopes/Aries';
import Aquarius from '../../../assets/svg/Horoscopes/Aquarius';
import AnimatedLottieView from 'lottie-react-native';
import Loader from '../../components/Loader';

const ZodiacDetail = ({navigation, route}) => {
  const [periode, setPeriode] = useState('Günlük');
  const [zodiac, setZodiac] = useState(route.params.zodiacName);
  const [zodiacDaily, setZodiacDaily] = useState('');
  const [zodiacWeekly, setZodiacWeekly] = useState('');
  const [zodiacMonthly, setZodiacMonthly] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState('');
  const [liked, setLiked] = useState(false);
  const [dailyId, setDailyID] = useState(null);
  const [weeklyId, setWeeklyID] = useState(null);
  const [monthlyID, setMonthlyID] = useState(null);

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
        fetchData(parsed);
      }
    } catch (e) {
      console.log('Asenkron data error burç yorum ekranında=>', e);
    }
  };

  async function fetchData(parsed) {
    await axios
      .get(
        `https://bizimabla.herokuapp.com/api/v1/profile/getUser/${parsed.userId}`,
      )
      .then(function (response) {
        if (zodiac === 'Oğlak') {
          getHoroscope('oglak');
          setStart('22 Aralık');
          setEnd('19 Ocak');
        } else if (zodiac === 'Balık') {
          getHoroscope('balik');
          setStart('19 Şubat');
          setEnd('!20 Mart');
        } else if (zodiac === 'Koç') {
          getHoroscope('koc');
          setStart('21 Mart');
          setEnd('20 Nisan');
        } else if (zodiac === 'Kova') {
          getHoroscope('kova');
          setStart('20 Ocak');
          setEnd('18 Şubat');
        } else if (zodiac === 'Terazi') {
          getHoroscope('terazi');
          setStart('23 Eylül');
          setEnd('22 Ekim');
        } else if (zodiac === 'İkizler') {
          getHoroscope('ikizler');
          setStart('21 Mayıs');
          setEnd('21 Haziran');
        } else if (zodiac === 'Yay') {
          getHoroscope('yay');
          setStart('23 Kasım');
          setEnd('21 Aralık');
        } else if (zodiac === 'Başak') {
          getHoroscope('basak');
          setStart('23 Ağustos');
          setEnd('22 Eylül');
        } else if (zodiac === 'Yengeç') {
          getHoroscope('yengec');
          setStart('21 Haziran');
          setEnd('22 Temmuz');
        } else if (zodiac === 'Aslan') {
          getHoroscope('aslan');
          setStart('23 Temmuz');
          setEnd('22 Ağustos');
        } else if (zodiac === 'Akrep') {
          getHoroscope('akrep');
          setStart('23 Ekim');
          setEnd('22 Kasım');
        } else if (zodiac === 'Boğa') {
          getHoroscope('boga');
          setStart('21 Nisan');
          setEnd('20 Mayıs');
        }
      })
      .catch(function (error) {
        console.log(error);
        Alert.alert(
          'Burç Yorumu',
          'Üzgünüz, yorumunuz yüklenemedi lütfen daha sonra tekrar deneyin.',
          [{text: 'Tamam', onPress: () => console.log('Ok Pressed')}],
        );
      });
  }

  async function getHoroscope(horoscopeName) {
    console.log(horoscopeName);
    await axios
      .get(
        `https://bizimabla.herokuapp.com/api/v1/zodiac/getDaily?horoscopeName=${horoscopeName}`,
      )
      .then(function (response) {
        setZodiacDaily(response.data.data.text);
        setDailyID(response.data.data._id);
      })
      .catch(function (error) {
        console.log(error);
      });
    await axios
      .get(
        `https://bizimabla.herokuapp.com/api/v1/zodiac/getWeekly?horoscopeName=${horoscopeName}`,
      )
      .then(function (response) {
        setZodiacWeekly(response.data.data.text);
        setWeeklyID(response.data.data._id);
      })
      .catch(function (error) {
        console.log('1=>', error);
      });
    await axios
      .get(
        `https://bizimabla.herokuapp.com/api/v1/zodiac/getMonthly?horoscopeName=${horoscopeName}`,
      )
      .then(function (response) {
        setZodiacMonthly(response.data.data.text);
        setMonthlyID(response.data.data._id);
        setLoading(false);
      })
      .catch(function (error) {
        console.log('2=>', error);
      });
  }

  async function likePost(text, periode, id) {
    await axios
      .post('https://bizimabla.herokuapp.com/api/v1/general/likePost', {
        title: periode + ' Burç Yorumunuz',
        text: text,
        user: userId,
        postId: id,
      })
      .then(function (response) {
        setLiked(true);
      })
      .catch(function (error) {
        Alert.alert('Yorum Beğeni', 'Bu yorumu zaten beğendiniz.', [
          {text: 'Tamam', onPress: () => console.log('Ok Pressed')},
        ]);
        console.log(error);
      });
  }

  const controlPeriode = () => {
    if (periode === 'Günlük') {
      likePost(zodiacDaily, periode, dailyId);
    } else if (periode === 'Haftalık') {
      likePost(zodiacWeekly, periode, weeklyId);
    } else {
      likePost(zodiacMonthly, periode, monthlyID);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: messageS,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Shared with activity type:', result.activityType);
        } else {
          console.log('Shared');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Dismissed');
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  let messageS;

  const handleAlertSelection = () => {
    switch (periode) {
      case 'Günlük':
        messageS = zodiacDaily;
        break;
      case 'Haftalık':
        messageS = zodiacWeekly;
        break;
      case 'Aylık':
        messageS = zodiacMonthly;
        break;
      default:
        messageS = 'Invalid selection';
    }
    Alert.alert(
      'Burç Yorumu Paylaş',
      `${periode} burç yorumunu paylaş.`,
      [
        {
          text: 'Vazgeç',
          style: 'cancel',
        },
        {
          text: 'Paylaş',
          onPress: handleShare,
        },
      ],
      {cancelable: false},
    );
  };

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
            <Text style={styles.title}>Burç Yorumun</Text>
            <View style={styles.headerButton}></View>
          </View>

          <View style={styles.body}>
            <View style={styles.buttonsRow}>
              {periode === 'Günlük' ? (
                <TouchableOpacity
                  onPress={() => setPeriode('Günlük')}
                  style={{
                    ...styles.topButtons,
                    backgroundColor: '#73DBC8',
                    borderStyle: 'dashed',
                  }}>
                  <Text style={styles.periodeText}>Günlük</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => setPeriode('Günlük')}
                  style={styles.topButtons}>
                  <Text style={styles.periodeText}>Günlük</Text>
                </TouchableOpacity>
              )}

              {periode === 'Haftalık' ? (
                <TouchableOpacity
                  onPress={() => setPeriode('Haftalık')}
                  style={{
                    ...styles.topButtons,
                    backgroundColor: '#73DBC8',
                    borderStyle: 'dashed',
                  }}>
                  <Text style={styles.periodeText}>Haftalık</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => setPeriode('Haftalık')}
                  style={styles.topButtons}>
                  <Text style={styles.periodeText}>Haftalık</Text>
                </TouchableOpacity>
              )}

              {periode === 'Aylık' ? (
                <TouchableOpacity
                  onPress={() => setPeriode('Aylık')}
                  style={{
                    ...styles.topButtons,
                    backgroundColor: '#73DBC8',
                    borderStyle: 'dashed',
                  }}>
                  <Text style={styles.periodeText}>Aylık</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => setPeriode('Aylık')}
                  style={styles.topButtons}>
                  <Text style={styles.periodeText}>Aylık</Text>
                </TouchableOpacity>
              )}
            </View>

            {liked && (
              <AnimatedLottieView
                source={require('../../../assets/animation/like.json')}
                autoPlay={true}
                loop={false}
                style={{position: 'absolute', zIndex: 9}}
                onAnimationFinish={() => setLiked(false)}
                speed={0.7}
              />
            )}

            <ScrollView
              style={{padding: 10}}
              showsVerticalScrollIndicator={false}>
              <View
                style={{
                  marginBottom: '10%',
                  paddingBottom: '15%',
                }}>
                <View style={styles.card}>
                  {zodiac === 'Aslan' ? <Leo /> : null}
                  {zodiac === 'Kova' ? <Aquarius /> : null}
                  {zodiac === 'Koç' ? <Aries /> : null}
                  {zodiac === 'Yengeç' ? <Cancer /> : null}
                  {zodiac === 'Oğlak' ? <Capricorn /> : null}
                  {zodiac === 'Boğa' ? <Taurus /> : null}
                  {zodiac === 'Yay' ? <Sagittarius /> : null}
                  {zodiac === 'Akrep' ? <Scorpio /> : null}
                  {zodiac === 'Balık' ? <Pisces /> : null}
                  {zodiac === 'Başak' ? <Virgo /> : null}
                  {zodiac === 'Terazi' ? <Libra /> : null}
                </View>

                <Text style={styles.zodiacName}>{zodiac} Burcu</Text>
                <Text style={styles.zodiacMonth}>
                  {start} - {end}
                </Text>
                <Text style={styles.scrollTopText}>Günlük Burç Yorumunuz</Text>
                {periode === 'Günlük' ? (
                  <Text style={styles.longText}>{zodiacDaily}</Text>
                ) : null}
                {periode === 'Haftalık' ? (
                  <Text style={styles.longText}>{zodiacWeekly}</Text>
                ) : null}
                {periode === 'Aylık' ? (
                  <Text style={styles.longText}>{zodiacMonthly}</Text>
                ) : null}
              </View>
            </ScrollView>
          </View>

          <View style={styles.bottomButtonArea}>
            <TouchableOpacity
              onPress={() => controlPeriode()}
              style={styles.bottomButton}>
              <Text style={styles.buttonText}>Beğen</Text>
              <Ionicons name="thumbs-up-outline" color="#fff" size={20} />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                ...styles.bottomButton,
                backgroundColor: '#E5B7B7',
              }}
              onPress={() => handleAlertSelection()}>
              <Text style={styles.buttonText}>Paylaş</Text>
              <Ionicons name="share-social-outline" color="#fff" size={20} />
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default ZodiacDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loaderStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
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
    justifyContent: 'space-between',
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
    width: 270,
    height: 180,
    backgroundColor: '#DEB9E2',
    borderRadius: 20,
    borderWidth: 1,
    alignSelf: 'center',
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  zodiacName: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 20,
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 20,
    color: '#333',
  },
  zodiacMonth: {
    fontFamily: 'GothamRounded-Light',
    fontSize: 13,
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: 10,
    color: '#333',
  },
  scrollTopText: {
    fontFamily: 'GothamRounded-Book',
    fontSize: 16,
    color: '#333',
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 10,
  },
  bottomButtonArea: {
    position: 'absolute',
    bottom: '10%',
    width: '70%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomButton: {
    width: '48%',
    height: 60,
    backgroundColor: '#70C8DC',
    borderRadius: 15,
    borderWidth: 1,
    borderRightWidth: 4,
    borderBottomWidth: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 15,
    fontFamily: 'GothamRounded-Medium',
    color: '#fff',
    marginRight: 10,
  },
  longText: {
    fontFamily: 'GothamRounded-Book',
    fontSize: 14,
    color: '#333',
    textAlign: 'left',
    lineHeight: 20,
    marginTop: 10,
    paddingBottom: '20%',
  },
  loading: {
    position: 'absolute',
    backgroundColor: '#333',
    width: '50%',
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.7,
    borderRadius: 12,
    alignSelf: 'center',
    top: 150,
  },
  loadingText: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 18,
    color: '#fff',
    lineHeight: 20,
    marginTop: 10,
  },
});
