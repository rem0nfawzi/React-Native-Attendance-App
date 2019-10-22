import React, {useState, useEffect} from 'react';
import {ScrollView, View, Text, TouchableOpacity} from 'react-native';
import {getAttends} from '../../database/students';
import styles from '../styles/global';

const DatesList = ({nav}) => {
  const [attends, setAttends] = useState([]);
  useEffect(() => {
    getAttends().then(a => {
      let at = [];
      for (let i = a.length - 1; i >= 0; i--) at.push(a[i]);
      setAttends(at);
    });
  }, []);
  return (
    <ScrollView style={styles.containerWrap}>
      <View style={{...styles.container, paddingBottom: 150}}>
        {attends.map(a => (
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
              {a.time}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default DatesList;
