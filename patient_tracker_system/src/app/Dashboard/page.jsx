'use client';
import {useSession} from 'next-auth/react';
export default function Page() {
    const {data: session} = useSession();
    return <>Welcome {session?.user?.first} {session?.user?.last}</>
}