import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
const Button = ({text, path, nav}) => {
  return (
    <TouchableOpacity
      style={{
        alignItems: 'center',
        padding: 5,
      }}>
      <Text
        style={{
          backgroundColor: '#c0392b',
          color: '#fff',
          paddingTop: 10,
          paddingBottom: 10,
          paddingLeft: 30,
          paddingRight: 30,
          fontWeight: 'bold',
          borderRadius: 5,
          fontSize: 18,
          width: '100%',
          textAlign: 'center',
        }}
        onClick={() => nav(path)}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
