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
  ActivityIndicator,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AnimatedLottieView from 'lottie-react-native';
import Loader from '../../components/Loader';

const TarotDetail = ({navigation, route}) => {
  console.log(route.params);
  let card1, card2, card3;

  const [card1Meaning, setCard1Meaning] = useState('');
  const [card2Meaning, setCard2Meaning] = useState('');
  const [card3Meaning, setCard3Meaning] = useState('');
  const [card1Name, setCard1Name] = useState('');
  const [card2Name, setCard2Name] = useState('');
  const [card3Name, setCard3Name] = useState('');
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState('');
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    function uniqueNumbers(card1, card2, card3) {
      return new Set([card1, card2, card3]).size === 3;
    }
    do {
      card1 = Math.floor(Math.random() * 78) + 1;
      card2 = Math.floor(Math.random() * 78) + 1;
      card3 = Math.floor(Math.random() * 78) + 1;
    } while (!uniqueNumbers(card1, card2, card3));
  }, []);

  async function getCard(card1, card2, card3) {
    await axios
      .get(
        `https://bizimabla.herokuapp.com/api/v1/tarot/getTarotFortune?id=${card1}`,
      )
      .then(function (response) {
        console.log(response.data.data.description);
        setCard1Meaning(response.data.data.description);
        setCard1Name(response.data.data.name);
      })
      .catch(function (error) {
        console.log(error);
      });
    await axios
      .get(
        `https://bizimabla.herokuapp.com/api/v1/tarot/getTarotFortune?id=${card2}`,
      )
      .then(function (response) {
        setCard2Meaning(response.data.data.description);
        setCard2Name(response.data.data.name);
      })
      .catch(function (error) {
        console.log(error);
      });
    await axios
      .get(
        `https://bizimabla.herokuapp.com/api/v1/tarot/getTarotFortune?id=${card3}`,
      )
      .then(function (response) {
        setCard3Meaning(response.data.data.description);
        setCard3Name(response.data.data.name);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
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
      }
    } catch (e) {
      console.log('Asenkron data error tarot sonuç ekranında=>', e);
    }
  };

  useEffect(() => {
    getCard(card1, card2, card3);
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

  const handleMessage = () => {
    messageS = (card1Meaning, card2Meaning, card3Meaning);
    Alert.alert(
      'Paylaş',
      `Tarot yorumunu paylaş.`,
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
            <Text style={styles.title}>Tarot</Text>
            <View style={styles.headerButton}></View>
          </View>

          <View style={styles.body}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{marginBottom: 0}}>
              <Text style={styles.colorfullText}>TAROT FALINIZIN SONUCU</Text>
              <View style={styles.detailArea}>
                <Text style={styles.secondaryTitle}>
                  Geçmiş Kartınız:{' '}
                  <Text style={styles.secondaryTitleDark}>{card1Name}</Text>
                </Text>
                <Text style={styles.longText}>{card1Meaning}</Text>

                <Text style={styles.secondaryTitle}>
                  Şimdi Kartınız:{' '}
                  <Text style={styles.secondaryTitleDark}>{card2Name}</Text>
                </Text>
                <Text style={styles.longText}>{card2Meaning}</Text>

                <Text style={styles.secondaryTitle}>
                  Gelecek Kartınız:{' '}
                  <Text style={styles.secondaryTitleDark}>{card3Name}</Text>
                </Text>
                <Text style={styles.longText}>{card3Meaning}</Text>
              </View>
            </ScrollView>
          </View>

          <View style={styles.bottomButtonArea}>
            <TouchableOpacity
              onPress={() => handleMessage()}
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

export default TarotDetail;

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
  card: {
    width: 270,
    height: 170,
    borderRadius: 25,
    borderWidth: 1,
    backgroundColor: '#DEB9E2',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
    color: '#DEB9E2',
    textAlign: 'center',
    alignSelf: 'center',
  },
  detailArea: {
    paddingBottom: 180,
  },
  secondaryTitle: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 15,
    color: '#73DBC8',
    marginTop: 20,
    alignSelf: 'center',
  },
  secondaryTitleDark: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 15,
    color: '#333',
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
    bottom: '10%',
    width: '70%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
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
});
