/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import AnimatedLottieView from 'lottie-react-native';
import Loader from '../../components/Loader';

const AccountInfo = ({navigation}) => {
  const [name, setName] = useState('');
  const [surname, setSurName] = useState('');
  const [gender, setGender] = useState(null);
  const [age, setAge] = useState('');
  const [mail, setMail] = useState('');
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageUri, setImageUri] = useState(null);
  const [success, setSuccess] = useState(false);
  const [apiMail, setApiMail] = useState('');

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
        fetchData(parsed);
      }
    } catch (e) {
      console.log('Splash error=>', e);
    }
  };

  async function fetchData(parsed) {
    await axios
      .get(
        `https://bizimabla.herokuapp.com/api/v1/profile/getUser/${parsed.userId}`,
      )
      .then(function (response) {
        console.log('accountınfo response=>', response.data.data);
        setName(response.data.data.name);
        setAge(response.data.data.age);
        if (response.data.data.avatar) {
          setImageUri(response.data.data.avatar);
          console.log('profil fotoğrafı=>', response.data.data.avatar);
        }
        if (
          response.data.data.surname &&
          response.data.data.email &&
          response.data.data.gender
        ) {
          setSurName(response.data.data.surname);
          setMail(response.data.data.email);
          setApiMail(response.data.data.email);
          setGender(response.data.data.gender);
        }
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async function updateUser() {
    if (
      surname === '' ||
      surname === null ||
      mail === '' ||
      mail === null ||
      gender === '' ||
      gender === null
    ) {
      Alert.alert(
        'Yetersiz Bilgi',
        'Güncelleme yapabilmeniz için gerekli bilgileri boş bırakmayınız.',
        [{text: 'Tamam', onPress: () => console.log('Ok Pressed')}],
      );
      return;
    }
    setLoading(true);
    await axios
      .put(`https://bizimabla.herokuapp.com/api/v1/profile/update/${userId}`, {
        surname: surname,
        email: mail,
        gender: gender,
      })
      .then(function (response) {
        setLoading(false);
        console.log(response.data.data);
        if (response.data.data === 'mail_hata') {
          Alert.alert('E-Posta Hatası', 'Bu E-Posta zaten kullanılıyor.', [
            {text: 'Tamam', onPress: () => console.log('Ok Pressed')},
          ]);
          return;
        } else if (response.data.validationErrors != null) {
          Alert.alert('Form Hatası', 'Bilgileri uygun formatta giriniz.', [
            {text: 'Tamam', onPress: () => setLoading(false)},
          ]);
        }
        setSuccess(true);
      })
      .catch(function (error) {
        Alert.alert('Form Hatası', 'Bilgileri uygun formatta giriniz.', [
          {text: 'Tamam', onPress: () => setLoading(false)},
        ]);
        console.log('accountinfo ekranı updateuser axios hatası=>', error);
        return;
      });
  }

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

  const pickImages = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      selectionLimit: 1,
      includeBase64: false,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        return;
      } else if (response.error) {
        return;
      } else {
        const formData = new FormData();
        formData.append('image', {
          uri: response.assets[0].uri,
          type: response.assets[0].type,
          name: response.assets[0].fileName,
        });
        setLoading(true);
        axios
          .put(
            `https://bizimabla.herokuapp.com/api/v1/profile/updateAvatar?id=${userId}`,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            },
          )
          .then(response => {
            setLoading(false);
            Alert.alert(
              'Profil Fotoğrafı',
              'Fotoğrafınız başarılı şekilde güncellendi',
              [
                {
                  text: 'Tamam',
                  onPress: () =>
                    setTimeout(() => {
                      navigation.goBack();
                    }, 1000),
                },
              ],
            );
          })
          .catch(error => {
            console.log('Error', error);
          });
        setImageUri(response.assets[0].uri);
        console.log('imguri=>', imageUri);
      }
    });
  };

  const takePhoto = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        return;
      } else if (response.error) {
        return;
      } else {
        const formData = new FormData();
        formData.append('image', {
          uri: response.assets[0].uri,
          type: response.assets[0].type,
          name: response.assets[0].fileName,
        });
        setLoading(true);
        axios
          .put(
            `https://bizimabla.herokuapp.com/api/v1/profile/updateAvatar?id=${userId}`,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            },
          )
          .then(response => {
            setLoading(false);
            Alert.alert(
              'Profil Fotoğrafı',
              'Fotoğrafınız başarılı şekilde güncellendi',
              [
                {
                  text: 'Tamam',
                  onPress: () =>
                    setTimeout(() => {
                      navigation.goBack();
                    }, 1000),
                },
              ],
            );
          })
          .catch(error => {
            console.log('Error', error);
          });
        setImageUri(response.assets[0].uri);
        console.log('imguri=>', imageUri);
      }
    });
  };

  const chooseProcess = () => {
    Alert.alert(
      'Fotoğraf Yükle',
      'Profil fotoğrafınızı galeriden fotoğraf seçerek veya kameranız ile fotoğraf çekerek tamamlayabilirsiniz.',
      [
        {text: 'Galeri', onPress: () => pickImages()},
        {
          text: 'Kamera',
          onPress: () => takePhoto(),
        },
      ],
    );
  };

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
            <Text style={styles.title}>Kişisel Bilgiler</Text>
            <View style={styles.headerButton}></View>
          </View>

          <View style={styles.body}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{paddingHorizontal: 10}}>
              <View
                style={{
                  paddingVertical: '5%',
                  marginBottom: '10%',
                  paddingBottom: '15%',
                }}>
                <View style={styles.infoArea}>
                  <View style={styles.labelArea}>
                    <Text style={styles.labelStyle}>Fotoğraf</Text>
                  </View>

                  <View style={{width: 200}}>
                    <TouchableOpacity
                      onPress={() => chooseProcess()}
                      style={styles.uploadArea}>
                      {imageUri ? (
                        <Image source={{uri: imageUri}} style={styles.img} />
                      ) : (
                        <Ionicons
                          name="person-circle-outline"
                          color="#fff"
                          size={30}
                        />
                      )}
                    </TouchableOpacity>

                    <Text style={styles.lightText}>Fotoğraf yükle</Text>
                  </View>
                </View>

                <View style={styles.infoArea}>
                  <View style={styles.labelArea}>
                    <Text style={styles.labelStyle}>Email</Text>
                  </View>

                  <View style={styles.standartInputArea}>
                    <TextInput
                      autoCorrect={false}
                      maxLength={30}
                      style={styles.textInput}
                      onChangeText={value => setMail(value)}
                      defaultValue={mail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  </View>
                </View>

                <View style={styles.infoArea}>
                  <View style={styles.labelArea}>
                    <Text style={styles.labelStyle}>İsim</Text>
                  </View>

                  <View style={styles.standartInputArea}>
                    <Text style={styles.textInput}>{name}</Text>
                  </View>
                </View>

                <View style={styles.infoArea}>
                  <View style={styles.labelArea}>
                    <Text style={styles.labelStyle}>Soyisim</Text>
                  </View>

                  <View style={styles.standartInputArea}>
                    <TextInput
                      autoCorrect={false}
                      maxLength={20}
                      style={styles.textInput}
                      onChangeText={handleSurnameChange}
                      defaultValue={surname}
                    />
                  </View>
                </View>

                <View style={styles.infoArea}>
                  <View style={styles.labelArea}>
                    <Text style={styles.labelStyle}>Cinsiyet</Text>
                  </View>

                  <View style={{...styles.standartInputArea, height: 60}}>
                    {gender === 'Kadın' ? (
                      <TouchableOpacity
                        onPress={() => setGender('Kadın')}
                        style={{
                          ...styles.genderButton,
                          backgroundColor: '#E49393',
                        }}>
                        <Ionicons
                          name="female-outline"
                          color="#fff"
                          size={22}
                        />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        onPress={() => setGender('Kadın')}
                        style={styles.genderButton}>
                        <Ionicons
                          name="female-outline"
                          color="#000"
                          size={22}
                        />
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

                <View style={styles.infoArea}>
                  <View style={styles.labelArea}>
                    <Text style={styles.labelStyle}>Yaş</Text>
                  </View>

                  <View style={styles.standartInputArea}>
                    <Text style={styles.infoText}>{age}</Text>
                  </View>
                </View>

                {apiMail === mail ? null : (
                  <TouchableOpacity
                    onPress={() => updateUser()}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Kaydet</Text>
                  </TouchableOpacity>
                )}
              </View>

              {success && (
                <AnimatedLottieView
                  source={require('../../../assets/animation/payment_success.json')}
                  autoPlay={true}
                  loop={false}
                  style={{position: 'absolute', zIndex: 9}}
                  onAnimationFinish={() =>
                    setTimeout(() => {
                      navigation.goBack();
                    }, 2500)
                  }
                  speed={0.7}
                />
              )}
            </ScrollView>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default AccountInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loaderStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
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
  button: {
    backgroundColor: '#73DBC8',
    width: Dimensions.get('screen').width - 20,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRightWidth: 4,
    borderBottomWidth: 4,
    borderColor: '#000',
    marginTop: 40,
  },
  buttonText: {
    fontFamily: 'GothamRounded-Bold',
    color: '#fff',
    fontSize: 16,
    marginLeft: 20,
  },
  infoArea: {
    width: '100%',
    flexDirection: 'row',
    borderBottomWidth: 0.8,
    borderColor: '#bbb',
    alignItems: 'center',
    marginVertical: 10,
  },
  labelArea: {
    width: '40%',
    paddingVertical: 5,
  },
  uploadArea: {
    width: 60,
    height: 60,
    borderWidth: 1,
    marginTop: 10,
    borderRadius: 15,
    backgroundColor: '#73DBC8',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginBottom: 10,
  },
  img: {
    width: 60,
    height: 60,
    borderRadius: 15,
  },
  standartInputArea: {
    width: 200,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelStyle: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 15,
    color: '#333',
  },
  lightText: {
    fontFamily: 'GothamRounded-Light',
    fontSize: 11,
    color: '#333',
    marginBottom: 5,
  },
  infoText: {
    fontFamily: 'GothamRounded-Book',
    fontSize: 14,
    color: '#333',
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
  textInput: {
    width: '100%',
    fontFamily: 'GothamRounded-Book',
    fontSize: 14,
    color: '#333',
  },
  loading: {
    position: 'absolute',
    backgroundColor: '#333',
    width: '50%',
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.7,
    borderRadius: 12,
    alignSelf: 'center',
    top: 150,
  },
  loadingText: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 18,
    color: '#fff',
    lineHeight: 20,
    marginTop: 10,
  },
});
