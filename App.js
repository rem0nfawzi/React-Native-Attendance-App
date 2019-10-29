import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from './screens/HomeScreen';
import StudentsScreen from './screens/StudentsScreen';
import AddStudentScreen from './screens/AddStudentScreen';
import AttendanceScreen from './screens/AttendanceScreen';
import StudentDetails from './screens/StudentDetails';
import OldAttendsScreen from './screens/OldAttendsScreen';
import AttendanceDetailsScreen from './screens/AttendanceDetailsScreen';
import UpdateStudentScreen from './screens/UpdateStudentScreen';

const MainNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Students: StudentsScreen,
    AddStudent: AddStudentScreen,
    Attendance: AttendanceScreen,
    StudentDetails: StudentDetails,
    OldAttends: OldAttendsScreen,
    attendanceDetails: AttendanceDetailsScreen,
    UpdateStudent: UpdateStudentScreen,
  },
  {
    headerMode: 'none',
  },
);

export default createAppContainer(MainNavigator);
