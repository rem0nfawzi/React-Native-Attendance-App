import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import arrow from '../../assets/images/arrow.png';
const Header = ({title, nav, navTo}) => {
  const styles = StyleSheet.create({
    header: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#1a894b',
      paddingRight: 25,
    },
    arrowWrap: {
      width: 60,
      height: 60,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#187f45',
    },
    arrow: {
      width: 25,
      height: 25,
    },
    title: {
      color: '#eee',
      fontFamily: 'Almarai-Bold',
      textAlign: 'right',
      fontSize: 19,
    },
  });
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.arrowWrap}
        onPress={() => nav.push(navTo)}>
        <Image source={arrow} style={styles.arrow} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default Header;
