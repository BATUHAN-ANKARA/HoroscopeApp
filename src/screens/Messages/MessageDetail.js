/* eslint-disable react-hooks/exhaustive-deps */
import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../components/Loader';

const MessageDetail = ({navigation, route}) => {
  const scrollViewRef = useRef();
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState(null);
  const [message, setMessage] = useState(null);
  const [name, setName] = useState(route.params.name);
  const [surname, setSurname] = useState(route.params.surname);
  const [receivedBy, setReceivedBy] = useState(route.params.receivedBy);
  const [sendBy, setSendBy] = useState(route.params.sendBy);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      //   console.log('asenkronda kayıtlı ilgileri=>', jsonValue);
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
      console.log('asenkron işlem hatası=>', e);
    }
  };

  async function fetchData() {
    await axios
      .get(
        `https://bizimabla.herokuapp.com/api/v1/messages/getConversation?sendBy=${sendBy}&receivedBy=${receivedBy}`,
      )
      .then(function (response) {
        setMessages(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async function sendMessage(value) {
    await axios
      .post(`https://bizimabla.herokuapp.com/api/v1/messages/createMessage`, {
        sendBy: userId,
        receivedBy: receivedBy,
        message: value,
      })
      .then(function (response) {
        // console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    setMessage(null);
    getData();
  }

  useEffect(() => {
    getData();
  }, []);

  const messagesReversed = [...messages].reverse();

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior="padding"
      keyboardVerticalOffset={80}>
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

              <Text style={styles.userName}>
                {name} {surname}
              </Text>

              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.headerButton}>
                <Ionicons
                  name="ellipsis-vertical-outline"
                  color="#000"
                  size={25}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.body}>
              <ScrollView
                scrollsToTop={false}
                ref={scrollViewRef}
                showsVerticalScrollIndicator={false}
                onContentSizeChange={() =>
                  scrollViewRef.current.scrollToEnd({animated: true})
                }>
                {messagesReversed.map(message => (
                  <View
                    key={message.id}
                    style={{
                      flexDirection:
                        message.sendBy === userId ? 'row-reverse' : 'row',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      marginBottom: 10,
                    }}>
                    <View
                      style={{
                        backgroundColor:
                          message.sendBy === userId ? 'blue' : 'gray',
                        borderRadius: 10,
                        padding: 10,
                        marginHorizontal: 10,
                      }}>
                      <Text style={{color: 'white'}}>{message.message}</Text>
                    </View>
                  </View>
                ))}
              </ScrollView>

              <View style={styles.messageBoxArea}>
                <View style={styles.messageBox}>
                  <TextInput
                    multiline
                    value={message}
                    onChangeText={setMessage}
                  />
                </View>
                <TouchableOpacity
                  onPress={() => sendMessage(message)}
                  style={styles.sendButton}>
                  <Ionicons name="send" color="#fff" size={20} />
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default MessageDetail;

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
    backgroundColor: '#73DBC8',
  },
  headerButton: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
  },
  userName: {
    fontFamily: 'Gothamrounded-Medium',
    fontSize: 17,
    color: '#333',
    textAlign: 'center',
    alignSelf: 'center',
  },
  body: {
    flex: 1,
    paddingTop: 10,
  },
  messageBoxArea: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 5,
  },
  messageBox: {
    width: '83%',
    alignSelf: 'flex-start',
    maxHeight: 100,
    height: 55,
    backgroundColor: '#ddd',
    borderRadius: 30,
    marginLeft: 10,
    padding: 10,
  },
  sendButton: {
    width: '12%',
    height: 45,
    backgroundColor: '#73DBC8',
    borderRadius: 199,
    marginLeft: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialogBox: {
    backgroundColor: '#CDE990',
    padding: 10,
    borderRadius: 5,
    margin: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
    maxWidth: '80%',
  },
});
