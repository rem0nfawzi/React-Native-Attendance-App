import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import Student from './Student';
import {getStudents, deleteStudents, addStudent} from '../../database/students';
import realm from '../../database/students';
import styles from '../styles/global';
import RNFS from 'react-native-fs';
const path = RNFS.ExternalStorageDirectoryPath;
import DocumentPicker from 'react-native-document-picker';

const Students = ({nav}) => {
  const [result, setResult] = useState('');
  const [studentsList, setStudentsList] = useState([]);
  useEffect(() => {
    getStudents().then(sts => {
      setStudentsList(sts);
    });
  }, []);

  const requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'SamaWay needs storage permissions',
          message:
            'SamaWay App needs access to your files ' +
            'so you can export and import khedma files.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const dataToCSV = array => {
    var str = '';
    for (var i = 0; i < array.length; i++) {
      var line = '';
      for (var index in array[i]) {
        if (line !== '') line += ',';
        line += array[i][index];
      }

      str += line + '\r\n';
    }
    return str;
  };
  const exportData = async () => {
    await requestStoragePermission();
    getStudents().then(students => {
      RNFS.writeFile(
        `${path}/SamaWay/mkhdomeen.csv`,
        dataToCSV(students),
        'utf8',
      )
        .then(success => {
          setResult('تم إستخراج البيانات بنجاح!');
          setTimeout(() => {
            setResult('');
          }, 3000);
        })
        .catch(err => {
          // create directory first
          RNFS.mkdir(`${path}/SamaWay`)
            .then(() => {
              RNFS.writeFile(
                `${path}/SamaWay/mkhdomeen.csv`,
                dataToCSV(students),
                'utf8',
              ).then(success => {
                setResult('تم إستخراج البيانات بنجاح!');
                setTimeout(() => {
                  setResult('');
                }, 3000);
              });
            })
            .catch(err => console.log(err));
        });
    });
  };

  const importData = async () => {
    await requestStoragePermission();
    // Pick a single file
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      var p = res.uri;
      var content = await RNFS.readFile(p, 'utf8');
      content = content.replace(/(\r\n|\n|\r)/gm, ',');

      content = content.split(',');
      deleteStudents()
        .then(() => {
          let importedData = [];
          let s = {};
          for (let i = 0; i < content.length; i++) {
            if (i % 8 === 0) {
              s = {};
              s.id = parseInt(content[i]);
            } else if (i % 8 === 1) {
              s.name = content[i];
            } else if (i % 8 === 2) {
              s.address = content[i];
            } else if (i % 8 === 3) {
              s.phone1 = content[i];
            } else if (i % 8 === 4) {
              s.phone2 = content[i];
            } else if (i % 8 === 5) {
              s.dateOfBirth = content[i];
            } else if (i % 8 === 6) {
              s.fatherOfConfession = content[i];
            } else {
              s.notes = content[i];
              importedData.push(s);
              addStudent(s);
            }
          }
          // console.log(importedData);
          setStudentsList(importedData);
        })
        .catch(err => console.log(err));
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
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
          <TouchableOpacity style={styles.btnWrap} onPress={importData}>
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
