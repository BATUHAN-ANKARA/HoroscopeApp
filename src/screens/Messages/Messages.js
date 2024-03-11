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
import Ionicons from 'react-native-vector-icons/Ionicons';
import Loader from '../../components/Loader';
import {useFocusEffect} from '@react-navigation/native';

const Messages = ({navigation}) => {
  const [userId, setUserId] = useState(null);
  const [data, setData] = useState([]);
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
      }
    } catch (e) {
      console.log('asenkron işlem hatası=>', e);
    }
  };

  async function fetchData(parsed) {
    await axios
      .get(
        `https://bizimabla.herokuapp.com/api/v1/messages/getMessageBox?userId=${parsed.userId}`,
      )
      .then(function (response) {
        setData(response.data);
        setLoader(false);
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
      {loader ? (
        <Loader />
      ) : (
        <>
          <View style={styles.header}>
            <View style={styles.headerButton}></View>
            <Text style={styles.title}>Mesajlar</Text>
            <View style={styles.headerButton}></View>
          </View>

          <View style={styles.body}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {data.map((item, index) => {
                const date = new Date(item.lastMessage.createdAt);
                const day = date.getDate().toString().padStart(2, '0');
                const month = date.toLocaleString('default', {month: 'long'});
                const hour = date.getHours().toString().padStart(2, '0');
                let minute = date.getMinutes().toString();
                minute = minute.padStart(2, '0');
                return (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('MessageDetail', {
                        name: item.user.name,
                        surname: item.user.surname,
                        receivedBy: item._id,
                        sendBy: userId,
                      })
                    }
                    style={styles.card}
                    key={index}>
                    <LinearGradient
                      colors={['#E5B7B7', '#fff']}
                      style={styles.gradient}
                      start={{x: 0, y: 0}}
                      end={{x: 0, y: 0.8}}>
                      <View>
                        <Text style={styles.userName}>
                          {item.user.name + ' ' + item.user.surname}
                        </Text>

                        {userId === item.lastMessage.sendBy ? (
                          <Text style={styles.sentMessage}>
                            {item.lastMessage.message}
                          </Text>
                        ) : (
                          <Text style={styles.receivedMessage}>
                            {item.lastMessage.message}
                          </Text>
                        )}
                      </View>

                      <View>
                        <Text>{`${day} ${month}, ${hour}:${minute}`}</Text>

                        {userId === item.lastMessage.sendBy ? (
                          <Ionicons name="checkmark" color="#000" size={25} />
                        ) : null}

                        {userId != item.lastMessage.sendBy &&
                        item.lastMessage.status === 0 ? (
                          <Ionicons name="mail-unread" color="#000" size={25} />
                        ) : null}

                        {userId != item.lastMessage.sendBy &&
                        item.lastMessage.status === 1 ? (
                          <Ionicons name="mail-open" color="#000" size={25} />
                        ) : null}
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default Messages;

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
  },
  gradient: {
    width: '100%',
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    padding: 10,
  },
  infoArea: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    width: 60,
    height: 60,
    backgroundColor: 'grey',
    borderRadius: 10,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sentMessage: {
    fontFamily: 'Gothamrounded-Light',
    fontSize: 14,
    color: '#333',
    lineHeight: 23,
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
  },
});
