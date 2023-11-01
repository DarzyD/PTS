import psycopg2

conn = psycopg2.connect(
    database="postgres",
    user="rwxbvope",
    password="9DxJRIbWcd74Wu7OJX6wA0yUxe5BcMUk",
    host="10.50.150.136",
    port='5432'
)
curr = conn.cursor()
conn.autocommit = True


#SQL query strings to create tables:
patientsTable = """
CREATE TABLE patients (
    patientUsername varchar(50) PRIMARY KEY,
    firstName varchar(50),
    lastName varchar(50),
    middleInitial char,
    dob varchar(10),
    sex char,
    ssn int,
    address varchar(200),
    city varchar(100),
    state varchar(20),
    zipcode varchar(10),
    phoneNumber int,
    email varchar(100),
    password varchar(100),
    doctorUsername varchar(50) REFERENCES doctors(doctorUsername)
);
"""

doctorsTable = """
CREATE TABLE doctors (
    doctorUsername varchar(50) PRIMARY KEY,
    firstName varchar(50),
    lastName varchar(50),
    middleInitial char,
    dob varchar(10),
    sex char,
    ssn varchar(11),
    address varchar(200),
    city varchar(100),
    state varchar(20),
    zipcode varchar(10),
    phoneNumber int,
    email varchar(100),
    password varchar(100),
    npi int
);
"""

appointmentsTable = """
CREATE TABLE appointments (
    patientUsername varchar(50) REFERENCES patients(patientUsername),
    doctorUsername varchar(50) REFERENCES doctors(doctorUsername),
    time int,
    date varchar(10)
);
"""

documentsTable = """
CREATE TABLE documents (
    patientUsername varchar(50) REFERENCES patients(patientUsername),
    docid int PRIMARY KEY,
    documentName varchar(100),
    linkToDoc varchar(100)
);
"""


def delete_main_tables():
    curr.execute("DROP TABLE patients")
    curr.execute("DROP TABLE doctors")    
    curr.execute("DROP TABLE appointments")
    curr.execute("DROP TABLE documents")


def create_main_tables():
    curr.execute(patientsTable)
    curr.execute(doctorsTable)
    curr.execute(appointmentsTable)
    curr.execute(documentsTable)


delete_main_tables()
create_main_tables()

