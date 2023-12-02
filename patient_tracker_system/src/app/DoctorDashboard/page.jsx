'use client';
import {useSession} from 'next-auth/react';
import {SearchPatient} from './SearchPatient';
import {Schedule} from './Schedule';

export default function Page() {
    const {data: session} = useSession();
    return <>
        <center>Welcome {session?.user?.first} {session?.user?.last} </center>
        <center> <SearchPatient/> </center>
        <Schedule/> 
    </>
}