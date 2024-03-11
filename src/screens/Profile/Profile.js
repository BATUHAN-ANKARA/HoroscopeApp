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
  Image,
  Alert,
  Linking,
  Platform,
  Share,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import AnimatedLottieView from 'lottie-react-native';

const Profile = ({navigation}) => {
  const [name, setName] = useState('');
  const [surname, setSurName] = useState('');
  const [mail, setMail] = useState('');
  const [profileComplite, setProfileComplite] = useState('');
  const [avatar, setAvatar] = useState(null);
  const GOOGLE_PACKAGE_NAME = 'com.bizimablaapp';
  const APPLE_STORE_ID = 'id1555379878';
  const shareApp = async () => {
    try {
      const result = await Share.share({
        message: `Hey, check out this cool app I found! https://play.google.com/store/apps/details?id=com.bizimablaapp`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const startRatingCounter = () => {
    Alert.alert(
      'Şimdi Oy Zamanı!',
      'Yorumunuzu bizimle paylaşmak ister misiniz? Bu bize çok yardımcı olacak ve motive edecektir.',
      [
        {text: 'Evet!', onPress: () => openStore()},
        {
          text: 'Hayır, Teşekkürler!',
          onPress: () => console.log('No Thanks Pressed'),
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  };

  const openStore = () => {
    //This is the main trick
    if (Platform.OS != 'ios') {
      Linking.openURL(
        `https://play.google.com/store/apps/details?id=com.bizimablaapp`,
      ).catch(err => alert('Please check for Google Play Store'));
    } else {
      Linking.openURL(`https://apps.apple.com/app/id=${APPLE_STORE_ID}`).catch(
        err => alert(err),
      );
    }
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      console.log('profil ekranı asenkron data=>', jsonValue);
      if (jsonValue === null) {
        setTimeout(() => {
          navigation.replace('OnBoard');
        }, 1000);
      } else {
        let parsed = JSON.parse(jsonValue);
        fetchData(parsed);
      }
    } catch (e) {
      console.log('asenkron error profil ekranında=>', e);
    }
  };

  async function fetchData(parsed) {
    console.log(parsed.userId);
    await axios
      .get(
        `https://bizimabla.herokuapp.com/api/v1/profile/getUser/${parsed.userId}`,
      )
      .then(function (response) {
        console.log('profil ekranı getuser responsu=>', response.data.data);
        setName(response.data.data.name);
        if (response.data.data.surname && response.data.data.email) {
          setSurName(response.data.data.surname);
          setMail(response.data.data.email);
        }
        if (
          response.data.data.surname &&
          response.data.data.email &&
          response.data.data.gender
        ) {
          setProfileComplite(true);
        }
        if (response.data.data.avatar) {
          setAvatar(response.data.data.avatar);
        }
      })
      .catch(function (error) {
        console.log('profil ekranı fetch data hatası=>', error);
      });
  }

  const controlProfile = () => {
    if (profileComplite != true) {
      Alert.alert(
        'Profilinizi Tamamlayın',
        'Oturum kapatmak için ilk önce lütfen profilinizi tamamlayın.',
        [{text: 'Tamam', onPress: () => console.log('Ok Pressed')}],
      );
    } else {
      Alert.alert(
        'Oturum Kapat',
        'Şifre oluşturmadıysanız lütfen şifre oluşturunuz. Şifreniz varsa oturmunuzu kapatabilirsiniz.',
        [
          {
            text: 'Vazgeç',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'Oturumu Kapat', onPress: () => removeUserData('user')},
        ],
      );
    }
  };

  const removeUserData = async username => {
    try {
      await AsyncStorage.removeItem(username);
      Alert.alert(
        'Oturum Kapatıldı',
        'Oturumunuz kapatıldı. Uygulamaya e-posta ve şifrenizle girebilirsiniz.',
        [{text: 'Tamam', onPress: () => console.log('Ok Pressed')}],
      );
      navigation.replace('OnBoard');
    } catch (error) {
      console.log('Oturum kapatmada senkron silme kısmında hata=>', error);
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

  const openWhatsApp = () => {
    let phone = '+905060328397'; // Kişinin telefon numarasını buraya girin

    Linking.openURL(`whatsapp://send?phone=${phone}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.body}>
        <ScrollView showsVerticalScrollIndicator={false} style={{padding: 10}}>
          <View
            style={{
              paddingVertical: '5%',
              marginBottom: '10%',
              paddingBottom: '15%',
            }}>
            <TouchableOpacity
              onPress={() => getData()}
              style={styles.generalCell}>
              {avatar != null ? (
                <View style={styles.avatar}>
                  <Image source={{uri: avatar}} style={styles.avatarImg} />
                </View>
              ) : (
                <AnimatedLottieView
                  source={require('../../../assets/animation/avatar.json')}
                  style={{width: 60}}
                  autoPlay
                  loop
                  speed={0.6}
                />
              )}

              <View style={{marginLeft: 10}}>
                <Text style={styles.nameText}>
                  {name} {surname}
                </Text>
                <Text style={styles.mailText}>{mail}</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('AccountInfo')}
              style={styles.colorfullCell}>
              <View style={styles.row}>
                <Ionicons name="person-circle-outline" size={30} />
                <Text style={styles.cellText}>Kişisel Bilgiler</Text>
                {profileComplite ? null : (
                  <Text style={styles.infoText}>(Profil Tamamla)</Text>
                )}
              </View>
              <Ionicons name="chevron-forward" size={30} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('Favorites')}
              style={styles.standartCell}>
              <View style={styles.row}>
                <Ionicons name="heart-outline" size={30} />
                <Text style={styles.cellText}>Beğendiklerim</Text>
              </View>
              <Ionicons name="chevron-forward" size={30} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('Orders')}
              style={styles.standartCell}>
              <View style={styles.row}>
                <Ionicons name="albums-outline" size={30} />
                <Text style={styles.cellText}>Siparişlerim</Text>
              </View>
              <Ionicons name="chevron-forward" size={30} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => startRatingCounter()}
              style={styles.standartCell}>
              <View style={styles.row}>
                <Ionicons name="star-outline" size={30} />
                <Text style={styles.cellText}>Uygulamayı Oyla</Text>
              </View>
              <Ionicons name="chevron-forward" size={30} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => openWhatsApp()}
              style={styles.standartCell}>
              <View style={styles.row}>
                <Ionicons name="headset-outline" size={30} />
                <Text style={styles.cellText}>Yardım</Text>
              </View>
              <Ionicons name="chevron-forward" size={30} />
            </TouchableOpacity>

            <TouchableOpacity onPress={shareApp} style={styles.standartCell}>
              <View style={styles.row}>
                <Ionicons name="share-outline" size={30} />
                <Text style={styles.cellText}>Uygulamayı Paylaş</Text>
              </View>
              <Ionicons name="chevron-forward" size={30} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => controlProfile()}
              style={styles.button}>
              <Ionicons name="log-out-outline" size={30} color="#fff" />
              <Text style={styles.buttonText}>Oturumu Kapat</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  body: {
    flex: 1,
  },
  generalCell: {
    width: '100%',
    borderWidth: 1,
    height: 80,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  avatar: {
    height: 45,
    width: 45,
    borderRadius: 99,
    borderWidth: 2,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarImg: {
    height: 45,
    width: 45,
    borderRadius: 99,
  },
  colorfullCell: {
    height: 60,
    width: '100%',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFD29E',
    borderWidth: 1,
    borderColor: '#000',
    marginTop: 15,
    paddingHorizontal: 10,
  },
  standartCell: {
    height: 60,
    width: '100%',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop: 15,
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cellText: {
    fontFamily: 'GothamRounded-Book',
    fontSize: 16,
    color: '#000',
    marginLeft: 20,
  },
  infoText: {
    fontFamily: 'GothamRounded-Light',
    fontSize: 16,
    color: '#333',
    marginLeft: 5,
  },
  nameText: {
    fontFamily: 'GothamRounded-Bold',
    fontSize: 15,
    color: '#333',
    lineHeight: 20,
  },
  mailText: {
    fontFamily: 'GothamRounded-Light',
    fontSize: 12,
    color: '#333',
    lineHeight: 20,
  },
  button: {
    backgroundColor: '#000',
    width: Dimensions.get('screen').width - 20,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 30,
  },
  buttonText: {
    fontFamily: 'GothamRounded-Bold',
    color: '#fff',
    fontSize: 16,
    marginLeft: 20,
  },
});
