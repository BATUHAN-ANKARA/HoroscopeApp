import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTogglePasswordVisibility} from '../../hooks/useTogglePasswordVisibility';

const SignIn = ({navigation, route}) => {
  const [mail, setMail] = useState(null);
  const [password, setPassword] = useState(null);
  const [loader, setLoader] = useState(false);
  let userId = null;
  const {passwordVisibility, rightIcon, handlePasswordVisibility} =
    useTogglePasswordVisibility();

  async function postData(mail, password) {
    setLoader(true);
    await axios
      .post('https://bizimabla.herokuapp.com/api/v1/auth/signIn', {
        email: mail,
        password: password,
      })
      .then(function (response) {
        console.log('Giriş=====>>>', response.data.data);
        userId = response.data.data.id;
        storeData();
        setLoader(false);
      })
      .catch(function (error) {
        alert('Bilgilerinizi kontrol ediniz.');
        console.log(error);
        setLoader(false);
      });
  }

  const storeData = async () => {
    try {
      let value = {
        userId: userId,
      };

      if (value.userId) {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem('user', jsonValue);
        navigation.navigate('BottomTab');
      } else {
        alert('Lütfen tüm bilgileri girin');
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.headerButton}>
          <Ionicons name="chevron-back-outline" color="#000" size={25} />
        </TouchableOpacity>
        <Text style={styles.title}>Giriş Yap</Text>
        <View style={styles.headerButton}></View>
      </View>

      <View style={styles.body}>
        <View style={styles.inputArea}>
          <TextInput
            placeholder="E-Posta"
            placeholderTextColor="#333"
            style={styles.textInput}
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={value => setMail(value)}
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputArea}>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            maxLength={20}
            style={styles.textInput}
            onChangeText={value => setPassword(value)}
            placeholder="Şifreniz"
            placeholderTextColor="#333"
            secureTextEntry={passwordVisibility}
          />
          <TouchableOpacity
            style={styles.eyeButton}
            onPress={handlePasswordVisibility}>
            <Ionicons name="eye" size={20} />
          </TouchableOpacity>
        </View>
        {loader ? (
          <ActivityIndicator style={styles.loaderStyle} size={'large'} />
        ) : null}

        <View style={{alignSelf: 'center', position: 'absolute', bottom: 80}}>
          <TouchableOpacity
            onPress={() => postData(mail, password)}
            style={styles.button}>
            <Text style={styles.buttonText}>Giriş Yap</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.version}>Version 1.0</Text>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;

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
  inputArea: {
    height: 60,
    width: '70%',
    borderRadius: 15,
    borderWidth: 0.8,
    borderColor: '#222',
    alignItems: 'center',
    backgroundColor: '#FFD29E',
    alignSelf: 'center',
    marginTop: 20,
    padding: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    height: 60,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#73DBC8',
    alignSelf: 'center',
    borderColor: '#222',
    borderWidth: 1,
    borderBottomWidth: 4,
    borderRightWidth: 4,
  },
  buttonText: {
    color: '#000',
    fontFamily: 'GothamRounded-Medium',
    fontSize: 15,
  },
  version: {
    alignSelf: 'center',
    fontFamily: 'GothamRounded-Book',
    fontSize: 15,
    position: 'absolute',
    bottom: 20,
  },
  textInput: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 18,
    color: '#333',
    width: '100%',
  },
  eyeButton: {
    position: 'absolute',
    right: 10,
  },
  loaderStyle: {
    marginTop: 30,
  },
});
