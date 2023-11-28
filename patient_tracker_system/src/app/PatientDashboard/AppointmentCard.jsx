'use client';
import react, {useState, useEffect} from 'react';
import {Card, CardBody, CardHeader, Divider} from "@nextui-org/react";
import {Button} from "@nextui-org/react";
import { useSession } from 'next-auth/react';

export const AppointmentCard = () => {

    const [myAppointments, setDoctors] = useState([]);

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
        
        const res = fetch("http://localhost:3001/doctor", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            
        })
        res.then((response) => {
            const resCode = response.status;
            response.json().then((doctors) => {
                if (resCode == 200 && doctors?.length) {
                    setDoctors(doctors)
                }}
            )
        })
        
        const res2 = fetch("http://localhost:3001/doctor?user=" + session?.user?.username, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }            
        })
        res2.then((response) => {
            const res2Code = response.status;
            response.json().then((doc) => {
                if (res2Code == 200 && doc) {
                    setDoctors(doc);
                }
            })
        })
    }, [session?.user?.name])


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
                </CardBody>
            </Card>
    )
}