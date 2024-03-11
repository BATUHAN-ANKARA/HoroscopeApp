import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Video from 'react-native-video';

const Waiting = ({navigation}) => {
  setTimeout(() => {
    navigation.goBack();
  }, 2500);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.headerButton}>
        <Ionicons name="chevron-back-outline" color="#000" size={25} />
      </TouchableOpacity>
      <Video
        source={require('./video.mp4')}
        rate={1.0}
        volume={1.0}
        muted={true}
        resizeMode={'cover'}
        repeat
        style={styles.video}
      />
    </View>
  );
};

export default Waiting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  video: {
    position: 'absolute',
    zIndex: 0,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  showResultButton: {
    position: 'absolute',
    zIndex: 0,
    bottom: 150,
    width: 180,
    height: 60,
    backgroundColor: 'transparent',
    alignSelf: 'center',
    borderRadius: 15,
    borderWidth: 1,
    borderRightWidth: 4,
    borderBottomWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  showResultButtonText: {
    fontFamily: 'GothamRounded-Bold',
    fontSize: 23,
    color: '#fff',
  },
  headerButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 9,
    top: '10%',
  },
});
