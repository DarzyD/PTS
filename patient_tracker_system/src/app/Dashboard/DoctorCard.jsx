'use client';
import react, {useState, useEffect} from 'react'
import { useSession } from 'next-auth/react';

const DoctorCard = () => {
    const [doctors, setDoctors] = useState([]);
    const [myDoctor, setMyDoctor] = useState({});

    const {data: session} = useSession();

    useEffect(async () => { //onPageLoad
        const res = await fetch("http://localhost:3001/doctors", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            
        })
        const resCode = res.status;
        const doctors = await res.json();
        if (resCode == 200 && doctors?.length) {
            setDoctors(doctors)
        }

        const res2 = await fetch("http://localhost:3001/doctors", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username: session?.user?.username})
            
        })
        const res2Code = res2.status;
        const doctor = await res2.json();
        if (res2Code == 200 && doctor) {
            setDoctors(doctor)
        }
    }, [])
    return (
            <Card className="card" style={{flexGrow: 1}}>
                <CardHeader>
                    <h2>Doctor</h2>
                </CardHeader>
                <Divider style={{width: "80%"}}/>
                <CardBody>
                    <H1>My Doctor:</H1>
                    <p>
                        {myDoctor?.name}
                        <br/>
                        {myDoctor?.email}
                        <br/>
                        {myDoctor?.phone}
                    </p>
                    
                </CardBody>
            </Card>
    )
}