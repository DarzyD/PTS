'use client';
import {RegisterForm} from './RegisterForm.jsx'
import {Card, CardBody, CardHeader, Divider} from "@nextui-org/react";
import React from "react";
export default function Page() {
    return (
        <div className="centerDiv">
            <Card className="card" style={{maxWidth: "50%"}}>
                <CardHeader>
                    <h2>Log In</h2>
                </CardHeader>
                <Divider style={{width: "80%"}}/>
                <CardBody>
                    <RegisterForm/>
                </CardBody>

            </Card>
        </div>
    )
}