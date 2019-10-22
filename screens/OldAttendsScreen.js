import React from 'react';
import {View} from 'react-native';
import Header from '../components/common/Header';
import DatesList from '../components/oldAttends/DatesList';
const OldAttendsScreen = ({navigation}) => {
  return (
    <View>
      <Header title="حضور المرات السابقة" nav={navigation} />
      <DatesList nav={navigation} />
    </View>
  );
};

export default OldAttendsScreen;
