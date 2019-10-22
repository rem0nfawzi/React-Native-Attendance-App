import React from 'react';
import {View} from 'react-native';
import Header from '../components/common/Header';
import Students from '../components/students/Students';
const StudentsScreen = ({navigation}) => {
  return (
    <View>
      <Header title="المخدومين" nav={navigation} />
      <Students nav={navigation} />
    </View>
  );
};

export default StudentsScreen;
