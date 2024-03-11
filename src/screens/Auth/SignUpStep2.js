import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTogglePasswordVisibility} from '../../hooks/useTogglePasswordVisibility';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CountryPicker from 'react-native-country-picker-modal';

const SignUpStep2 = ({navigation, route}) => {
  const [name, setName] = useState(null);
  const [surname, setSurName] = useState(null);
  const [mail, setMail] = useState(null);
  const [gender, setGender] = useState(null);
  const [password, setPassword] = useState(null);
  const [loader, setLoader] = useState(false);
  const [country, setCountry] = useState(null);
  const [city, setCity] = useState('');

  let birthDate = route.params.birthDate;
  let userId = '';

  async function postData() {
    console.log(birthDate, name, surname, mail, gender, password);
    setLoader(true);
    if (
      name === '' ||
      name === null ||
      surname === '' ||
      surname === null ||
      mail === '' ||
      mail === null ||
      gender === '' ||
      gender === null ||
      password === null ||
      password === ''
    ) {
      Alert.alert('Form Hatası', 'Lütfen bilgileri eksiksiz doldurun.', [
        {text: 'Tamam', onPress: () => setLoader(false)},
      ]);
      return;
    }
    await axios
      .post('https://bizimabla.herokuapp.com/api/v1/auth/signUp', {
        birthDate: birthDate,
        name: name,
        surname: surname,
        email: mail,
        gender: gender,
        password: password,
      })
      .then(function (response) {
        console.log('Kullanıcı=====>>>', response.data.data);
        userId = response.data.data._id;
        console.log('Kullanıcı kayıt edildi=>id bilgisi=>', userId);
        setLoader(false);
        storeData();
      })
      .catch(function (error) {
        console.log('Axios signup kısmı error=>', error);
        Alert.alert(
          'Kayıt Hatası',
          'İsim ve doğum tarihi bilginizi eksiksiz ve doğru şekilde girdiğinizden emin olun.',
          [{text: 'Tamam', onPress: () => setLoader(false)}],
        );
      });
  }

  const storeData = async () => {
    try {
      let value = {
        name: name,
        surname: surname,
        email: mail,
        gender: gender,
        birthDate: birthDate,
        userId: userId,
      };
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('user', jsonValue);
      console.log('Asenkron kaydı yapıldı=>');
      navigation.replace('BottomTab');
    } catch (e) {
      console.log('asenkron işlem hatası=>', e);
    }
  };

  const handleNameChange = value => {
    // Sadece harf ve boşluk karakteri kabul ediyoruz
    const regex = /^[a-zA-ZğüşöçıİĞÜŞÖÇ\s]*$/;
    if (!regex.test(value)) {
      Alert.alert('Hatalı Giriş', 'Sadece harf girişi yapabilirsiniz', [
        {text: 'Tamam', onPress: () => setName('')},
      ]);
    } else {
      setName(value);
    }
  };
  const handleSurnameChange = value => {
    const regex = /^[a-zA-ZğüşöçıİĞÜŞÖÇ\s]*$/;
    if (!regex.test(value)) {
      Alert.alert('Hatalı Giriş', 'Sadece harf girişi yapabilirsiniz', [
        {text: 'Tamam', onPress: () => setSurName('')},
      ]);
    } else {
      setSurName(value);
    }
  };
  const handleCountryChange = value => {
    // Sadece harf ve boşluk karakteri kabul ediyoruz
    const regex = /^[a-zA-ZğüşöçıİĞÜŞÖÇ\s]*$/;
    if (!regex.test(value)) {
      Alert.alert('Hatalı Giriş', 'Sadece harf girişi yapabilirsiniz', [
        {text: 'Tamam', onPress: () => setCountry('')},
      ]);
    } else {
      setCountry(value);
    }
  };
  const handleCityChange = value => {
    // Sadece harf ve boşluk karakteri kabul ediyoruz
    const regex = /^[a-zA-ZğüşöçıİĞÜŞÖÇ\s]*$/;
    if (!regex.test(value)) {
      Alert.alert('Hatalı Giriş', 'Sadece harf girişi yapabilirsiniz', [
        {text: 'Tamam', onPress: () => setCity('')},
      ]);
    } else {
      setCity(value);
    }
  };

  const {passwordVisibility, rightIcon, handlePasswordVisibility} =
    useTogglePasswordVisibility();

  return (
    <SafeAreaView style={styles.container}>
      {loader ? (
        <ActivityIndicator style={styles.loaderStyle} size={'large'} />
      ) : null}
      <View style={{flex: 1}}>
        <Text style={styles.mainText}>Seni Tanımak İstiyoruz !</Text>
        <Text style={styles.secondaryText}>İsmini öğrenebilir miyiz?</Text>

        <View style={styles.row}>
          <View style={styles.inputAreaRow}>
            <TextInput
              placeholder="Adınız"
              placeholderTextColor="#333"
              style={styles.textInput}
              autoCorrect={false}
              onChangeText={handleNameChange}
            />
          </View>

          <View style={styles.inputAreaRow}>
            <TextInput
              placeholder="Soyadınız"
              placeholderTextColor="#333"
              style={styles.textInput}
              autoCorrect={false}
              onChangeText={handleSurnameChange}
            />
          </View>
        </View>

        <View style={styles.inputArea}>
          <TextInput
            placeholder="E-Posta"
            placeholderTextColor="#333"
            style={styles.textInput}
            autoCorrect={false}
            maxLength={30}
            onChangeText={value => setMail(value)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View
          style={{
            ...styles.passwordArea,
          }}>
          <TextInput
            placeholder="Şifreniz"
            placeholderTextColor="#333"
            autoCapitalize="none"
            autoCorrect={false}
            maxLength={20}
            style={{...styles.textInput, width: '90%'}}
            onChangeText={value => setPassword(value)}
            defaultValue={password}
            secureTextEntry={passwordVisibility}
          />
          <TouchableOpacity onPress={handlePasswordVisibility}>
            <Ionicons name="eye" size={22} />
          </TouchableOpacity>
        </View>

        <View style={styles.genderInputArea}>
          <Text style={styles.textInput}>Cinsiyet</Text>
          <View style={styles.genderButtonArea}>
            {gender === 'Kadın' ? (
              <TouchableOpacity
                onPress={() => setGender('Kadın')}
                style={{
                  ...styles.genderButton,
                  backgroundColor: '#E49393',
                }}>
                <Ionicons name="female-outline" color="#fff" size={22} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => setGender('Kadın')}
                style={styles.genderButton}>
                <Ionicons name="female-outline" color="#000" size={22} />
              </TouchableOpacity>
            )}

            {gender === 'Erkek' ? (
              <TouchableOpacity
                onPress={() => setGender('Erkek')}
                style={{
                  ...styles.genderButton,
                  backgroundColor: '#73DBC8',
                }}>
                <Ionicons name="male-outline" color="#fff" size={22} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => setGender('Erkek')}
                style={styles.genderButton}>
                <Ionicons name="male-outline" color="#000" size={22} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.inputAreaRow}>
            <TextInput
              placeholder="Ülke"
              placeholderTextColor="#333"
              style={styles.textInput}
              autoCorrect={false}
              onChangeText={handleCountryChange}
            />
          </View>

          <View style={styles.inputAreaRow}>
            <TextInput
              placeholder="Şehir"
              placeholderTextColor="#333"
              style={styles.textInput}
              autoCorrect={false}
              onChangeText={handleCityChange}
            />
          </View>
        </View>
        <TouchableOpacity onPress={() => postData()} style={styles.button}>
          <Text style={styles.buttonText}>Başla</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignUpStep2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mainText: {
    alignSelf: 'center',
    marginTop: 70,
    fontFamily: 'GothamRounded-Book',
    fontSize: 24,
  },
  secondaryText: {
    alignSelf: 'center',
    marginTop: 10,
    fontFamily: 'GothamRounded-Book',
    fontSize: 14,
  },
  inputArea: {
    height: 60,
    width: Dimensions.get('screen').width - 20,
    alignSelf: 'center',
    borderRadius: 15,
    borderWidth: 0.8,
    borderColor: '#222',
    backgroundColor: '#FFD29E',
    marginTop: 20,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  passwordArea: {
    height: 60,
    width: Dimensions.get('screen').width - 20,
    alignSelf: 'center',
    borderRadius: 15,
    borderWidth: 0.8,
    borderColor: '#222',
    backgroundColor: '#FFD29E',
    marginTop: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputAreaRow: {
    height: 60,
    width: '47%',
    alignSelf: 'center',
    borderRadius: 15,
    borderWidth: 0.8,
    borderColor: '#222',
    justifyContent: 'center',
    backgroundColor: '#FFD29E',
    marginTop: 20,
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
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
    marginTop: 30,
  },
  buttonText: {
    color: '#000',
    fontFamily: 'GothamRounded-Medium',
    fontSize: 15,
  },
  textInput: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 18,
    color: '#333',
  },
  loaderStyle: {
    position: 'absolute',
    alignSelf: 'center',
    zIndex: 1,
    bottom: '50%',
  },
  genderInputArea: {
    width: Dimensions.get('screen').width - 20,
    alignSelf: 'center',
    height: 60,
    marginTop: 20,
    borderRadius: 15,
    borderColor: '#222',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  genderButtonArea: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  genderButton: {
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 99,
    borderWidth: 1,
    marginRight: 15,
    backgroundColor: '#ddd',
  },
});
