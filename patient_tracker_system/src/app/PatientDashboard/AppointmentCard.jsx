'use client';
import react, {useState, useEffect} from 'react';
import {Card, CardBody, CardHeader, Divider} from "@nextui-org/react";
import {Button} from "@nextui-org/react";
import { useSession } from 'next-auth/react';

export const AppointmentCard = () => {

    const [myAppointments, setMyAppointments] = useState([]);

    const {data: session} = useSession();


    const useConfirm = (message, onConfirm, onAbort)  => {
    const confirm = () => {
        if (window.confirm(message)) {
            onConfirm();
        } else {
            onAbort();
        }
    }
    return confirm;
    }

    const fetchAppointments = async () => {
        //mimicking a fetch request
        const testData = {
            "appointments":[
                {
                    "doctorUsername": "testDoctor",
                    "date": "2023-12-13",
                    "time": "10:00AM",
                    "patientUsername": "testPatientOne"
                },
                {
                    "doctorUsername": "testDoctor",
                    "date": "2023-12-13",
                    "time": "11:00AM",
                    "patientUsername": "testPatientTwo"
        
                },
                {
                    "doctorUsername": "testDoctor",
                    "date": "2023-12-13",
                    "time": "12:00PM",
                    "patientUsername": "testPatientThree"
                },
                {
                    "doctorUsername": "testDoctor",
                    "date": "2023-12-14",
                    "time": "10:00AM",
                    "patientUsername": "testPatientOne"
        
                },
                {
                    "doctorUsername": "testDoctor",
                    "date": "2023-12-14",
                    "time": "11:00AM",
                    "patientUsername": "testPatientTwo"
        
                },
                {
                    "doctorUsername": "testDoctor",
                    "date": "2023-12-15",
                    "time": "12:00PM",
                    "patientUsername": "testPatientThree"
                }    
            ]
        }
        return testData;
    };

    const postNewDoctor = async (doc = {}) => {
        const {username: docUsername} = doc;
        const response = await fetch("http://localhost:3001/doctor", {
            method: "Post",
            headers: {
                "Content-Type": "application/json"
            },
            body: {
                user: session?.user?.username, 
                doctor: docUsername
            }
        })
        if (response.ok) {
            setMyDoctor(doc);
        }
    }

    useEffect(() => { //onPageLoad
        
        // const res = fetch("http://localhost:3001/doctor", {
        //     method: "GET",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
            
        // })
        // res.then((response) => {
        //     const resCode = response.status;
        //     response.json().then((doctors) => {
        //         if (resCode == 200 && doctors?.length) {
        //             setDoctors(doctors)
        //         }}
        //     )
        // })
        
        // const res2 = fetch("http://localhost:3001/doctor?user=" + session?.user?.username, {
        //     method: "GET",
        //     headers: {
        //         "Content-Type": "application/json"
        //     }            
        // })
        // res2.then((response) => {
        //     const res2Code = response.status;
        //     response.json().then((doc) => {
        //         if (res2Code == 200 && doc) {
        //             setDoctors(doc);
        //         }
        //     })
        // })

        const fetchData = async () => {
            const appointmentsData = await fetchAppointments();
            setMyAppointments(appointmentsData.appointments);
        };

        fetchData();
    }, [session?.user?.name])

    const newAppointment = () => {
        // Navigate to the new appointment page
        history.push('/create-appointment'); // Replace with your desired route
    };


    return (
            <Card className="card" style={{flexGrow: 1}}>
                <CardHeader>
                    <h2>Future Apointments:</h2>
                    <Button type="link" onClick={useConfirm("Do you want to make a new appointment?", () => newAppointment())}>
                        New Appointment
                    </Button>
                </CardHeader>
                <Divider style={{width: "80%"}}/>
                <CardBody>
                    <h1>Appointments</h1>
                    {myAppointments.map((appointment, index) => (
                        <div key={index}>
                            <p>Doctor: {appointment.doctorUsername}</p>
                            <p>Date & Time {appointment.date} @ {appointment.time}</p>
                            <br></br>
                        </div>
                    ))}
                </CardBody>
            </Card>
    )
}