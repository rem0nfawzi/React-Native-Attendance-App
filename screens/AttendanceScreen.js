import React, {Component} from 'react';
import {
  View,
  Platform,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Header from '../components/common/Header';
import styles from '../components/styles/global';
// import StudentsList from '../components/attendance/StudentsList';
import {getStudents, getAttends, addAttendance} from '../database/students';
import Student from '../components/attendance/Student';
import realm from 'realm';
import SelectBox from '../components/attendance/SelectBox';
import calendar from '../assets/images/calendar.png';

export default class AttendanceScreen extends Component {
  state = {
    date: new Date(),
    mode: 'date',
    show: false,
    students: [],
    attends: 0,
    result: '',
    attendance: {
      type: 'خدمة',
      id: 0,
      time: '',
      day: '',
      students: [],
    },
  };

  setDate = (event, date) => {
    date = date || this.state.date;
    let dayName = '';
    switch (date.getDay()) {
      case 5:
        dayName = 'الجمعة';
        break;
      case 6:
        dayName = 'السبت';
        break;
      case 0:
        dayName = 'الأحد';
        break;
      case 1:
        dayName = 'الأثنين';
        break;
      case 2:
        dayName = 'الثلثاء';
        break;
      case 3:
        dayName = 'الأربعاء';
        break;
      case 4:
        dayName = 'الخميس';
        break;
    }
    console.log(date.getDay());
    this.setState({
      show: Platform.OS === 'ios' ? true : false,
      date,
      attendance: {...this.state.attendance, day: dayName},
    });
  };

  show = mode => {
    this.setState({
      show: true,
      mode,
    });
  };

  datepicker = () => {
    this.show('date');
  };

  timepicker = () => {
    this.show('time');
  };
  componentDidMount() {
    getStudents().then(s => {
      let a = [];
      for (let i = 0; i < s.length; i++) {
        a.push({id: s[i].id, attend: false});
      }
      this.setState({
        students: s,
        attendance: {
          ...this.state.attendance,
          students: a,
        },
      });
    });

    let dayName = '';
    let date = new Date();
    switch (date.getDay()) {
      case 5:
        dayName = 'الجمعة';
        break;
      case 6:
        dayName = 'السبت';
        break;
      case 0:
        dayName = 'الأحد';
        break;
      case 1:
        dayName = 'الأثنين';
        break;
      case 2:
        dayName = 'الثلثاء';
        break;
      case 3:
        dayName = 'الأربعاء';
        break;
      case 4:
        dayName = 'الخميس';
        break;
    }
    getAttends().then(a => {
      this.setState({
        attendance: {
          ...this.state.attendance,
          day: dayName,
          id: a.length || 0,
        },
      });
    });
  }

  addAttend = id => {
    this.setState({
      attendance: {
        ...this.state.attendance,
        students: this.state.attendance.students.map(s => {
          if (s.id === id) {
            return {...s, attend: true};
          } else {
            return s;
          }
        }),
      },
      attends: this.state.attends + 1,
    });
  };
  removeAttend = id => {
    this.setState({
      attendance: {
        ...this.state.attendance,
        students: this.state.attendance.students.map(s => {
          if (s.id === id) {
            return {...s, attend: false};
          } else {
            return s;
          }
        }),
      },
      attends: this.state.attends - 1,
    });
  };
  handleSubmit = () => {
    this.setState(
      {
        attendance: {
          ...this.state.attendance,
          time: `${this.state.date.getDate()} - ${this.state.date.getMonth() +
            1} - ${this.state.date.getFullYear()}`,
        },
      },
      () => {
        addAttendance(this.state.attendance);
        getAttends().then(a => {
          this.setState({
            attendance: {
              ...this.state.attendance,
              id: a.length || 0,
            },
          });
        });
        this.setState({
          result: 'تم الحفظ بنجاح!',
        });
      },
    );
  };
  handleTypeChange = type => {
    this.setState({
      attendance: {
        ...this.state.attendance,
        type,
      },
    });
  };
  render() {
    const {show, date, mode} = this.state;

    return (
      <View>
        <Header title="تسجيل الحضور" nav={this.props.navigation} navTo="Home" />
        <ScrollView style={styles.containerWrap}>
          <View style={styles.container}>
            <View>
              <SelectBox
                handleTypeChange={this.handleTypeChange}
                type={this.state.attendance.type}
              />
            </View>

            <TouchableOpacity
              onPress={this.datepicker}
              style={{
                ...styles.btnWrap,
                marginBottom: 20,
                position: 'relative',
              }}>
              <View
                style={{
                  position: 'absolute',
                  right: 20,
                  top: 0,
                  bottom: 0,
                  display: 'flex',
                  justifyContent: 'center',
                }}>
                <Image
                  source={calendar}
                  style={{
                    width: 24,
                    height: 24,
                  }}
                />
              </View>
              <Text
                style={styles.btnText}>{`${date.getDate()} - ${date.getMonth() +
                1} - ${date.getFullYear()}`}</Text>
            </TouchableOpacity>
            {show && (
              <DateTimePicker
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={this.setDate}
              />
            )}

            {this.state.students.map(student => {
              return (
                <Student
                  name={student.name}
                  key={student.id}
                  id={student.id}
                  addAttend={this.addAttend}
                  removeAttend={this.removeAttend}
                />
              );
            })}

            <View>
              <TouchableOpacity
                style={styles.btnWrap}
                onPress={this.handleSubmit}>
                <Text style={styles.btnText}>حفظ</Text>
              </TouchableOpacity>
              <Text style={{...styles.result, marginBottom: 10}}>
                {this.state.result}
              </Text>
            </View>

            <View
              style={{
                marginBottom: 150,
              }}>
              <Text
                style={{
                  textAlign: 'right',
                  fontSize: 15,
                  color: '#fff',
                  fontFamily: 'Almarai-Regular',
                  textAlign: 'right',
                }}>
                الحاضرون: {this.state.attends}
              </Text>
              <Text
                style={{
                  textAlign: 'right',
                  fontSize: 15,
                  color: '#fff',
                  fontFamily: 'Almarai-Regular',
                  textAlign: 'right',
                }}>
                العدد الكلي: {this.state.students.length}
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
