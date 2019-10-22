import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, StyleSheet, Image} from 'react-native';
import styles from '../styles/global';
import {getStudents} from '../../database/students';
import Tick from '../../assets/images/tick.png';
const AttendanceDetails = ({attendance}) => {
  const [attends, setAttends] = useState([]);
  const [absents, setAbsents] = useState([]);
  useEffect(() => {
    if (attendance !== null) {
      getStudents().then(students => {
        let st = students;
        let a = [];
        let b = [];
        for (let i = 0; i < attendance.students.length; i++) {
          let name = '';
          for (let j = 0; j < st.length; j++) {
            if (st[j].id === attendance.students[i].id) {
              name = st[j].name;
              break;
            }
          }
          if (attendance.students[i].attend) {
            a.push(name);
          } else {
            b.push(name);
          }
        }
        setAttends(a);
        setAbsents(b);
      });
    }
  }, [attendance]);

  const customStyles = StyleSheet.create({
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
  return (
    <ScrollView style={styles.containerWrap}>
      <View style={{...styles.container, marginBottom: 150}}>
        <Text
          style={{
            ...styles.btnText,
            textAlign: 'right',
            marginTop: 30,
            paddingRight: 10,
            marginBottom: 5,
          }}>
          الغائبون
        </Text>

        {absents.map((name, index) => {
          return (
            <View style={customStyles.container} key={index}>
              <Text style={customStyles.name}>{name}</Text>
              <View
                style={{
                  ...customStyles.btn,
                  opacity: 0.2,
                  backgroundColor: '#fff',
                }}>
                <Image style={{...customStyles.img}} source={Tick} />
              </View>
            </View>
          );
        })}

        <Text
          style={{
            ...styles.btnText,
            textAlign: 'right',
            paddingRight: 10,
            marginBottom: 5,
            marginTop: 20,
          }}>
          الحاضرون
        </Text>

        {attends.map((name, index) => {
          return (
            <View style={customStyles.container} key={index}>
              <Text style={customStyles.name}>{name}</Text>
              <View style={{...customStyles.btn, opacity: 1}}>
                <Image style={{...customStyles.img}} source={Tick} />
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default AttendanceDetails;
