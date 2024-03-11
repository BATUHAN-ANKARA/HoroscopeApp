/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import Liked from '../../../assets/svg/Horoscopes/Liked';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import AnimatedLottieView from 'lottie-react-native';

const Favorites = ({navigation}) => {
  const [blogPosts, setBlogPosts] = useState([]);

  async function getLiked(id) {
    await axios
      .get(`https://bizimabla.herokuapp.com/api/v1/general/getLikedPost/${id}`)
      .then(function (response) {
        setBlogPosts(response.data.data);
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
        getLiked(parsed.userId);
      }
    } catch (e) {
      console.log('Splash error=>', e);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getData();
      return () => {
        // Burada temizleme işlemleri yapabilirsiniz
      };
    }, []),
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.headerButton}>
          <Ionicons name="chevron-back-outline" color="#000" size={25} />
        </TouchableOpacity>
        <Text style={styles.title}>Beğendiklerim</Text>
        <View style={styles.headerButton}></View>
      </View>

      <View style={styles.body}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{paddingBottom: 20}}>
          <View style={{paddingBottom: 90}}>
            <FlatList
              data={blogPosts}
              keyExtractor={item => item._id.toString()}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('FavoritesDetail', {
                      title: item.title,
                      text: item.text,
                    })
                  }
                  style={styles.blogCard}>
                  <Text style={styles.blogTitle}>{item.title}</Text>
                  <View style={styles.blogDateArea}>
                    <Ionicons
                      name="calendar-outline"
                      color="#E90064"
                      size={25}
                    />
                    <Text style={styles.dateText}>
                      {new Date(item.postDate).toLocaleString('tr-TR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: 'numeric',
                        hourCycle: 'h23',
                      })}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            />
            {blogPosts[0] ? null : (
              <View>
                <Text style={styles.infoText}>
                  Henüz bir beğeni yapmadınız, beğenileriniz burada
                  listelenecektir.
                </Text>
                <AnimatedLottieView
                  style={{width: '90%', alignSelf: 'center'}}
                  source={require('../../../assets/animation/favorite_waiting.json')}
                  autoPlay
                  loop
                />
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Favorites;

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
  title: {
    fontFamily: 'Gothamrounded-Bold',
    fontSize: 20,
    color: '#333',
    textAlign: 'center',
    alignSelf: 'center',
  },
  card: {
    height: 170,
    width: '100%',
    backgroundColor: '#9789D4',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#DEB9E2',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  blogTitle: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 16,
    color: '#333',
  },
  blogDateArea: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  dateText: {
    fontFamily: 'GothamRounded-Book',
    fontSize: 13,
    color: '#333',
    marginLeft: 10,
  },
  longText: {
    fontFamily: 'GothamRounded-Book',
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginTop: 10,
  },
  blogCard: {
    backgroundColor: '#F7C8E0',
    marginTop: 20,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderWidth: 4,
    borderColor: '#9789D4',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
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
