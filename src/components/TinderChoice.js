import {View, Text} from 'react-native';
import React from 'react';

const TinderChoice = ({type}) => {
  return (
    <View>
      <Text
        style={{
          color: type == 'Like' ? '#01FF84' : '#F6006B',
          fontSize: 40,
          borderWidth: 4,
          borderColor: type == 'Like' ? '#01FF84' : '#F6006B',
          paddingLeft: 10,
          paddingRight: 10,
        }}>
        {type}
      </Text>
    </View>
  );
};

export default TinderChoice;
