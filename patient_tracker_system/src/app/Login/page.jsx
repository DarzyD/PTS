'use client';
import {LoginForm} from './LoginForm'
import {Card, CardBody, CardHeader, Divider} from "@nextui-org/react";
import React from "react";
export default function Page() {
    return (
        <div className="centerDiv">
            <Card className="card" style={{flexGrow: 1}}>
                <CardHeader>
                    <h2>Log In</h2>
                </CardHeader>
                <Divider style={{width: "80%"}}/>
                <CardBody>
                    <LoginForm/>
                </CardBody>

            </Card>
        </div>
    )
}