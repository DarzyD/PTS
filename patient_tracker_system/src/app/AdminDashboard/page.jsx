'use client';
import {useSession} from 'next-auth/react';
import {DoctorCard} from './DoctorCard';
import { RegisterForm } from './RegisterForm';
import {Card, CardBody, CardHeader, Divider} from "@nextui-org/react";

export default function Page() {
    const {data: session} = useSession();
    return <>
        Welcome {session?.user?.first} {session?.user?.last} 
        <div className='container' style={{display:"flex", justifyItems: "stretch"}}>
            <DoctorCard/>
            <Card className="card" style={{maxWidth: "50%"}}>
                <CardHeader>
                    <h2>Add a new doctor</h2>
                </CardHeader>
                <Divider style={{width: "80%"}}/>
                <CardBody>
                    <RegisterForm/>
                </CardBody>

            </Card>
        </div>
    </>
}