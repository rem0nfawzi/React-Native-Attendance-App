import Realm from 'realm';
export const STUDENT_SCHEMA = 'StudentSchema';
export const ATTENDANCE_SCHEMA = 'AttendanceSchema';
export const RECORD_SCHEMA = 'RecordSchema';

// Model
export const StudentSchema = {
  name: STUDENT_SCHEMA,
  primaryKey: 'id',
  properties: {
    id: 'int',
    name: {type: 'string'},
    address: {type: 'string'},
    phone1: {type: 'string'},
    phone2: {type: 'string'},
    dateOfBirth: {type: 'string'},
    fatherOfConfession: {type: 'string'},
    notes: {type: 'string'},
  },
};

export const RecordSchema = {
  name: 'Record',
  properties: {
    id: 'int',
    attend: {type: 'bool'},
  },
};
export const AttendanceSchema = {
  name: ATTENDANCE_SCHEMA,
  primaryKey: 'id',
  properties: {
    id: 'int',
    time: {type: 'string'},
    students: 'Record[]',
  },
};

const databaseOptions = {
  path: 'chattendance.realm',
  schema: [StudentSchema, AttendanceSchema, RecordSchema],
  schemaVersion: 0,
};

export const addStudent = newStudent =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          realm.create(STUDENT_SCHEMA, newStudent);
        });
        resolve(true);
      })
      .catch(err => reject(err));
  });

export const getStudents = () =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        let students = realm.objects(STUDENT_SCHEMA);
        resolve(students);
      })
      .catch(error => {
        reject(error);
      });
  });

export const getStudent = id =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        let student = realm.objectForPrimaryKey(STUDENT_SCHEMA, id);
        resolve(student);
      })
      .catch(error => {
        reject(error);
      });
  });

export const addAttendance = newAttendance =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          realm.create(ATTENDANCE_SCHEMA, newAttendance);
        });
        resolve(true);
      })
      .catch(err => reject(err));
  });

export const getAttends = () =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        let attends = realm.objects(ATTENDANCE_SCHEMA);
        resolve(attends);
      })
      .catch(error => {
        reject(error);
      });
  });

export default new Realm(databaseOptions);
