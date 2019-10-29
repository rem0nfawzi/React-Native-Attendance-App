import React from 'react';
import {View} from 'react-native';
import Header from '../components/common/Header';
import DatesList from '../components/oldAttends/DatesList';
import {AndroidBackHandler} from 'react-navigation-backhandler';

const OldAttendsScreen = ({navigation}) => {
  const onBackButtonPressAndroid = () => {
    navigation.navigate('Home');
    return true;
  };
  return (
    <AndroidBackHandler onBackPress={onBackButtonPressAndroid}>
      <View>
        <Header title="حضور المرات السابقة" nav={navigation} navTo="Home" />
        <DatesList nav={navigation} />
      </View>
    </AndroidBackHandler>
  );
};

export default OldAttendsScreen;
