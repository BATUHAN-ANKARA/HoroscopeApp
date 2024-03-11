import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import ActiveCardSvg from '../../../assets/svg/ActiveCardSvg';
import AnimatedLottieView from 'lottie-react-native';

const Tarot = ({navigation}) => {
  const [selected1, setSelected1] = useState(0);
  const [selected2, setSelected2] = useState(0);
  const [selected3, setSelected3] = useState(0);
  const [success, setSuccess] = useState(false);

  const chooseCard = id => {
    if (selected1 === 0) {
      setSelected1(id);
    } else if (selected1 === id) {
      setSelected1(0);
      Alert.alert('Tarot', 'Geçmiş için bir kart seçin.', [
        {text: 'Tamam', onPress: () => console.log('Ok Pressed')},
      ]);
    } else if (selected2 === 0) {
      setSelected2(id);
    } else if (selected2 === id) {
      setSelected2(0);
      Alert.alert('Tarot', 'Şimdi için bir kart seçin.', [
        {text: 'Tamam', onPress: () => console.log('Ok Pressed')},
      ]);
    } else if (selected3 === 0) {
      setSelected3(id);
    } else if (selected3 === id) {
      setSelected3(0);
      Alert.alert('Tarot', 'Gelecek için bir kart seçin.', [
        {text: 'Tamam', onPress: () => console.log('Ok Pressed')},
      ]);
    } else if (selected1 !== 0 && selected2 !== 0 && selected3 !== 0) {
      alert('Kart seçimini tamamladınız fal baktırabilirsiniz');
    }
  };

  const control = () => {
    if (selected1 === 0 || selected2 === 0 || selected3 === 0) {
      alert('Fal için 3 adet kart seçmeniz gerekli.');
    } else {
      setSuccess(true);
    }
  };

  const scrollToViewRef = useRef(null);
  const scrollToEnd = () => {
    scrollToViewRef.current.scrollToEnd({animated: true});
  };

  const [scrollViewHeight, setScrollViewHeight] = useState(0);
  const scrollViewRef = useRef(null);

  const handleContentSizeChange = (contentWidth, contentHeight) => {
    if (contentHeight > scrollViewHeight) {
      scrollViewRef.current.scrollToEnd();
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
        <Text style={styles.title}>Tarot</Text>
        <View style={styles.headerButton}></View>
      </View>

      <View style={styles.body}>
        {selected1 === 0 || selected2 === 0 || selected3 === 0 ? null : (
          <TouchableOpacity onPress={() => control()} style={styles.button}>
            <Text style={styles.buttonText}>Falıma Bak</Text>
            <Ionicons name="arrow-forward-outline" color="#000" size={25} />
          </TouchableOpacity>
        )}
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{marginTop: 10, paddingBottom: 10}}>
            <Text style={styles.standartText}>
              Tarot açılımı için üç farklı kart seçmeniz gerekiyor. bu açılımda
              <Text style={styles.boldText}>
                {' '}
                geçmiş , şimdi ve gelecek
              </Text>{' '}
              olmak üzere üç farklı kart seçerek sıraya göre seçtiğiniz kartın
              anlamı denk gelecektir.
            </Text>

            <Text
              style={{...styles.standartText, marginTop: 30, marginBottom: 20}}>
              Üç kart seçtikten sonra{' '}
              <Text style={styles.boldText}>“falıma bak“</Text> butonuna
              basınız.
            </Text>

            <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
              {/* 78 kartın bulunduğu döngü */}
              {Array.from({length: 78}, (_, i) => i + 1).map(cardNumber => (
                <TouchableOpacity
                  key={cardNumber}
                  onPress={() => chooseCard(cardNumber)}
                  style={styles.card}>
                  <LinearGradient
                    colors={['#DEB9E2', '#FFD29E']}
                    style={styles.linearGradient}>
                    {(selected1 === cardNumber ||
                      selected2 === cardNumber ||
                      selected3 === cardNumber) && <ActiveCardSvg />}
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>

        {success && (
          <AnimatedLottieView
            source={require('../../../assets/animation/ok.json')}
            autoPlay={true}
            loop={false}
            style={{position: 'absolute', zIndex: 9}}
            onAnimationFinish={() =>
              setTimeout(() => {
                setSuccess(false);
                navigation.replace('TarotDetail', {
                  card1: selected1,
                  card2: selected2,
                  card3: selected3,
                });
              }, 2100)
            }
            speed={0.7}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Tarot;

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
    paddingTop: 10,
  },
  standartText: {
    fontFamily: 'GothamRounded-Book',
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    alignSelf: 'center',
    lineHeight: 20,
  },
  boldText: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 16,
    color: '#333',
    lineHeight: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 50,
  },
  linearGradient: {
    height: 140,
    width: (Dimensions.get('screen').width - 50) / 4,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    borderRadius: 10,
    marginTop: 10,
    marginLeft: 10,
  },
  activeCard: {
    borderRadius: 10,
    marginTop: 10,
    marginLeft: 10,
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  button: {
    height: 60,
    width: Dimensions.get('screen').width - 20,
    backgroundColor: '#73DBC8',
    borderRadius: 15,
    borderWidth: 1,
    borderRightWidth: 4,
    borderBottomWidth: 4,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 9,
    bottom: '10%',
  },
  buttonText: {
    fontFamily: 'GothamRounded-Bold',
    fontSize: 16,
    color: '#333',
    marginRight: 10,
  },
});
