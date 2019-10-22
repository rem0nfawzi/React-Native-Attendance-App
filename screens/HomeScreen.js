import React from 'react';
import {ScrollView, View, Image, Text, TouchableOpacity} from 'react-native';
import styles from '../components/styles/global';
import Cross from '../assets/images/cross.png';

const HomeScreen = ({navigation: {push}}) => {
  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          paddingTop: 80,
          paddingBottom: 30,
        }}>
        <Image source={Cross} style={{width: 150, height: 150}} />
        <Text
          style={{
            marginTop: 20,
            fontSize: 16,
            color: '#fff',
            fontFamily: 'Almarai-Regular',
          }}>
          " أَخْدِمُ الرَّبَّ بِكُلِّ تَوَاضُعٍ وَدُمُوعٍ كَثِيرَةٍ "
        </Text>
        <Text
          style={{
            marginTop: 2,
            fontSize: 13,
            color: '#fff',
            fontFamily: 'Almarai-Regular',
          }}>
          (أعمال الرسل 20: 19)
        </Text>
      </View>
      <View style={styles.list}>
        <TouchableOpacity
          style={styles.btnWrap}
          onPress={() => push('Students')}>
          <Text style={styles.btnText}>المخدومين</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnWrap}
          onPress={() => push('Attendance')}>
          <Text style={styles.btnText}>تسجيل الحضور</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnWrap}
          onPress={() => push('OldAttends')}>
          <Text style={styles.btnText}>حضور المرات السابقة</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
