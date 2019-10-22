import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import Header from '../components/common/Header';
import AttendanceDetails from '../components/oldAttends/AttendanceDetails';
const AttendanceDetailsScreen = ({navigation}) => {
  const [attendance, setAttendance] = useState({loaded: false});
  useEffect(() => {
    setAttendance({...navigation.getParam('attendance'), loaded: true});
  }, []);
  return (
    <View>
      <Header
        title={attendance.loaded ? attendance.time : ''}
        nav={navigation}
      />
      {attendance.loaded ? (
        <AttendanceDetails attendance={attendance.loaded ? attendance : null} />
      ) : null}
    </View>
  );
};

export default AttendanceDetailsScreen;
