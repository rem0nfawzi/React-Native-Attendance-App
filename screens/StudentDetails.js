import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import Header from '../components/common/Header';
import styles from '../components/styles/global';
import studentIcon from '../assets/images/user.png';
import addressIcon from '../assets/images/location.png';
import phoneIcon from '../assets/images/phone.png';
import birthdayIcon from '../assets/images/birthday.png';
import popeIcon from '../assets/images/pope.png';
import {deleteStudent} from '../database/students';
import {AndroidBackHandler} from 'react-navigation-backhandler';

const StudentDetails = ({navigation}) => {
  const [student, setStudent] = useState({
    id: 0,
    name: '',
    address: '',
    dateOfBirth: '',
    fatherOfConfession: '',
    phone1: '',
    phone2: '',
    notes: '',
  });
  useEffect(() => {
    let s = navigation.getParam('student');
    setStudent(s);
  }, []);
  const onBackButtonPressAndroid = () => {
    navigation.navigate('Students');
    return true;
  };
  const customStyles = StyleSheet.create({
    itemWrap: {
      paddingTop: 15,
      paddingBottom: 15,
      paddingLeft: 20,
      paddingRight: 20,
      marginLeft: 7,
      marginRight: 7,
      marginTop: 5,
      marginBottom: 5,
      backgroundColor: '#1d9b55',
      borderRadius: 5,
      display: 'flex',
      flexDirection: 'row-reverse',
      alignItems: 'center',
    },
    itemIcon: {
      width: 30,
      height: 30,
      marginLeft: 15,
    },
    itemText: {
      color: '#fff',
      fontSize: 15,
      fontFamily: 'Almarai-Regular',
      textAlign: 'right',
    },
    note: {
      color: '#fff',
      fontSize: 15,
      fontFamily: 'Almarai-Regular',
      textAlign: 'right',
    },
  });

  const delStudent = () => {
    deleteStudent(student.id).then(() => {
      navigation.push('Students');
    });
  };
  return (
    <AndroidBackHandler onBackPress={onBackButtonPressAndroid}>
      <View>
        <Header title="بيانات المخدوم" nav={navigation} navTo="Students" />
        <ScrollView style={styles.container}>
          <View style={customStyles.itemWrap}>
            <Image source={studentIcon} style={customStyles.itemIcon} />
            <Text style={customStyles.itemText}>{student.name}</Text>
          </View>

          <View style={customStyles.itemWrap}>
            <Image source={addressIcon} style={customStyles.itemIcon} />
            <Text style={customStyles.itemText}>{student.address}</Text>
          </View>

          <View style={customStyles.itemWrap}>
            <Image source={phoneIcon} style={customStyles.itemIcon} />
            <Text style={customStyles.itemText}>{student.phone1}</Text>
          </View>

          <View style={customStyles.itemWrap}>
            <Image source={phoneIcon} style={customStyles.itemIcon} />
            <Text style={customStyles.itemText}>{student.phone2}</Text>
          </View>

          <View style={customStyles.itemWrap}>
            <Image source={birthdayIcon} style={customStyles.itemIcon} />
            <Text style={customStyles.itemText}>{student.dateOfBirth}</Text>
          </View>

          <View style={customStyles.itemWrap}>
            <Image source={popeIcon} style={customStyles.itemIcon} />
            <Text style={customStyles.itemText}>
              {student.fatherOfConfession}
            </Text>
          </View>

          <View
            style={{
              paddingTop: 15,
              paddingBottom: 15,
              paddingLeft: 20,
              paddingRight: 20,
              marginLeft: 7,
              marginRight: 7,
              marginTop: 5,
              marginBottom: 5,
              backgroundColor: '#1d9b55',
              borderRadius: 5,
              display: 'flex',
              flexDirection: 'column',
            }}>
            <Text style={{...customStyles.itemText, marginBottom: 10}}>
              ملاحظات خاصة بالمخدوم
            </Text>
            {student.notes
              .trim()
              .split('.')
              .map((s, index) => (
                <Text style={customStyles.itemText} key={index}>
                  {s.trim()}
                </Text>
              ))}
          </View>

          <View style={{paddingTop: 5, paddingBottom: 150}}>
            <TouchableOpacity
              style={styles.btnWrap}
              onPress={() =>
                navigation.push('UpdateStudent', {student: student})
              }>
              <Text style={styles.btnText}>تعديل البيانات</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnWrap} onPress={delStudent}>
              <Text style={styles.btnText}>حذف</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </AndroidBackHandler>
  );
};

export default StudentDetails;
