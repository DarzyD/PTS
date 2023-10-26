'use client';
import React, {useState} from "react";
import {Button} from "@nextui-org/react";
import Link from "next/link";

export const LoginForm = ({setLoggedIn}) => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name, password);
        //TODO: verify login info here
        setLoggedIn(true);
    }

    return (
        <form style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <h2>Log In</h2>
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
            <a href="">Forgot Username or Password?</a>
            <p id="errorMessage"> </p>
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