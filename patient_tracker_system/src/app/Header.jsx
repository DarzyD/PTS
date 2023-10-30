'use client';
import {useState} from "react";
import {ProfileDropDown} from "@/app/ProfileDropDown";
import {signIn, signOut, useSession} from "next-auth/react"

export const Header = () => {
    const {data: session} = useSession();
    return (
        <div style={{background: "#607fc7", height: 50, display: "flex", alignItems: "center", justifyContent: "flex-end", margin: 0, gap: "38%"}}>
            <h2> Patient Tracker System</h2>
            <div style={{display: "flex", alignSelf: "stretch"}}>
                {session && <ProfileDropDown/>}
            </div>
        </div>
    )
}