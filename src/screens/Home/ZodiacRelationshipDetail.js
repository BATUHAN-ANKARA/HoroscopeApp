/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Share,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
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
import Gemini from '../../../assets/svg/Horoscopes/Gemini';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AnimatedLottieView from 'lottie-react-native';
import Loader from '../../components/Loader';
import * as Progress from 'react-native-progress';

const ZodiacRelationshipDetail = ({navigation, route}) => {
  let zodiac1 = route.params.zodiac1;
  let zodiac2 = route.params.zodiac2;
  let zodiac2Full = route.params.zodiac2Full;
  let zodiac1Full = route.params.zodiac1Full;
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState('');
  const [liked, setLiked] = useState(false);
  const [postId, setPostID] = useState(null);

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
      }
    } catch (e) {
      console.log('Asenkron data error burç yorum ekranında=>', e);
    }
  };

  async function fetchData() {
    await axios
      .get(
        `https://bizimabla.herokuapp.com/api/v1/zodiac/getRelationship?horoscope1=${zodiac1}&horoscope2=${zodiac2}`,
      )
      .then(function (response) {
        setResult(response.data.data.relationship);
        setPostID(response.data.data._id);
        setLoading(false);
      })
      .catch(function (error) {
        Alert.alert(
          'Burç Uyumu',
          'Üzgünüz şu an bu işlemi gerçekleştiremiyoruz, lütfen daha sonra tekrar deneyin.',
          [{text: 'Tamam', onPress: () => console.log('Ok Pressed')}],
        );
        console.log(error);
      });
  }

  async function likePost() {
    await axios
      .post('https://bizimabla.herokuapp.com/api/v1/general/likePost', {
        title: zodiac1Full + ' ve ' + zodiac2Full + ' Uyumu',
        text: result,
        user: userId,
        postId: postId,
      })
      .then(function (response) {
        setLiked(true);
      })
      .catch(function (error) {
        Alert.alert('Uyum Beğeni', 'Bu yazıyı zaten beğendiniz.', [
          {text: 'Tamam', onPress: () => console.log('Ok Pressed')},
        ]);
        console.log(error);
      });
  }

  useEffect(() => {
    fetchData();
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

  const handleMessage = message => {
    messageS = message;
    Alert.alert(
      'Paylaş',
      `Burç uyumunu paylaş.`,
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
            <Text style={styles.title}>Burç Uyumu</Text>
            <View style={styles.headerButton}></View>
          </View>

          <View style={styles.body}>
            <ScrollView
              style={{padding: 10}}
              showsVerticalScrollIndicator={false}>
              <View
                style={{
                  marginBottom: '10%',
                  paddingBottom: '15%',
                }}>
                <View style={styles.card}>
                  {zodiac1Full === 'Aslan' ? <Leo /> : null}
                  {zodiac1Full === 'Kova' ? <Aquarius /> : null}
                  {zodiac1Full === 'Koç' ? <Aries /> : null}
                  {zodiac1Full === 'Yengeç' ? <Cancer /> : null}
                  {zodiac1Full === 'Oğlak' ? <Capricorn /> : null}
                  {zodiac1Full === 'Boğa' ? <Taurus /> : null}
                  {zodiac1Full === 'Yay' ? <Sagittarius /> : null}
                  {zodiac1Full === 'Akrep' ? <Scorpio /> : null}
                  {zodiac1Full === 'Balık' ? <Pisces /> : null}
                  {zodiac1Full === 'Başak' ? <Virgo /> : null}
                  {zodiac1Full === 'Terazi' ? <Libra /> : null}
                  {zodiac1Full === 'İkizler' ? <Gemini /> : null}
                  <View style={{marginLeft: 0}}>
                    {zodiac2Full === 'Aslan' ? <Leo /> : null}
                    {zodiac2Full === 'Kova' ? <Aquarius /> : null}
                    {zodiac2Full === 'Koç' ? <Aries /> : null}
                    {zodiac2Full === 'Yengeç' ? <Cancer /> : null}
                    {zodiac2Full === 'Oğlak' ? <Capricorn /> : null}
                    {zodiac2Full === 'Boğa' ? <Taurus /> : null}
                    {zodiac2Full === 'Yay' ? <Sagittarius /> : null}
                    {zodiac2Full === 'Akrep' ? <Scorpio /> : null}
                    {zodiac2Full === 'Balık' ? <Pisces /> : null}
                    {zodiac2Full === 'Başak' ? <Virgo /> : null}
                    {zodiac2Full === 'Terazi' ? <Libra /> : null}
                    {zodiac2Full === 'İkizler' ? <Gemini /> : null}
                  </View>
                </View>

                <Text style={styles.colorfullText}>
                  {zodiac1Full} Burcu & {zodiac2Full} Burcu
                </Text>

                <View style={styles.detailArea}>
                  <Text style={styles.longText}>{result}</Text>
                </View>

                {/* <View style={styles.compatibilityBar}>
                  <Progress.Circle
                    progress={0.6}
                    size={100}
                    thickness={10}
                    color={'#4caf50'}
                    unfilledColor={'#e0e0e0'}
                    borderWidth={0}
                    showsText={true}
                    fill="white"
                  />
                </View> */}
              </View>
            </ScrollView>
          </View>

          <View style={styles.bottomButtonArea}>
            <TouchableOpacity
              onPress={() => likePost()}
              style={styles.bottomButton}>
              <Text style={styles.buttonText}>Beğen</Text>
              <Ionicons name="thumbs-up-outline" color="#fff" size={20} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleMessage(result)}
              style={{
                ...styles.bottomButton,
                backgroundColor: '#E5B7B7',
              }}>
              <Text style={styles.buttonText}>Paylaş</Text>
              <Ionicons name="share-social-outline" color="#fff" size={20} />
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default ZodiacRelationshipDetail;

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
  card: {
    width: '100%',
    height: 190,
    borderRadius: 25,
    borderWidth: 4,
    backgroundColor: '#DEB9E2',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    borderColor: '#9789D4',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  title: {
    fontFamily: 'Gothamrounded-Bold',
    fontSize: 20,
    color: '#333',
    textAlign: 'center',
    alignSelf: 'center',
  },
  colorfullText: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 16,
    color: '#73DBC8',
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  detailArea: {
    paddingBottom: 80,
  },
  secondaryTitle: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 15,
    color: '#333',
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  longText: {
    fontFamily: 'GothamRounded-Book',
    fontSize: 13,
    lineHeight: 20,
    marginTop: 15,
  },
  bottomButtonArea: {
    position: 'absolute',
    bottom: '5%',
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
  compatibilityBar: {
    width: '100%',
    height: 100,
    marginBottom: '20%',
    marginTop: 20,
    flexDirection: 'row',
  },
});
