'use client';
import React from "react";
import Link from 'next/link'
import {Card, CardHeader, CardBody, Divider, Button, CardFooter} from "@nextui-org/react";
import { SessionProvider } from "next-auth/react"

export default function Home({session}) {
    return (
        <SessionProvider session={session}>
            <div className="centerDiv">
                <Card className="card" >
                    <CardHeader >
                        <b>Patient Tracker System</b>
                    </CardHeader>
                    <Divider style={{width:'80%'}}/>
                    <CardBody className="Body">
                        Welcome to the patient tracker system
                    </CardBody>
                    <Divider style={{width:'80%'}}/>
                    <CardFooter style={{display: "flex", gap: "10%"}}>
                        <Button>
                            <Link href={"/Login"}>Login</Link>
                        </Button>
                        <Button>
                            <Link href={"/Register"}>Register</Link>
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </SessionProvider>
    )
}
