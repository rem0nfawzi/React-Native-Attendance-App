import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {getStudents} from '../../database/students';
import realm from '../../database/students';
import Student from './Student';

const StudentsList = ({setAttendance}) => {
  const [studentsAttendance, setStudentsAttendance] = useState([]);
  const [studentsList, setStudentsList] = useState([]);
  useEffect(() => {
    getStudents().then(sts => {
      setStudentsList(sts);
      let a = [];
      for (let i = 0; i < sts.length; i++) {
        a.push({id: sts[i].id, attend: false});
      }
      setStudentsAttendance(a);
    });
  }, []);

  const addAttendStudent = id => {
    setStudentsAttendance(
      studentsAttendance.map(s => (s.id === id ? {...s, attend: true} : s)),
    );
  };
  const removeAttendStudent = id => {
    setStudentsAttendance(
      studentsAttendance.map(s => (s.id === id ? {...s, attend: false} : s)),
    );
  };
  useEffect(() => {
    setAttendance(studentsAttendance);
  }, [studentsAttendance]);
  return (
    <View>
      {studentsList.map(student => {
        return (
          <Student
            name={student.name}
            key={student.id}
            addAttend={addAttendStudent}
            removeAttend={removeAttendStudent}
            id={student.id}
          />
        );
      })}
    </View>
  );
};

export default StudentsList;
