'use client';
import Avatar from '@mui/material/Avatar';
import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger
} from "@nextui-org/react";
import Link from "next/link";
import {signOut, useSession} from "next-auth/react"
export const ProfileDropDown = () => {
    const {data: session} = useSession();


    const handleMenuClick = (key) => {
        switch(key) {
            case "profile" :
                break;
            case "logout":
                signOut();
                break;
            default:
        }
    }

    return (
        <Dropdown  hidden={!session}>
            <DropdownTrigger>
                <Button style={{margin: 0}}>
                    <Avatar src="../../profile.jpg" />
                </Button>
            </DropdownTrigger>
            <DropdownMenu color="#333333" variant="Faded" onAction={handleMenuClick}>
                <DropdownItem key="profile">Edit Profile</DropdownItem>
                <DropdownItem key="logout">
                    <Link href={"/"}>Log Out</Link>
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
}