import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
const Student = ({name, student, nav}) => {
  return (
    <TouchableOpacity
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
      }}
      onPress={() => nav.navigate('StudentDetails', {student: student})}>
      <Text
        style={{color: '#fff', fontSize: 16, fontFamily: 'Almarai-Regular'}}>
        {name}
      </Text>
    </TouchableOpacity>
  );
};

export default Student;
