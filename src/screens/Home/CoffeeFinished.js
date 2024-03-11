/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  ScrollView,
  Share,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AnimatedLottieView from 'lottie-react-native';
import Loader from '../../components/Loader';

const CoffeFinished = ({navigation, route}) => {
  const [id, setId] = useState(route.params.coffeeId);
  const [userId, setUserId] = useState('');
  const [text, setText] = useState('');
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [shareMessage, setShareMessage] = useState('');
  const [postId, setPostID] = useState(null);
  const [liked, setLiked] = useState(false);

  async function fetchData() {
    await axios
      .get(
        `https://bizimabla.herokuapp.com/api/v1/coffee/getCoffeeResult?id=${id}`,
      )
      .then(function (response) {
        setDate(
          new Date(response.data.uploadedAt).toLocaleString('tr-TR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: 'numeric',
            hourCycle: 'h23',
          }),
        );
        setText(response.data.result);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        Alert.alert(
          'Fal Yorumu',
          'Üzgünüz, yorumunuz yüklenemedi lütfen daha sonra tekrar deneyin.',
          [{text: 'Tamam', onPress: () => console.log('Ok Pressed')}],
        );
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
        fetchData();
      }
    } catch (e) {
      console.log('Asenkron data error burç yorum ekranında=>', e);
    }
  };

  async function likePost() {
    await axios
      .post('https://bizimabla.herokuapp.com/api/v1/general/likePost', {
        title: 'Fal Sonucu',
        text: text,
        user: userId,
        postId: postId,
      })
      .then(function (response) {
        setLiked(true);
      })
      .catch(function (error) {
        Alert.alert('Fal Beğeni', 'Bu yazıyı zaten beğendiniz.', [
          {text: 'Tamam', onPress: () => console.log('Ok Pressed')},
        ]);
        console.log(error);
      });
  }

  useEffect(() => {
    getData();
  }, []);

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: text,
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

  const handleMessage = message => {
    setShareMessage(message);
    Alert.alert(
      'Paylaş',
      `Fal yorumunu paylaş.`,
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
            <Text style={styles.title}>Fal Sonucu</Text>
            <View style={styles.headerButton}></View>
          </View>

          <View style={styles.body}>
            <ScrollView showsVerticalScrollIndicator={false} style={{}}>
              <View
                style={{
                  marginBottom: '10%',
                  paddingBottom: '15%',
                }}>
                <Text style={styles.blogTitle}>
                  Neyse Halin Çıksın Falın...
                </Text>
                <View style={styles.blogDateArea}>
                  <Ionicons name="calendar-outline" color="#73DBC8" size={25} />
                  <Text style={styles.dateText}>{date} Tarihli falın</Text>
                </View>

                <Text style={styles.longText}>{text}</Text>
              </View>
            </ScrollView>

            <View style={styles.bottomButtonArea}>
              <TouchableOpacity
                style={styles.bottomButton}
                onPress={() => likePost()}>
                <Text style={styles.buttonText}>Beğen</Text>
                <Ionicons name="thumbs-up-outline" color="#fff" size={20} />
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  ...styles.bottomButton,
                  backgroundColor: '#E5B7B7',
                }}
                onPress={() => handleMessage(text)}>
                <Text style={styles.buttonText}>Paylaş</Text>
                <Ionicons name="share-social-outline" color="#fff" size={20} />
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default CoffeFinished;

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
  blogTitle: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 16,
    color: '#333',
    lineHeight: 20,
  },
  longText: {
    fontFamily: 'GothamRounded-Book',
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginTop: 10,
  },
  blogDateArea: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  dateText: {
    fontFamily: 'GothamRounded-Light',
    fontSize: 13,
    color: '#333',
    marginLeft: 5,
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
});
