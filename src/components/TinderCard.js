/* eslint-disable react-hooks/exhaustive-deps */
import {
  View,
  Text,
  Image,
  Dimensions,
  Animated,
  Platform,
  StyleSheet,
} from 'react-native';
import React, {useCallback} from 'react';
import TinderChoice from './TinderChoice';

const TinderCard = ({item, isFirst, swipe, ...rest}) => {
  const rotate = swipe.x.interpolate({
    inputRange: [-100, 0, 100],
    outputRange: ['-8deg', '0deg', '8deg'],
  });
  const likeOpacity = swipe.x.interpolate({
    inputRange: [10, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  const nopeOpacity = swipe.x.interpolate({
    inputRange: [-100, -10],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const tinderSelection = useCallback(() => {
    return (
      <>
        <Animated.View
          style={{
            position: 'absolute',
            top: 60,
            right: 20,
            opacity: nopeOpacity,
            transform: [{rotate: '30deg'}],
          }}>
          <TinderChoice type={'Nope'} />
        </Animated.View>

        <Animated.View
          style={{
            position: 'absolute',
            top: 60,
            left: 20,
            opacity: likeOpacity,
            transform: [{rotate: '-30deg'}],
          }}>
          <TinderChoice type={'Like'} />
        </Animated.View>
      </>
    );
  }, []);

  return (
    <Animated.View
      style={[
        {
          width: Dimensions.get('screen').width - 20,
          height: '80%',
          alignSelf: 'center',
          position: 'absolute',
          borderRadius: 10,
          backgroundColor: '#FFC8A9',
          top: Platform.OS === 'ios' ? '10%' : '5%',
        },
        isFirst && {
          transform: [...swipe.getTranslateTransform(), {rotate: rotate}],
        },
      ]}
      {...rest}>
      <View
        style={{
          width: '90%',
          height: '85%',
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          top: '-5%',
        }}>
        <Image
          source={{uri: item.avatar}}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 10,
          }}
        />
      </View>

      <View style={styles.infoArea}>
        <Text style={styles.cardTitle}>
          {item.name}, {item.age}, {item.zodiac} Burcu
        </Text>
        <Text style={styles.cardText}>
          {item.city} {item.country} Bursa / Turkey
        </Text>
      </View>

      {isFirst && tinderSelection()}
    </Animated.View>
  );
};

export default TinderCard;

const styles = StyleSheet.create({
  infoArea: {
    width: '90%',
    paddingVertical: 10,
    alignSelf: 'center',
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
});
