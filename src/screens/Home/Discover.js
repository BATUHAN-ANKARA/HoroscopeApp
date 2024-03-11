/* eslint-disable react-hooks/exhaustive-deps */
import {
  View,
  Animated,
  PanResponder,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import TinderCard from '../../components/TinderCard';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Star from '../../../assets/svg/Social/Star';
import Chat from '../../../assets/svg/Social/Chat';
import Thunder from '../../../assets/svg/Social/Thunder';
import Geolocation from '@react-native-community/geolocation';
import AnimatedLottieView from 'lottie-react-native';

const Discover = ({navigation}) => {
  const [data, setData] = useState([]);
  const [isLike, setIsLike] = useState('');
  const [userGender, setUserGender] = useState(null);
  const [userId, setUserId] = useState('');

  // useEffect(() => {
  //   if (!data.length) {
  //     alert('ok');
  //   }
  // }, [swipe]);

  const swipe = useRef(new Animated.ValueXY()).current;

  const panResponser = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, {dx, dy}) => {
      swipe.setValue({x: dx, y: dy});
    },

    onPanResponderRelease: (_, {dx, dy}) => {
      let direction = Math.sign(dx);
      let isActionActive = Math.abs(dx) > 200;
      if (isActionActive) {
        Animated.timing(swipe, {
          toValue: {x: 500 * dx, y: dy},
          useNativeDriver: true,
          duration: 500,
        }).start(removeCard);
        if (direction > 0) {
          console.log('Sağa kaydırma yapıldı!', data[0]._id);
          createMatch(data[0]._id);
        } else {
          console.log('Sola kaydırma yapıldı!', data[0]);
        }
      } else {
        Animated.spring(swipe, {
          toValue: {x: 0, y: 0},
          useNativeDriver: true,
          friction: 5,
        }).start();
      }
    },
  });

  const removeCard = useCallback(() => {
    setData(prepState => {
      const newData = prepState.slice(1);
      return newData;
    });
    swipe.setValue({x: 0, y: 0});
  }, [swipe]);

  const handelSelection = useCallback(
    direction => {
      Animated.timing(swipe, {
        toValue: {x: direction * 500, y: 0},
        useNativeDriver: true,
        duration: 500,
      }).start(removeCard);
    },
    [removeCard],
  );

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
        getUserGender(parsed.userId);
      }
    } catch (e) {
      console.log('Asenkron data error=>', e);
    }
  };

  async function getUserGender(parsed) {
    await axios
      .get(`https://bizimabla.herokuapp.com/api/v1/profile/getUser/${parsed}`)
      .then(function (response) {
        setUserGender(response.data.data.gender);
        if (response.data.data.gender === 'Erkek') {
          fetchDataFemale(parsed.userId);
        } else {
          fetchDataMale(parsed.userId);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async function fetchDataFemale(userId) {
    console.log('fetchdatafemale====>');
    await axios
      .get(
        `https://bizimabla.herokuapp.com/api/v1/matches/getFemaleUsers?userId=${userId}`,
      )
      .then(function (response) {
        setData(response.data);
        console.log('response====>', response.data);
      })
      .catch(function (error) {
        console.log('getFemale hatası=>', error);
      });
  }

  async function fetchDataMale(userId) {
    console.log('fetchdatamale====>');
    await axios
      .get(
        `https://bizimabla.herokuapp.com/api/v1/matches/getMaleUsers?userId=${userId}`,
      )
      .then(function (response) {
        setData(response.data);
        console.log('response====>', response.data);
      })
      .catch(function (error) {
        console.log('getMale hatası=>', error);
      });
  }

  async function createMatch(matchedId) {
    await axios
      .post(`https://bizimabla.herokuapp.com/api/v1/matches/createMatch`, {
        userId: userId,
        matchedId: matchedId,
      })
      .then(function (response) {
        console.log('=>', response.data);
      })
      .catch(function (error) {
        console.log('create match hatası=>', error);
      });
  }

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        console.log('Latitude: ' + latitude + '\nLongitude: ' + longitude);
        // Konum verilerini burada kullanabilirsiniz
      },
      error => {
        console.log(error.message);
        // Hata durumunda burada işlem yapabilirsiniz
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  };

  useEffect(() => {
    getData();
    getLocation();
  }, []);

  const directMessage = () => {
    console.log('DM=>', data[0]);
    navigation.navigate('MessageDetail', {
      name: data[0].name,
      surname: data[0].surname,
      receivedBy: data[0]._id,
      sendBy: userId,
    });
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      {data
        .map((item, index) => {
          let isFirst = index === 0;
          let dragHanlders = isFirst ? panResponser.panHandlers : {};
          return (
            <>
              <TinderCard
                item={item}
                isFirst={isFirst}
                swipe={swipe}
                {...dragHanlders}
                isLike={isLike}
              />
              <TouchableOpacity
                style={styles.button1}
                onPress={() => {
                  handelSelection(-1);
                }}>
                <Ionicons name="close" color="#FF6464" size={45} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button2}
                onPress={() => {
                  createMatch(data[0]._id);
                  handelSelection(1);
                }}>
                <Ionicons name="heart-outline" color="#fff" size={45} />
              </TouchableOpacity>
            </>
          );
        })
        .reverse()}

      <View style={styles.bottomButtonsArea}>
        <TouchableOpacity style={styles.bottomButton}>
          <Star />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => directMessage()}
          style={{
            ...styles.bottomButton,
            backgroundColor: '#F4D7AF',
          }}>
          <Chat />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            createMatch(data[0]._id);
            handelSelection(1);
          }}
          style={{
            ...styles.bottomButton,
            backgroundColor: '#E9CDFF',
          }}>
          <Thunder />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Discover;

const styles = StyleSheet.create({
  bottomButtonsArea: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    width: '100%',
    flex: 0.1,
    paddingVertical: 10,
    bottom: 0,
    position: 'absolute',
  },
  bottomButton: {
    width: 70,
    height: 70,
    backgroundColor: '#D5F5EA',
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4.65,

    elevation: 6,
  },
  button1: {
    position: 'absolute',
    left: 20,
    bottom: '29%',
    backgroundColor: '#fff',
    borderRadius: 30,
    width: 70,
    height: 70,
    zIndex: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button2: {
    position: 'absolute',
    bottom: '29%',
    right: 20,
    backgroundColor: '#FF6464',
    borderRadius: 30,
    width: 70,
    height: 70,
    zIndex: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
