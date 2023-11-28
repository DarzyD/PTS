'use client';
import {useSession} from 'next-auth/react';
import {DoctorCard} from './DoctorCard';
import {AppointmentCard} from './AppointmentCard';
import {DocumentsCard} from './DocumentsCard';
export default function Page() {
    const {data: session} = useSession();
    return <>
        Welcome {session?.user?.first} {session?.user?.last} 
        <div className='container' style={{display:"flex", justifyItems: "stretch"}}>
            <DoctorCard/>
            <AppointmentCard/>
            <DocumentsCard/>
        </div>
    </>
}