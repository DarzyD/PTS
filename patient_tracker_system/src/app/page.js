import React from "react";
import {Card, CardHeader, CardBody, Divider} from "@nextui-org/react";

export default function Home() {

  return (
    <Card >
      <CardHeader >
      <b>Patient Tracker System</b>
      </CardHeader>
      <Divider/>
      <CardBody className="Body">
        Welcome to the patient tracker system
      </CardBody>
    </Card>
  )
}
