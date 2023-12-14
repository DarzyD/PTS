'use client';
import react, {useState, useEffect} from 'react';
import {Card, CardBody, CardHeader, Divider} from "@nextui-org/react";
import {Button} from "@nextui-org/react";
import { useSession } from 'next-auth/react';

export const DoctorCard = () => {

    
    const [doctors, setDoctors] = useState([]);
    const [myDoctor, setMyDoctor] = useState({});

    const {data: session} = useSession();

    const formatPhoneNumber = (phoneNumberString) => {
        const cleaned = ('' + phoneNumberString).replace(/\D+/g, '');
        const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            return '(' + match[1] + ') ' + match[2] + ' - ' + match[3];
        }
        return null;
    }


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
        const response = await fetch("http://localhost:3001/doctor", {
            method: "Post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user: session?.user?.username, 
                doctor: doc
            })
        })
        console.log(response);
        if (response.ok) {
            console.log(doc);
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

            if (response.ok) {
                response.json().then((doc) => {
                    console.log(doc);
                    if (doc) {
                        setMyDoctor(doc);
                    }
                })
            }
        })
    }, [session?.user?.username])


    return (
            <Card className="card" style={{flexGrow: 1}}>
                <CardHeader>
                <h1>My Doctor</h1>
                    <p>
                        {myDoctor?.first} {myDoctor?.last}
                        <br/>
                        {myDoctor?.email}
                        <br/>
                        {formatPhoneNumber(myDoctor?.phone)}
                        <br/>
                        {myDoctor?.npi}
                    </p>
                </CardHeader>
                <Divider style={{width: "80%"}}/>
                <CardBody>
                    <h1>Switch doctors</h1>
                    {doctors.map((doc) => 
                        {
                            return (
                            <>
                                <Button type="link" key={doc?.first + " " + doc?.last} onClick={useConfirm("Do you want to switch your primary doctor?", () => postNewDoctor(doc))}>
                                    {doc?.first + " " + doc?.last}
                                </Button>
                                <br/>
                            </>
                            );
                        }
                    )}
                </CardBody>
            </Card>
    )
}