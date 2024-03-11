/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../components/Loader';

const CoffeeImageUpload = ({navigation, route}) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [counter, setCounter] = useState(0);
  const [status, setStatus] = useState(false);
  const [images, setImages] = useState([]);
  const [userId, setUserId] = useState('');
  const [coins, setCoins] = useState(null);
  const [loader, setLoader] = useState(false);

  const formData = new FormData();

  const takePhoto = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      selectionLimit: 5,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        return;
      } else if (response.error) {
        return;
      } else {
        const images = [response.assets[0].uri];
        setSelectedImages([...selectedImages, ...images]);
        setCounter(selectedImages.length);
        setImages(response.assets);
      }
    });
  };

  async function upload(data) {
    setLoader(true);
    for (let index = 0; index < data.length; index++) {
      formData.append('image', {
        uri: data[index].uri,
        type: data[index].type,
        name: data[index].fileName,
      });
    }
    await axios
      .put(
        `https://bizimabla.herokuapp.com/api/v1/coffee/uploadCoffeePhoto?id=${userId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )
      .then(response => {
        if (response.error) {
          console.log(response.error);
        }
        setLoader(false);
        navigation.replace('WaitingStack');
      })
      .catch(error => {
        console.log('Error', error);
      });
  }

  const removeImage = index => {
    console.log(index);
    const newImages = [...selectedImages];
    newImages.splice(index, 1);
    setSelectedImages(newImages);
    setCounter(counter - 1);
  };

  const renderItem = ({item, index}) => (
    <View>
      <View style={styles.photoArea}>
        <Image
          source={{uri: item}}
          style={{width: 120, height: 120, borderRadius: 15}}
        />
      </View>
      <TouchableOpacity
        onPress={() => removeImage(index)}
        style={styles.deleteButton}>
        <Ionicons name="trash" color="#fff" size={18} />
      </TouchableOpacity>
    </View>
  );

  const controlCoffee = () => {
    if (status) {
      navigation.replace('CoffeResult');
    } else {
      navigation.replace('CoffeResult');
    }
  };

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
        fetchData(parsed);
      }
    } catch (e) {
      console.log('Asenkron data error burç yorum ekranında=>', e);
    }
  };

  async function fetchData(parsed) {
    await axios
      .get(
        `https://bizimabla.herokuapp.com/api/v1/profile/getUser/${parsed.userId}`,
      )
      .then(function (response) {
        setCoins(response.data.data.coins);
        console.log(coins);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (selectedImages.length > 5) {
      Alert.alert(
        'Fotoğraf Yükleme Yorumu',
        'Üzgünüz, en fazla 5 adet fotoğraf seçebilirsiniz.',
        [{text: 'Tamam', onPress: () => console.log('Ok Pressed')}],
      );
    }
  }, [images.length]);

  return (
    <SafeAreaView style={styles.container}>
      {loader ? <Loader /> : null}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.headerButton}>
          <Ionicons name="chevron-back-outline" color="#000" size={25} />
        </TouchableOpacity>
        <Text style={styles.title}>Kahve Falı</Text>
        <View style={styles.headerButton}></View>
      </View>

      <View style={styles.body}>
        <ScrollView style={{padding: 10}} showsVerticalScrollIndicator={false}>
          <View
            style={{
              marginBottom: '10%',
              paddingBottom: '15%',
            }}>
            <Text style={styles.description}>
              Kahvenizi için, fincanınızı kapatın ve soğuduktan sonra fincanın
              resimlerini ve tabağınızın resimlerini bize gönderin. Hemen uzman
              yorumcularımız kahve falınızı size özel yorumlasın.
            </Text>
            <Text style={styles.warning}>
              Lütfen falınızın doğru bakılabilmesi için{' '}
              <Text style={{...styles.warning, color: 'red'}}>
                en az 3 ve en fazla 5{' '}
              </Text>
              adet resim yükleyiniz.
            </Text>

            <TouchableOpacity onPress={() => controlCoffee()}>
              <Text style={styles.ready}>Fallarım</Text>
            </TouchableOpacity>

            <View style={{...styles.row, justifyContent: 'space-evenly'}}>
              {selectedImages.length < 5 ? (
                <TouchableOpacity
                  onPress={() => takePhoto()}
                  style={styles.takePhoto}>
                  <Text style={styles.takePhotoText}>Fotoğraf Çek</Text>
                </TouchableOpacity>
              ) : null}
            </View>

            {coins < 20 ? (
              <View style={{marginTop: 20}}>
                <Text style={styles.walletInfoText}>
                  Coin miktarınız yeterli değil lütfen coin alınız.
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('WalletStack')}
                  style={styles.walletInfoButton}>
                  <Text style={styles.walletInfoButtonText}>Coin Al</Text>
                </TouchableOpacity>
              </View>
            ) : null}

            <View style={styles.row}>
              <FlatList
                data={selectedImages}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>

            {selectedImages.length > 2 && selectedImages.length < 6 ? (
              <TouchableOpacity
                onPress={() => upload(images)}
                style={styles.fortuneButton}>
                <Text style={styles.fortuneButtonText}>Fal Baktır</Text>
              </TouchableOpacity>
            ) : null}

            {selectedImages.length > 5 ? (
              <Text style={styles.maxsizeOver}>
                En fazla 5 adet resim seçiniz.
              </Text>
            ) : null}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default CoffeeImageUpload;

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
  description: {
    fontFamily: 'GothamRounded-Book',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 10,
    textAlign: 'left',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  photoArea: {
    marginRight: 10,
    borderWidth: 1,
    borderRadius: 15,
  },
  deleteButton: {
    alignSelf: 'center',
    borderRadius: 99,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    marginTop: 3,
  },
  addButton: {
    width: '40%',
    height: 40,
    backgroundColor: '#70C8DC',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
    borderWidth: 1,
    borderRightWidth: 4,
    borderBottomWidth: 4,
  },
  addButtonText: {
    fontFamily: 'GothamRounded-Bold',
    fontSize: 14,
    color: '#333',
  },
  warning: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 14,
    color: '#333',
    marginTop: 10,
    textAlign: 'left',
    lineHeight: 20,
  },
  ready: {
    fontFamily: 'GothamRounded-Bold',
    fontSize: 15,
    color: '#E11299',
    marginTop: 10,
    textAlign: 'left',
    lineHeight: 20,
  },
  fortuneButton: {
    width: '40%',
    height: 40,
    backgroundColor: '#E5B7B7',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
    borderWidth: 1,
    borderRightWidth: 4,
    borderBottomWidth: 4,
  },
  fortuneButtonText: {
    fontFamily: 'GothamRounded-Bold',
    fontSize: 14,
    color: '#fff',
  },
  maxsizeOver: {
    fontFamily: 'GothamRounded-Bold',
    fontSize: 15,
    color: '#333',
    alignSelf: 'center',
    marginTop: 30,
  },
  walletInfoText: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 15,
    color: 'red',
    textAlign: 'center',
    lineHeight: 23,
  },
  walletInfoButtonText: {
    fontFamily: 'GothamRounded-Bold',
    fontSize: 15,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 23,
  },
  walletInfoButton: {
    width: '40%',
    height: 40,
    backgroundColor: '#7AA874',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
    borderWidth: 1,
    borderRightWidth: 4,
    borderBottomWidth: 4,
  },
  takePhoto: {
    width: '40%',
    height: 40,
    backgroundColor: '#9A208C',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
    borderWidth: 1,
    borderRightWidth: 4,
    borderBottomWidth: 4,
  },
  takePhotoText: {
    fontFamily: 'GothamRounded-Bold',
    fontSize: 14,
    color: '#fff',
  },
  cameraPreview: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 24,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
  },
  button: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
