'use client';
import react, {useState, useEffect} from 'react';
import {Card, CardBody, CardHeader, Divider} from "@nextui-org/react";
import {Button} from "@nextui-org/react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue} from "@nextui-org/react";
import './DocumentsCard.css';
import { useSession } from 'next-auth/react';

export const DocumentsCard = () => {

    const [myAppointments, setDoctors] = useState([]);

    const {data: session} = useSession();


    const useConfirm = (message, onConfirm, onAbort)  => {
    const confirm = () => {
        if (window.confirm(message)) {
            onConfirm();
        } else {
            onAbort();
        }
    }
    return confirm;
    }

    const rows = [
        {
          key: "1",
          name: "Tony Reichert",
          role: "CEO",
          status: "Active",
        },
        {
          key: "2",
          name: "Zoey Lang",
          role: "Technical Lead",
          status: "Paused",
        },
        {
          key: "3",
          name: "Jane Fisher",
          role: "Senior Developer",
          status: "Active",
        },
        {
          key: "4",
          name: "William Howard",
          role: "Community Manager",
          status: "Vacation",
        },
      ];
      
      const columns = [
        {
          key: "fileName",
          label: "File Name",
        },
        {
          key: "role",
          label: "ROLE",
        },
        {
          key: "Download",
          label: "STATUS",
        },
      ];
      

    useEffect(() => { //onPageLoad
        
        const res = fetch("http://localhost:3001/doctor", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            
        })
        res.then(() => {
            const resCode = res.status;
            res.json().then((doctors) => {
                if (resCode == 200 && doctors?.length) {
                    setDoctors(doctors)
                }}
            )
        })
        
        const res2 = fetch("http://localhost:3001/doctor?user=" + session?.user?.username, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }            
        })
        res2.then(() => {
            const res2Code = res2.status;
            res2.json().then((doc) => {
                if (res2Code == 200 && doc) {
                    setDoctors(doc);
                }
            })
        })
    }, [session?.user?.name])


    return (
            <Card className="card" style={{flexGrow: 1}}>
                <CardHeader>
                    <h2>My Documents:</h2>
                    <Button type="link" onClick={useConfirm("Do you want to upload a new document?", () => newDocument())}>
                        New Document
                    </Button>
                </CardHeader>
                <Divider style={{width: "80%"}}/>
                <CardBody>
                <Table aria-label="Example table with dynamic content" className="custom-table">
                    <TableHeader columns={columns}>
                        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                    </TableHeader>
                    <TableBody items={rows}>
                        {(item) => (
                        <TableRow key={item.key}>
                            {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                        </TableRow>
                        )}
                    </TableBody>
                </Table>
                </CardBody>
            </Card>
    )
}