/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert,
  Share,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

const BlogDetail = ({navigation, route}) => {
  let title = route.params.title;
  let longText = route.params.longText;
  let date = route.params.date;
  let formattedDate = moment.utc(date).local().format('DD.MM.YYYY HH:mm');
  console.log(formattedDate);
  const [userId, setUserId] = useState('');
  const [shareMessage, setShareMessage] = useState(longText);

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

  useEffect(() => {
    getData();
  }, []);

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: shareMessage,
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
      `Blog yazısını paylaş.`,
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
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.headerButton}>
          <Ionicons name="chevron-back-outline" color="#000" size={25} />
        </TouchableOpacity>
        <Text style={styles.title}>Astro Blog</Text>
        <View style={styles.headerButton}></View>
      </View>

      <View style={styles.body}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{marginTop: 10, paddingBottom: 20}}>
          <View style={{paddingBottom: 140}}>
            <Text style={styles.blogTitle}>{title}</Text>
            <View style={styles.blogDateArea}>
              <Ionicons name="calendar-outline" color="#73DBC8" size={25} />
              <Text style={styles.dateText}>{formattedDate}</Text>
            </View>
            <Text style={styles.longText}>{longText}</Text>
          </View>
        </ScrollView>
      </View>

      <View style={styles.bottomButtonArea}>
        <TouchableOpacity
          onPress={() => handleMessage(longText)}
          style={{
            ...styles.bottomButton,
            backgroundColor: '#E5B7B7',
          }}>
          <Text style={styles.buttonText}>Paylaş</Text>
          <Ionicons name="share-social-outline" color="#fff" size={20} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default BlogDetail;

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
    borderWidth: 1,
    marginTop: 30,
  },
  blogTitle: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 16,
    color: '#333',
    alignSelf: 'center',
    width: '90%',
    lineHeight: 20,
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
  longText: {
    fontFamily: 'GothamRounded-Book',
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginTop: 10,
  },
  bottomButtonArea: {
    position: 'absolute',
    bottom: '5%',
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
  blogCard: {
    height: 100,
    width: '100%',
    backgroundColor: '#70C8DC',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    marginTop: 20,
  },
});
