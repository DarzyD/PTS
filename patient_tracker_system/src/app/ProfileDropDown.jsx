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
export const ProfileDropDown = ({setLoggedIn}) => {

    const handleMenuClick = (key) => {
        switch(key) {
            case "profile" :
                break;
            case "logout":
                setLoggedIn(false);
                break;
            default:
        }
    }

    return (
        <Dropdown>
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