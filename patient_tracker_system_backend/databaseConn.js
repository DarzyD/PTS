import pg from "pg";
import dotenv from "dotenv";
dotenv.config();
const dbURL = `postgres://${process.env.USER}:${process.env.PASS}@suleiman.db.elephantsql.com/${process.env.USER}`;

const db = new pg.Client(dbURL);
db.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres', err);
    }
});
export default db;

const patientsTable = `CREATE TABLE patients(patientUsername varchar(50), 
firstName varchar(50), lastName varChar(50), middleInitial varchar(50), dob varchar(10), 
sex varchar(50), ssn BIGINT, address varchar(200), city varchar(100), state varchar(20), zipcode varchar(10),
phoneNumber BIGINT, email varchar(100), password varchar(100), doctorUsername varchar(50) REFERENCES doctors(doctorUsername),
PRIMARY KEY(patientUsername));`;

const doctorsTable = `CREATE TABLE doctors(doctorUsername varchar(50), 
firstName varchar(50), lastName varChar(50), middleInitial varchar(50), dob varchar(10), 
sex varchar(50), ssn BIGINT, address varchar(200), city varchar(100), state varchar(20), zipcode varchar(10),
phoneNumber BIGINT, email varchar(100), password varchar(100), npi BIGINT,
PRIMARY KEY(doctorUsername));`;

const appointmentsTable = `CREATE TABLE appointments(patientUsername varchar(50) REFERENCES patients(patientUsername), 
doctorUsername varchar(50) REFERENCES doctors(doctorUsername),
time BIGINT, date varchar(10));`;

const documentsTable = `CREATE TABLE documents(patientUsername varchar(50) REFERENCES patients(patientUsername), 
docid BIGINT, documentName varchar(100), linkToDoc varchar(100),
PRIMARY KEY(docid));`;

const adminTable = `CREATE TABLE admins(adminUsername varchar(50), password varchar(50), PRIMARY KEY(adminUsername));`
// export function test(){
//     const client = new pg.Client(dbURL);
//     client.connect(function(err) {
//         if(err) {
//           return console.error('could not connect to postgres', err);
//         }
//         client.query('SELECT * FROM DOCTORS;', function(err, result) {
//           if(err) {
//             return console.error('error running query', err);
//           }
//           console.log(result);
//           //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
//           client.end();
//         });
//       });
// }

// export function initializeDatabase(){
//     const client = new pg.Client(dbURL);
//     client.connect(async function(err) {
//       if(err) {
//         return console.error('Could not connect to postgres', err);
//       }
//       await client.query(patientsTable, function(err, result) {
//         if(err) {
//           return console.error('error running patient creation query', err);
//         }
//       });
//       await client.query(doctorsTable, function(err, result) {
//         if(err) {
//           return console.error('error running doctor creation query', err);
//         }
//       });
//       await client.query(appointmentsTable, function(err, result) {
//         if(err) {
//           return console.error('error running appointment creation query', err);
//         }
//       });
//       await client.query(documentsTable, function(err, result) {
//         if(err) {
//           return console.error('error running documents creation query', err);
//         }
//       });
//      client.end();
//     });
// }
// export function dropTables() {
//     const client = new pg.Client(dbURL);
//     client.connect(async function (err) {
//         if (err) {
//             return console.error('Could not connect to PostgreSQL', err);
//         }
        
//         const tables = ['patients', 'doctors', 'appointments', 'documents'];
        
//         tables.forEach(async function (table) {
//             const dropQuery = `DROP TABLE IF EXISTS ${table} CASCADE;`;
            
//             await client.query(dropQuery, function (err, result) {
//                 if (err) {
//                     return console.error(`Error dropping table ${table}`, err);
//                 }
//                 console.log(`Dropped table ${table}`);
//             });
//         });

//         client.end(); // Close the connection here
//     });
// }


// export default { db, test, initializeDatabase, dropTables };
