'use client';
import React from "react";
import Link from 'next/link'
import {Card, CardHeader, CardBody, Divider, Button, CardFooter} from "@nextui-org/react";

export default function Home() {
    return (
        <div style={{display: "flex", justifyContent: "center"}}>
            <Card className="card" style={{display: "flex", flexDirection: "column", background: "#d0d0d0"}}>
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
    )
}
