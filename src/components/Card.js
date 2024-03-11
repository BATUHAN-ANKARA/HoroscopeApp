import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

const Card = props => {
  const {name, age, avatar, location, zodiac} = props.user;

  return (
    <SafeAreaView style={styles.back}>
      <View style={styles.card}>
        <LinearGradient
          colors={['rgba(0, 0, 0, 0)', '#000000']}
          style={styles.linearGradient}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}>
          <Image
            source={{
              uri: avatar,
            }}
            style={styles.image}
          />
        </LinearGradient>
        <TouchableOpacity style={styles.button1}>
          <Ionicons name="close" color="#FF6464" size={45} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button2}>
          <Ionicons name="heart-outline" color="#fff" size={45} />
        </TouchableOpacity>
      </View>
      <View style={styles.infoArea}>
        <Text style={styles.cardTitle}>
          {name}, {age}, {zodiac} Burcu
        </Text>
        <Text style={styles.cardText}>{location}</Text>
      </View>
    </SafeAreaView>
  );
};

export default Card;

const styles = StyleSheet.create({
  image: {
    borderRadius: 20,
    flex: 1,
    width: '100%',
    height: '100%',
  },
  linearGradient: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  card: {
    width: '90%',
    height: '80%',
    position: 'absolute',
    top: -35,
  },
  back: {
    width: '100%',
    flex: 0.95,
    backgroundColor: '#FFC8A9',
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    marginTop: 40,
  },
  infoArea: {
    width: '90%',
    paddingVertical: 20,
    marginBottom: 20,
  },
  cardTitle: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 20,
    color: '#883100',
    lineHeight: 23,
  },
  cardText: {
    fontFamily: 'GothamRounded-Book',
    fontSize: 14,
    color: '#883100',
    lineHeight: 23,
  },
  button1: {
    position: 'absolute',
    left: 0,
    bottom: -35,
    backgroundColor: '#fff',
    borderRadius: 30,
    width: 70,
    height: 70,
    zIndex: 9,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  button2: {
    position: 'absolute',
    bottom: -35,
    right: 0,
    backgroundColor: '#FF6464',
    borderRadius: 30,
    width: 70,
    height: 70,
    zIndex: 9,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  gradient: {
    flex: 1,
  },
});
