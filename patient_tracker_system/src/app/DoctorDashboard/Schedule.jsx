import React, {useState, useEffect} from 'react'
import {Card, CardBody, CardHeader, Divider} from "@nextui-org/react";
import { useSession } from 'next-auth/react';
/*
    SCHEMA FOR APPOINTMENTS:
    {doctorUsername: "username", patientUsername: "username", date: "date", time: "time"}
    const [appointments, setAppointments] = useState([]);
    const [myDoctor, setMyDoctor] = useState({});
    useEffect(async () => { //onPageLoad
        
        const testData = await fetch("testData.json");
        const testJSON = testData.json();
        const appointmentsData = testJSON.appointments;
        const getDayName = new Date().getDay();
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        const rotatedDaysOfWeek = [
        ...daysOfWeek.slice(getDayName), // Starting from the current day
        ...daysOfWeek.slice(0, getDayName) // Wrap around to the days before the current day
        ]; // ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Monday"] if today is Tuesday

        const currentDate = new Date();

        const appointmentsForTheWeek = [];
        //YYYY-MM-DD for SQL formatting
        for (let i = 0; i < 7; i++) {
            const nextDate = new Date(currentDate);
            nextDate.setDate(currentDate.getDate() + i);

            const dayOfWeek = rotatedDaysOfWeek[i];
            const month = (nextDate.getMonth() + 1).toString().padStart(2, '0');
            const day = nextDate.getDate().toString().padStart(2, '0');
            const year = nextDate.getFullYear();
            const formattedDate = `${year}-${month}-${day}`;
            
            appointmentsForTheWeek.push({
                dayOfWeek,
                date: formattedDate,
                appointments: []
            });
        }

        for (const appointment of appointmentsData) {
            const appointmentDate = appointment.date;
            
            for (const day of appointmentsForTheWeek) {
                if (day.date === appointmentDate) {
                    day.appointments.push(appointment);
                    break; // No need to continue searching for the date
                }
            }
        }
        setAppointments(appointmentsForTheWeek);
    }, [session?.user?.name])

                   <Card className="card" style={{flexGrow: 1}}>
                    <CardHeader>
                        <h2>Monday</h2>
                    </CardHeader>
                    <Divider style={{width: "80%"}}/>
                    <CardBody>
                        <p>

                        </p>
                        { {doctors.map((doc) => 
                            {
                                return (
                                <Button type="link" key={doc?.name} onClick={useConfirm("Do you want to switch your primary doctor?", () => postNewDoctor(doc))}>
                                    {doc?.name}
                                </Button>
                                );
                            }
                        )} }
                        </CardBody>
                        </Card>

                        { {appointments.map((appointment) => 
                            {
                                return (
                                    <Card className="card" style={{flexGrow: 1}}>
                                        <CardHeader>
                                            <h2>appointment.dayOfWeek appointment.date</h2>
                                        </CardHeader>
                                        <Divider style={{width: "80%"}}/>
                                        <CardBody>

                                        </CardBody>
                                    </Card>
                                );
                            }
                        )} }
*/

export const Schedule = () => {
    const [appointments, setAppointments] = useState([]);
    const {data: session} = useSession();
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
    useEffect(() => { //onPageLoad
        fetchAppointments().then((appointmentsData) => {
            const getDayName = new Date().getDay();
            const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

            const rotatedDaysOfWeek = [
            ...daysOfWeek.slice(getDayName), // Starting from the current day
            ...daysOfWeek.slice(0, getDayName) // Wrap around to the days before the current day
            ]; // ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Monday"] if today is Tuesday

            const currentDate = new Date();

            const appointmentsForTheWeek = [];
            //YYYY-MM-DD for SQL formatting
            for (let i = 0; i < 7; i++) {
                const nextDate = new Date(currentDate);
                nextDate.setDate(currentDate.getDate() + i);

                const dayOfWeek = rotatedDaysOfWeek[i];
                const month = (nextDate.getMonth() + 1).toString().padStart(2, '0');
                const day = nextDate.getDate().toString().padStart(2, '0');
                const year = nextDate.getFullYear();
                const formattedDate = `${year}-${month}-${day}`;
                
                appointmentsForTheWeek.push({
                    dayOfWeek,
                    date: formattedDate,
                    appointments: []
                });
            }
            for (let i = 0; i < appointmentsData.appointments.length; i++) {
                const appointment = appointmentsData.appointments[i];
                const appointmentDate = appointment.date;
                
                for (const day of appointmentsForTheWeek) {
                    if (day.date == appointmentDate) {
                        day.appointments.push(appointment);
                        break; // No need to continue searching for the date
                    }
                }
            }
            setAppointments(appointmentsForTheWeek);
        });
    }, [session?.user?.name]);

    function formatDate(date){
        // Add time 'T00:00' to treat the date as local
        let appointmentDate = new Date(date + 'T00:00');        // Getting the month, day, and year
        let month = appointmentDate.getMonth() + 1; // getMonth() returns 0-11
        let day = appointmentDate.getDate();
        let year = appointmentDate.getFullYear();

        // Formatting to MM/DD/YYYY
        let formattedDate = `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${year}`;

        // Use formattedDate where you need the date in MM/DD/YYYY format
        return formattedDate;
    }
  return (
    <>
        
        <div className="container">
            <center><h1>Schedule this week ({appointments.length > 0 ? `${formatDate(appointments[0].date)} to ${formatDate(appointments[appointments.length - 1].date)}` : ''})</h1></center>
            <center>
                <div className="d-flex flex-wrap" style={{border: '5px gray solid'}}>
                    {appointments.map((day) => 
                        {
                            return (
                                <Card key={day?.dayOfWeek} className="card" style={{flexGrow: 1, width:'30%', margin:'1%'}}>
                                    <CardHeader>
                                        <h2> {day?.dayOfWeek} {formatDate(day?.date)}</h2>
                                    </CardHeader>
                                    <Divider style={{width: "80%"}}/>
                                    <CardBody className="px-3 py-0 text-small text-default-400"> 
                                        {day.appointments.length > 0 ? 
                                            (
                                                day.appointments.map((appointment) => {
                                                    return (
                                                        //TODO: MAKE THIS A COMPONENT!
                                                        <div key={appointment?.time}>
                                                        <p>{appointment?.time}</p>
                                                        <p>{appointment?.patientUsername}</p>
                                                        </div>
                                                    );
                                                })
                                            )   
                                            : 'No appointments on this day'}
                                    </CardBody>
                                </Card>
                            );
                        }
                    )}
                </div>
            </center>
        </div>
        
    </>
  )
}
