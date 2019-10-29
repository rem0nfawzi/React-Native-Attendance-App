import React, {useState, useEffect} from 'react';
import {ScrollView, View, Text, TouchableOpacity} from 'react-native';
import {getAttends, deleteAttends} from '../../database/students';
import styles from '../styles/global';

const DatesList = ({nav}) => {
  const [recordsFound, setRecordsFound] = useState(false);
  const [attends, setAttends] = useState([]);
  useEffect(() => {
    getAttends().then(a => {
      let at = [];
      for (let i = a.length - 1; i >= 0; i--) at.push(a[i]);
      setAttends(at);
      if (at.length !== 0) setRecordsFound(true);
    });
  }, []);

  const handleDelete = () => {
    deleteAttends().then(() => {
      setAttends([]);
    });
  };
  return (
    <ScrollView style={styles.containerWrap}>
      <View style={{...styles.container, paddingBottom: 150}}>
        {!recordsFound && (
          <Text style={{...styles.label, textAlign: 'center'}}>
            لا يوجد تسجيلات سابقة
          </Text>
        )}
        {recordsFound && <Text style={styles.title}>الخدمة</Text>}
        {attends.map(
          a =>
            a.type === 'خدمة' && (
              <TouchableOpacity
                key={a.id}
                style={styles.listItemWrap}
                onPress={() => nav.push('attendanceDetails', {attendance: a})}>
                <Text
                  style={{
                    ...styles.listItemText,
                    textAlign: 'center',
                    fontSize: 18,
                  }}>
                  {` ${a.day}  ( ${a.time} )`}
                </Text>
              </TouchableOpacity>
            ),
        )}

        {recordsFound && (
          <Text style={{...styles.title, marginTop: 15}}>الإفتقاد</Text>
        )}
        {attends.map(
          a =>
            a.type === 'إفتقاد' && (
              <TouchableOpacity
                key={a.id}
                style={styles.listItemWrap}
                onPress={() => nav.push('attendanceDetails', {attendance: a})}>
                <Text
                  style={{
                    ...styles.listItemText,
                    textAlign: 'center',
                    fontSize: 18,
                  }}>
                  {` ${a.day}  ( ${a.time} )`}
                </Text>
              </TouchableOpacity>
            ),
        )}
        <TouchableOpacity style={styles.btnWrap} onPress={handleDelete}>
          <Text style={styles.btnText}>حذف الكل</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default DatesList;
