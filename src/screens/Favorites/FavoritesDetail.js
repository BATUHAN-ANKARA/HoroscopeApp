/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Liked from '../../../assets/svg/Horoscopes/Liked';
import LikeCard from '../../../assets/svg/Horoscopes/LikeCard';

const FavoritesDetail = ({navigation, route}) => {
  const [text, setText] = useState(route.params.text);
  const [title, setTitle] = useState(route.params.title);

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
          <View style={styles.card}>
            <LikeCard />
          </View>
          <View style={{paddingBottom: 90}}>
            <Text style={styles.blogTitle}>{title}</Text>
            <Text style={styles.longText}>{text}</Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default FavoritesDetail;

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
    padding: 10,
  },
  title: {
    fontFamily: 'Gothamrounded-Bold',
    fontSize: 20,
    color: '#333',
    textAlign: 'center',
    alignSelf: 'center',
  },
  card: {
    height: 180,
    width: '100%',
    backgroundColor: '#F5C6EC',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
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
  blogTitle: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 16,
    color: '#333',
    marginTop: 30,
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
    borderWidth: 1,
    alignItems: 'center',
  },
});
