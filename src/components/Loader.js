import React from 'react';
import AnimatedLottieView from 'lottie-react-native';
import {SafeAreaView, StyleSheet} from 'react-native';

const Loader = () => {
  return (
    <SafeAreaView style={styles.loaderStyle}>
      <AnimatedLottieView
        style={{width: '20%'}}
        source={require('../../assets/animation/loading.json')}
        autoPlay
        loop={true}
        speed={1.5}
      />
    </SafeAreaView>
  );
};

export default Loader;

const styles = StyleSheet.create({
  loaderStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
