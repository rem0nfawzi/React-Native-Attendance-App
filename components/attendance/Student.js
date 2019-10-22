import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import Tick from '../../assets/images/tick.png';
const Student = ({name, id, addAttend, removeAttend}) => {
  const [checked, setChecked] = useState(false);
  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#1d9b55',
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 15,
      paddingRight: 15,
      borderRadius: 5,
      marginLeft: 7,
      marginRight: 7,
      marginTop: 5,
      marginBottom: 5,
      flex: 1,
      flexDirection: 'row-reverse',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    name: {
      color: '#fff',
      fontSize: 15,
      maxWidth: 100,
      fontFamily: 'Almarai-Regular',
    },
    btn: {
      width: 50,
      height: 50,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
      backgroundColor: '#ff8e57',
    },
    img: {
      width: 15,
      height: 15,
    },
  });
  const handleClick = () => {
    if (checked) {
      removeAttend(id);
    } else {
      addAttend(id);
    }
    setChecked(!checked);
  };
  return (
    <TouchableOpacity style={styles.container} onPress={handleClick}>
      <Text style={styles.name}>{name}</Text>
      <View
        style={
          checked
            ? {...styles.btn, opacity: 1}
            : {...styles.btn, opacity: 0.2, backgroundColor: '#fff'}
        }>
        <Image style={{...styles.img}} source={Tick} />
      </View>
    </TouchableOpacity>
  );
};

export default Student;
