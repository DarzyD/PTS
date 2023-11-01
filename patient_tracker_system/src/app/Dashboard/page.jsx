'use client';
import {useSession} from 'next-auth/react';
import {DoctorCard} from './DoctorCard';
export default function Page() {
    const {data: session} = useSession();
    return <>Welcome {session?.user?.first} {session?.user?.last} <DoctorCard/></>
}