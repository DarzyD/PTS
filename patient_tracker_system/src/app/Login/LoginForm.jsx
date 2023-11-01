'use client';
import React, {useState} from "react";
import {Button} from "@nextui-org/react";
import Link from "next/link";
import {signIn} from "next-auth/react";
import './loginpage.css';

export const LoginForm = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [invalid, setInvalid] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        signIn("credentials", {
            username: name,
            password: password,
            callbackUrl: '/Dashboard',
            redirect: false
        }).then((res) => {
            if (res.ok) {
                history.pushState({},"", "/Dashboard");
                history.go();
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
            <Button className="formButton" id="login-button" type="submit" onClick={handleSubmit}>
                Login
            </Button>
            <Link
                className="formButton"
                href="../Register"
                id="register-button"
                style={{
                    backgroundColor: 'rgb(65, 194, 151)',
                    border: '1px solid rgb(90, 190, 157)',
                    textAlign: "center"
                }}
            >
                No account? Register Here!
            </Link>
        </form>
    )
}