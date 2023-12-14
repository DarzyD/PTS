'use client';
import react, {useState, useEffect} from 'react';
import {Card, CardBody, CardHeader, Divider} from "@nextui-org/react";
import { useSession } from 'next-auth/react';

export const DoctorCard = () => {

    
    const [doctors, setDoctors] = useState([]);

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

    const formatPhoneNumber = (phoneNumberString) => {
        const cleaned = ('' + phoneNumberString).replace(/\D+/g, '');
        console.log(cleaned);
        const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        console.log(match)
        if (match) {
            return '(' + match[1] + ') ' + match[2] + ' - ' + match[3];
        }
        return null;
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
    }, [session?.user?.name])


    return (
            <Card className="card" style={{flexGrow: 1}}>
                <CardHeader>
                    <h2>Doctors</h2>
                </CardHeader>
                <Divider style={{width: "80%"}}/>
                <CardBody>
                    {doctors.map((doc) => 
                        {
                            console.log(doc);
                            return (
                                <p>
                                {doc?.first} {doc?.last}
                                <br/>
                                {doc?.email}
                                <br/>
                                {formatPhoneNumber(doc?.phone)}
                                <br/>
                                {doc?.npi}
                            </p>
                            );
                        }
                    )}
                </CardBody>
            </Card>
    )
}