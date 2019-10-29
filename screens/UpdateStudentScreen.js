import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  View,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';
import {updateStudent} from '../database/students';
import gStyles from '../components/styles/global';
import realm from '../database/students';
import Header from '../components/common/Header';
import styles from '../components/styles/global';
import {AndroidBackHandler} from 'react-navigation-backhandler';

const UpdateStudentScreen = ({navigation}) => {
  const [student, setStudent] = useState({
    id: 0,
    name: '',
    address: '',
    dateOfBirth: '',
    fatherOfConfession: '',
    phone1: '',
    phone2: '',
    notes: '',
  });
  useEffect(() => {
    setStudent(navigation.getParam('student'));
  }, []);
  const onBackButtonPressAndroid = () => {
    navigation.navigate('Students');
    return true;
  };
  const [namEntered, setNameEntered] = useState(true);
  const handleSubmit = () => {
    if (student.name === '') {
      setNameEntered(false);
    } else {
      setNameEntered(true);
      updateStudent(student).then(() => {
        navigation.push('Students');
      });
    }
  };
  return (
    <AndroidBackHandler onBackPress={onBackButtonPressAndroid}>
      <View>
        <Header
          title="تعديل بيانات المخدوم"
          nav={navigation}
          navTo="Students"
        />

        <ScrollView style={styles.containerWrap}>
          <View style={styles.container}>
            <View style={styles.inputWrap}>
              <Text style={styles.label}>الإسم</Text>
              <TextInput
                style={
                  !namEntered
                    ? {...styles.input, borderWidth: 2, borderColor: '#ffae35'}
                    : styles.input
                }
                onChangeText={text => setStudent({...student, name: text})}
                value={student.name}
              />
              {!namEntered && (
                <Text style={{...styles.label, color: '#000', marginTop: 5}}>
                  من فضلك أدخل إسم المخدوم
                </Text>
              )}
            </View>

            <View style={styles.inputWrap}>
              <Text style={styles.label}>العنوان</Text>
              <TextInput
                style={styles.input}
                onChangeText={text => setStudent({...student, address: text})}
                value={student.address}
              />
            </View>

            <View style={styles.inputWrap}>
              <Text style={styles.label}>الموبايل 1</Text>
              <TextInput
                style={styles.input}
                onChangeText={text => setStudent({...student, phone1: text})}
                value={student.phone1}
              />
            </View>

            <View style={styles.inputWrap}>
              <Text style={styles.label}>الموبايل 2</Text>
              <TextInput
                style={styles.input}
                onChangeText={text => setStudent({...student, phone2: text})}
                value={student.phone2}
              />
            </View>

            <View style={styles.inputWrap}>
              <Text style={styles.label}>تاريخ الميلاد</Text>
              <TextInput
                style={styles.input}
                onChangeText={text =>
                  setStudent({...student, dateOfBirth: text})
                }
                value={student.dateOfBirth}
              />
            </View>

            <View style={styles.inputWrap}>
              <Text style={styles.label}>أب الإعتراف</Text>
              <TextInput
                style={styles.input}
                onChangeText={text =>
                  setStudent({...student, fatherOfConfession: text})
                }
                value={student.fatherOfConfession}
              />
            </View>

            <View style={styles.inputWrap}>
              <Text style={styles.label}>ملحوظات (ضع نقطة بعد كل ملحوظة)</Text>
              <TextInput
                style={styles.input}
                onChangeText={text => setStudent({...student, notes: text})}
                value={student.notes}
                multiline={true}
                numberOfLines={4}
              />
            </View>

            <View style={{paddingTop: 5, marginBottom: 150}}>
              <TouchableOpacity style={gStyles.btnWrap} onPress={handleSubmit}>
                <Text style={gStyles.btnText}>إضافة</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </AndroidBackHandler>
  );
};

export default UpdateStudentScreen;
