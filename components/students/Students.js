import React, {useEffect, useState} from 'react';
import {ScrollView, View, Text, TouchableOpacity} from 'react-native';
import Student from './Student';
import {getStudents} from '../../database/students';
import realm from '../../database/students';
import styles from '../styles/global';
import RNFS from 'react-native-fs';
const path = RNFS.ExternalStorageDirectoryPath + '/CHDATA.json';

const Students = ({nav}) => {
  const [result, setResult] = useState('');
  const [studentsList, setStudentsList] = useState([]);
  useEffect(() => {
    getStudents().then(sts => {
      setStudentsList(sts);
    });
  }, []);
  const exportData = () => {
    getStudents().then(students => {
      RNFS.writeFile(path, JSON.stringify(students), 'utf8')
        .then(success => {
          setResult('تم إستخراج البيانات بنجاح!');
          setTimeout(() => {
            setResult('');
          }, 3000);
        })
        .catch(err => {
          console.log(err.message);
        });
    });
  };
  return (
    <ScrollView style={styles.containerWrap}>
      <View style={styles.container}>
        {studentsList.map(student => {
          return (
            <Student
              name={student.name}
              student={student}
              key={student.id}
              nav={nav}
            />
          );
        })}
        <View style={{marginBottom: 150}}>
          <TouchableOpacity
            style={styles.btnWrap}
            onPress={() => nav.push('AddStudent')}>
            <Text style={styles.btnText}>إضافة مخدوم</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnWrap}>
            <Text style={styles.btnText}>إستيراد بيانات</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnWrap} onPress={exportData}>
            <Text style={styles.btnText}>إستخراج البيانات</Text>
          </TouchableOpacity>
          <Text style={styles.result}>{result}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default Students;
