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

    const formatDate = (dateString) => {
        const cleaned = ('' + dateString).replace(/\D+/g, '');
        const match = cleaned.match(/^(\d{4})(\d{2})(\d{2})$/);
        if (match) {
            return match[2] + '-' + match[3] + '-' + match[1];
        }
        return null;
    }
    const formatTime = (time) => {
        const minute = time %100 <10 ? "0" + time %100 : time %100;
        const hour = (time - minute)/100;
        return hour >12 ? "" + hour-12 + ":" + minute + " PM" : "" + hour + ":" + minute + " AM";
    }
    const fetchAppointments =() => {
        if (!session?.user?.username) {
            return;
        }
        
        const res = fetch("http://localhost:3001/appointment?user=" + session?.user?.username, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
            
        })
        res.then((response) => {
            const resCode = response.status;
            if (response.ok) {
                response.json().then((appointments) => {
                    if (resCode == 200) {
                        setMyAppointments(appointments);
                    }}
                )
            }
        })
    }

    useEffect(() => { //onPageLoad
        fetchAppointments()
        


    }, [session])

    const newAppointment = () => {
        // Navigate to the new appointment page
        history.pushState({},"", "./PatientDashboard/NewAppt");
        history.go();
    };


    const cancelAppointment = async (appointment) => {
        const res = await fetch("http://localhost:3001/appointment", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user: appointment.patientusername,
                doctor: appointment.doctorusername,
                time: appointment.time,
                date: appointment.date
            })
            
        })
        console.log(res);
        if (res.ok) {
            fetchAppointments();
        }
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
                            <p>Doctor: {appointment.doctorusername}</p>
                            <p>Date & Time: {formatDate(appointment.date)} @ {formatTime(appointment.time)}</p>
                            <Button type="danger" onClick={() => cancelAppointment(appointment)}>
                                Cancel
                            </Button>
                            <br></br>
                        </div>
                    ))}
                </CardBody>
            </Card>
    )
}