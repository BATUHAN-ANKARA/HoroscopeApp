/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  FlatList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BlogSvg from '../../../assets/svg/BlogSvg';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../components/Loader';

const Blog = ({navigation}) => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      if (jsonValue === null) {
        setTimeout(() => {
          navigation.replace('OnBoard');
        }, 1000);
      } else {
        let parsed = JSON.parse(jsonValue);
        fetchData(parsed.userId);
      }
    } catch (e) {
      console.log(e);
    }
  };

  async function fetchData() {
    setLoading(true);
    await axios
      .get('https://bizimabla.herokuapp.com/api/v1/blog/listAll')
      .then(function (response) {
        setBlogPosts(response.data.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    getData();
  }, []);

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
            <Text style={styles.title}>Astro Blog</Text>
            <View style={styles.headerButton}></View>
          </View>

          <View style={styles.body}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{marginTop: 10, paddingBottom: 20}}>
              <View style={styles.card}>
                <BlogSvg />
              </View>
              <View style={{paddingBottom: 0}}>
                <FlatList
                  data={blogPosts}
                  style={{paddingHorizontal: 10, paddingBottom: 60}}
                  keyExtractor={item => item._id.toString()}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('BlogDetail', {
                          title: item.title,
                          date: item.postDate,
                          longText: item.text,
                        })
                      }
                      style={styles.blogCard}>
                      <Text numberOfLines={2} style={styles.blogTitle}>
                        {item.title}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </ScrollView>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default Blog;

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
  title: {
    fontFamily: 'Gothamrounded-Bold',
    fontSize: 20,
    color: '#333',
    textAlign: 'center',
    alignSelf: 'center',
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
    width: Dimensions.get('screen').width - 20,
    alignSelf: 'center',
  },
  periodeText: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 15,
    color: '#333',
  },
  card: {
    height: 170,
    width: Dimensions.get('screen').width - 20,
    alignSelf: 'center',
    backgroundColor: '#9789D4',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#DEB9E2',
    marginTop: 10,
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
    color: '#fff',
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
    bottom: 40,
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
  blogCard: {
    height: 100,
    width: '100%',
    backgroundColor: '#70C8DC',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  loading: {
    position: 'absolute',
    backgroundColor: '#333',
    width: '50%',
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.7,
    borderRadius: 12,
    alignSelf: 'center',
    top: 150,
    zIndex: 9,
  },
  loadingText: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 18,
    color: '#fff',
    lineHeight: 20,
    marginTop: 10,
  },
  loaderStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
