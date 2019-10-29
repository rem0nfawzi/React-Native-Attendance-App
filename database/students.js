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
    type: {type: 'string'},
    day: {type: 'string'},
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

export const updateStudent = newStudent =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        let student = realm.objectForPrimaryKey(STUDENT_SCHEMA, newStudent.id);
        realm.write(() => {
          student.name = newStudent.name;
          student.address = newStudent.address;
          student.phone1 = newStudent.phone1;
          student.phone2 = newStudent.phone2;
          student.dateOfBirth = newStudent.dateOfBirth;
          student.fatherOfConfession = newStudent.fatherOfConfession;
          student.notes = newStudent.notes;
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

export const deleteStudents = () =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        let students = realm.objects(STUDENT_SCHEMA);
        realm.write(() => {
          realm.delete(students);
        });
        resolve(true);
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

export const deleteStudent = id =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        let student = realm.objectForPrimaryKey(STUDENT_SCHEMA, id);
        realm.write(() => {
          realm.delete(student);
        });
        resolve();
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

export const deleteAttends = () =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        let attends = realm.objects(ATTENDANCE_SCHEMA);
        realm.write(() => {
          realm.delete(attends);
        });
        resolve(true);
      })
      .catch(error => {
        reject(error);
      });
  });
export default new Realm(databaseOptions);
