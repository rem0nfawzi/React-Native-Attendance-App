import React, {useEffect} from 'react';
import {View} from 'react-native';
import Header from '../components/common/Header';
import Students from '../components/students/Students';
import {AndroidBackHandler} from 'react-navigation-backhandler';

const StudentsScreen = ({navigation}) => {
  const onBackButtonPressAndroid = () => {
    navigation.navigate('Home');
    return true;
  };
  return (
    <AndroidBackHandler onBackPress={onBackButtonPressAndroid}>
      <View>
        <Header title="المخدومين" nav={navigation} navTo="Home" />
        <Students nav={navigation} />
      </View>
    </AndroidBackHandler>
  );
};

export default StudentsScreen;
