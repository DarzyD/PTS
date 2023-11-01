'use client';
import React, {useState} from "react";
import {Button} from "@nextui-org/react";
import Link from "next/link";
import {signIn, useSession} from "next-auth/react"
import Router from 'next/router'

export const LoginForm = () => {
    const {data: session} = useSession();
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [invalid, setInvalid] = useState(false);

    module.exports = {
        reactStrictMode: true,
        env: {
            NEXT_PUBLIC_GOOGLE_ID: process.env.NEXT_PUBLIC_GOOGLE_ID,
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        signIn("credentials", {
            username: name,
            password: password,
            redirect: false
        }).then((res) => {
            if (res.ok) {
                history.go('/Dashboard');
            } else {
                setInvalid(true);
            }
        });
    }

    return (
        <form style={{display: "flex", flexDirection: "column", alignItems: "center", padding: "16px", gap: "4px"}}>
            <input
                id="username"
                type="text"
                placeholder="Enter Username"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                id="password"
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            {invalid && <p color="red">Invalid Credentials</p>}
            <a href="">Forgot Username or Password?</a>
            <Button id="login-button" type="submit" onClick={handleSubmit}>
                Login
            </Button>
            <Link
                href="../Register"
                id="register-button"
                style={{
                    backgroundColor: 'rgb(65, 194, 151)',
                    border: '1px solid rgb(90, 190, 157)',
                }}
            >
                No account? Register Here!
            </Link>
        </form>
    )
}