/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import AnimatedLottieView from 'lottie-react-native';

const Dice = ({navigation}) => {
  const [diceOne, setDiceOne] = useState(1);
  const [diceTwo, setDiceTwo] = useState(1);
  const [total, setTotal] = useState(diceOne + diceTwo);
  const [diceRoll, setDiceRoll] = useState(false);

  const rollDice = () => {
    setDiceRoll(true);
    const newDiceOne = Math.floor(Math.random() * 6) + 1;
    const newDiceTwo = Math.floor(Math.random() * 6) + 1;
    setDiceOne(newDiceOne);
    setDiceTwo(newDiceTwo);
    setTotal(newDiceOne + newDiceTwo);
  };

  useFocusEffect(
    React.useCallback(() => {
      setDiceRoll(false);
      return () => {
        // Burada temizleme işlemleri yapabilirsiniz
      };
    }, []),
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerButton}></View>
        <Text style={styles.title}>Şanslıyım</Text>
        <View style={styles.headerButton}></View>
      </View>

      <View style={styles.body}>
        <Text style={styles.infoText}>
          Zar oyununa hoş geldin, toplamda 2 zarın toplamı eşleşen
          kullanıcıların buluşma noktası!
        </Text>
        <View style={styles.animationArea}>
          {diceRoll ? (
            <AnimatedLottieView
              style={{width: '90%'}}
              source={require('../../../assets/animation/dice.json')}
              autoPlay
              loop={false}
              speed={1}
              onAnimationFinish={() =>
                navigation.navigate('DiceResult', {total: total})
              }
            />
          ) : null}
        </View>
        <TouchableOpacity onPress={() => rollDice()} style={styles.button}>
          <Text style={styles.buttonText}>Zar At</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Dice;

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
    padding: 10,
  },
  infoText: {
    fontFamily: 'GothamRounded-Book',
    fontSize: 15,
    color: '#333',
    lineHeight: 23,
    textAlign: 'center',
  },
  button: {
    width: 200,
    height: 55,
    backgroundColor: '#FF6464',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    alignSelf: 'center',
  },
  animationArea: {
    width: '100%',
    height: '40%',
    marginVertical: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'GothamRounded-Bold',
    fontSize: 20,
    color: '#fff',
  },
});
