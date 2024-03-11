/* eslint-disable react-hooks/exhaustive-deps */
import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  useWindowDimensions,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  useDerivedValue,
  interpolate,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Thunder from '../../assets/svg/Social/Thunder';
import Eye from '../../assets/svg/Social/Eye';
import Chat from '../../assets/svg/Social/Chat';
import Star from '../../assets/svg/Social/Star';

const ROTATION = 60;
const SWIPE_VELOCITY = 300;

const AnimatedStack = props => {
  const {data, renderItem, onSwipeLeft, onSwipeRight} = props;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(currentIndex + 1);
  const currentProfile = data[currentIndex];
  const nextProfile = data[nextIndex];
  const {width: screenWidth} = useWindowDimensions();
  const hiddenTranslateX = 2 * screenWidth;
  const translateX = useSharedValue(0);
  const [addmission, setAddmission] = useState(false);

  const rotate = useDerivedValue(
    () =>
      interpolate(translateX.value, [0, hiddenTranslateX], [0, ROTATION]) +
      'deg',
  );

  const cardStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
      {
        rotate: rotate.value,
      },
    ],
  }));

  const nextCardStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(
          translateX.value,
          [-hiddenTranslateX, 0, hiddenTranslateX],
          [1, 0.8, 1],
        ),
      },
    ],
    opacity: interpolate(
      translateX.value,
      [-hiddenTranslateX, 0, hiddenTranslateX],
      [1, 0.5, 1],
    ),
  }));

  const likeStyle = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [0, hiddenTranslateX / 5], [0, 1]),
  }));

  const nopeStyle = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [0, -hiddenTranslateX / 5], [0, 1]),
  }));

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.startX = translateX.value;
    },
    onActive: (event, context) => {
      translateX.value = context.startX + event.translationX;
    },
    onEnd: event => {
      if (Math.abs(event.velocityX) < SWIPE_VELOCITY) {
        translateX.value = withSpring(0);
        return;
      }

      translateX.value = withSpring(
        hiddenTranslateX * Math.sign(event.velocityX),
        {},
        () => runOnJS(setCurrentIndex)(currentIndex + 1),
      );
      const onSwipe = event.velocityX > 0 ? onSwipeRight : onSwipeLeft;
      onSwipe && runOnJS(onSwipe)(currentProfile);
    },
  });

  useEffect(() => {
    translateX.value = 0;
    setNextIndex(currentIndex + 1);
    if (currentIndex === data.length) {
      console.log('===>', data.length);
      // setCurrentIndex(0);
      // setNextIndex(currentIndex + 1);
    }
  }, [currentIndex, translateX]);

  return (
    <SafeAreaView style={styles.container}>
      {nextProfile && (
        <View style={styles.nextCardContainer}>
          <Animated.View style={[styles.animatedCard, nextCardStyle]}>
            {renderItem({item: nextProfile})}
          </Animated.View>
        </View>
      )}

      {currentProfile && (
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View style={[styles.animatedCard, cardStyle]}>
            <Animated.Image
              source={require('../../assets/images/LIKE.png')}
              style={[styles.like, {left: 10}, likeStyle]}
              resizeMode="contain"
            />
            <Animated.Image
              source={require('../../assets/images/nope.png')}
              style={[styles.like, {right: 10}, nopeStyle]}
              resizeMode="contain"
            />
            {renderItem({item: currentProfile})}
          </Animated.View>
        </PanGestureHandler>
      )}
      <View style={styles.bottomButtonsArea}>
        <TouchableOpacity style={styles.bottomButton}>
          <Star />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            ...styles.bottomButton,
            backgroundColor: '#F4D7AF',
          }}>
          <Chat />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            ...styles.bottomButton,
            backgroundColor: '#E9CDFF',
          }}>
          <Eye />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => console.log(currentIndex)}
          style={{
            ...styles.bottomButton,
            backgroundColor: '#E3EEFF',
          }}>
          <Thunder />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AnimatedStack;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    height: '100%',
    flex: 1,
    backgroundColor: '#fff',
  },
  animatedCard: {
    width: Dimensions.get('screen').width - 20,
    height: '100%',
    alignItems: 'center',
    flex: 0.9,
  },
  nextCardContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
  },
  like: {
    width: 150,
    height: 150,
    position: 'absolute',
    top: 10,
    zIndex: 1,
    elevation: 1,
  },
  bottomButtonsArea: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    width: '100%',
    flex: 0.1,
    paddingVertical: 10,
  },
  bottomButton: {
    width: 70,
    height: 70,
    backgroundColor: '#D5F5EA',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
});
