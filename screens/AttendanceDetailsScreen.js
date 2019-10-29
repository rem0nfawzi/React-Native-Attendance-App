import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import Header from '../components/common/Header';
import AttendanceDetails from '../components/oldAttends/AttendanceDetails';
import {AndroidBackHandler} from 'react-navigation-backhandler';

const AttendanceDetailsScreen = ({navigation}) => {
  const [attendance, setAttendance] = useState({loaded: false});
  useEffect(() => {
    setAttendance({...navigation.getParam('attendance'), loaded: true});
  }, []);
  const onBackButtonPressAndroid = () => {
    navigation.navigate('OldAttends');
    return true;
  };
  return (
    <AndroidBackHandler onBackPress={onBackButtonPressAndroid}>
      <View>
        <Header
          title={attendance.loaded ? attendance.time : ''}
          nav={navigation}
          navTo="OldAttends"
        />
        {attendance.loaded ? (
          <AttendanceDetails
            attendance={attendance.loaded ? attendance : null}
          />
        ) : null}
      </View>
    </AndroidBackHandler>
  );
};

export default AttendanceDetailsScreen;
