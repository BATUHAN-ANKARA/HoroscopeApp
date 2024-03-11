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
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import AnimatedLottieView from 'lottie-react-native';
import {useFocusEffect} from '@react-navigation/native';
import Loader from '../../components/Loader';
import {Image} from 'react-native-svg';

const Matches = ({navigation}) => {
  const [userId, setUserId] = useState(null);
  const [data, setData] = useState([]);
  const [dataSuccess, setDataSuccess] = useState([]);
  const [loader, setLoader] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      getData();
      return () => {
        // Burada temizleme işlemleri yapabilirsiniz
      };
    }, []),
  );

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
        setUserId(parsed.userId);
        setLoader(true);
        fetchData(parsed);
        fetchData2(parsed);
      }
    } catch (e) {
      console.log('asenkron işlem hatası=>', e);
    }
  };

  async function fetchData(parsed) {
    await axios
      .get(
        `https://bizimabla.herokuapp.com/api/v1/matches/listMatchWaiting?userId=${parsed.userId}`,
      )
      .then(function (response) {
        setData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  async function fetchData2(parsed) {
    await axios
      .get(
        `https://bizimabla.herokuapp.com/api/v1/matches/listMatchSuccess?userId=${parsed.userId}`,
      )
      .then(function (response) {
        setDataSuccess(response.data);
        setLoader(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async function updateSuccess(id) {
    await axios
      .put(
        `https://bizimabla.herokuapp.com/api/v1/matches/updateMatchSuccess`,
        {matchId: `${id}`},
      )
      .then(function (response) {
        console.log(response.data);
        getData();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    getData();
  }, []);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const handleSingleIndexSelect = index => {
    setSelectedIndex(index);
  };

  return (
    <SafeAreaView style={styles.container}>
      {loader ? (
        <Loader />
      ) : (
        <>
          <View style={styles.header}>
            <View style={styles.headerButton}></View>
            <Text style={styles.title}>Eşleşmeler</Text>
            <View style={styles.headerButton}></View>
          </View>

          <View style={styles.body}>
            <View
              style={{
                width: Dimensions.get('screen').width - 20,
                alignSelf: 'center',
                marginVertical: 10,
              }}>
              <SegmentedControlTab
                values={['Beni Beğenenler', 'Eşleştiklerim']}
                selectedIndex={selectedIndex}
                tabStyle={styles.tabStyle}
                activeTabStyle={styles.activeTabStyle}
                onTabPress={handleSingleIndexSelect}
                tabTextStyle={styles.tabTextStyle}
                activeTabTextStyle={styles.activeTabTextStyle}
                firstTabStyle={{marginRight: 0}}
              />
            </View>

            {selectedIndex === 0 ? (
              <ScrollView showsVerticalScrollIndicator={false}>
                {data.map((item, index) => {
                  return (
                    <View style={styles.card} key={index}>
                      <LinearGradient
                        colors={['#E5B7B7', '#fff']}
                        style={styles.gradient}
                        start={{x: 0, y: 0}}
                        end={{x: 0, y: 0.8}}>
                        <View style={styles.img}>
                          <Image
                            source={{uri: item.user.avatar}}
                            style={{
                              width: '100%',
                              height: '100%',
                            }}
                          />
                        </View>

                        <View>
                          <Text style={styles.userName}>
                            {item.user.name} {item.user.surname}{' '}
                            <Text style={styles.receivedMessage}>
                              {item.user.zodiac} Burcu, {item.user.age} Yaşında
                            </Text>
                          </Text>

                          <TouchableOpacity
                            onPress={() => updateSuccess(item.match._id)}
                            style={styles.button}>
                            <Text style={styles.buttonText}>Beğen</Text>
                          </TouchableOpacity>
                        </View>
                      </LinearGradient>
                    </View>
                  );
                })}

                {data.length === 0 ? (
                  <View>
                    <AnimatedLottieView
                      source={require('../../../assets/animation/noResult.json')}
                      style={{width: '50%', alignSelf: 'center'}}
                      autoPlay
                      loop
                    />
                    <Text style={styles.failText}>
                      Henüz bir eşleşmeniz bulunmamakta. Keşfe devam...
                    </Text>
                  </View>
                ) : null}
              </ScrollView>
            ) : (
              <ScrollView showsVerticalScrollIndicator={false}>
                {dataSuccess.map((item, index) => {
                  return (
                    <View style={styles.card} key={index}>
                      <LinearGradient
                        colors={['#E5B7B7', '#fff']}
                        style={styles.gradient}
                        start={{x: 0, y: 0}}
                        end={{x: 0, y: 0.8}}>
                        <View style={styles.img}>
                          <Image
                            source={{uri: item.user1.avatar}}
                            style={{
                              width: '100%',
                              height: '100%',
                            }}
                          />
                        </View>

                        <View>
                          {item.user1._id === userId ? (
                            <Text style={styles.userName}>
                              {item.user2.name} {item.user2.surname}{' '}
                              <Text style={styles.receivedMessage}>
                                {item.user2.zodiac} Burcu, {item.user2.age}{' '}
                                Yaşında
                              </Text>
                            </Text>
                          ) : (
                            <Text style={styles.userName}>
                              {item.user1.name} {item.user1.surname}{' '}
                              <Text style={styles.receivedMessage}>
                                {item.user1.zodiac} Burcu, {item.user1.age}{' '}
                                Yaşında
                              </Text>
                            </Text>
                          )}

                          {item.user1._id === userId ? (
                            <TouchableOpacity
                              style={styles.button}
                              onPress={() =>
                                navigation.navigate('MessageDetail', {
                                  name: item.user2.name,
                                  surname: item.user2.surname,
                                  receivedBy: item.user2._id,
                                  sendBy: userId,
                                })
                              }>
                              <Text style={styles.buttonText}>Mesajlaş</Text>
                            </TouchableOpacity>
                          ) : (
                            <TouchableOpacity
                              style={styles.button}
                              onPress={() =>
                                navigation.navigate('MessageDetail', {
                                  name: item.user1.name,
                                  surname: item.user1.surname,
                                  receivedBy: item.user1._id,
                                  sendBy: userId,
                                })
                              }>
                              <Text style={styles.buttonText}>Mesajlaş</Text>
                            </TouchableOpacity>
                          )}
                        </View>
                      </LinearGradient>
                    </View>
                  );
                })}
                {dataSuccess.length === 0 ? (
                  <View>
                    <AnimatedLottieView
                      source={require('../../../assets/animation/noResult.json')}
                      style={{width: '50%', alignSelf: 'center'}}
                      autoPlay
                      loop
                    />
                    <Text style={styles.failText}>
                      Henüz bir eşleşmeniz bulunmamakta. Keşfe devam...
                    </Text>
                  </View>
                ) : null}
              </ScrollView>
            )}
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default Matches;

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
  card: {
    width: Dimensions.get('screen').width - 20,
    alignSelf: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    marginVertical: 10,
    backgroundColor: 'red',
    height: 500,
  },
  gradient: {
    width: '100%',
    borderRadius: 10,
    padding: 10,
    height: '100%',
  },
  img: {
    width: '100%',
    height: '80%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  receivedMessage: {
    fontFamily: 'Gothamrounded-Book',
    fontSize: 15,
    color: '#333',
    lineHeight: 23,
  },
  userName: {
    fontFamily: 'Gothamrounded-Medium',
    fontSize: 15,
    color: '#333',
    lineHeight: 23,
    marginRight: 5,
  },
  button: {
    width: 100,
    height: 45,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FA9884',
    marginTop: 5,
  },
  buttonText: {
    fontFamily: 'Gothamrounded-Bold',
    fontSize: 15,
    color: '#fff',
    lineHeight: 23,
  },
  infoText: {
    fontFamily: 'Gothamrounded-Book',
    fontSize: 15,
    color: '#333',
    lineHeight: 23,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabStyle: {
    borderWidth: 0,
    borderRadius: 0,
    borderBottomWidth: 0,
    backgroundColor: 'transparent',
    height: 50,
    borderColor: 'transparent',
  },
  activeTabStyle: {
    backgroundColor: '#9789D4',
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
  },
  tabTextStyle: {
    color: '#000',
    fontFamily: 'Gothamrounded-Medium',
    fontSize: 15,
  },
  activeTabTextStyle: {
    color: '#fff',
  },
  failText: {
    fontFamily: 'Gothamrounded-Medium',
    fontSize: 15,
    color: '#333',
    textAlign: 'center',
    lineHeight: 23,
  },
});
