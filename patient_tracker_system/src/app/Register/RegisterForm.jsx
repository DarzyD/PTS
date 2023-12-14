'use client';
import React, {useState} from "react";
import {Button} from "@nextui-org/react";
import Link from "next/link";
import {signIn} from "next-auth/react";
import "./registerpage.css";

export const RegisterForm = () => {
    const [first, setFirst] = useState('');
    const [middleInitial, setMiddleInitial] = useState('');
    const [last, setLast] = useState('');
    const [ssn, setSsn] = useState('');
    const [dob, setDob] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState(''); // Properly defined the gender state
    const [confirmPassword, setConfirmPassword] = useState('')
    const [invalid, setInvalid] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        setInvalid("");
        verifyInfo() && (signIn("credentials", {
            username: username,
            password: password,
            first: first,
            last: last,
            ssn: ssn,
            dob: dob,
            address: address,
            city: city,
            state: state,
            zip: zip,
            phone: phone,
            email: email,
            gender: gender,
            register: true,
            redirect: false,
            callbackUrl: '/PatientDashboard',
        }).then((res) => {
            if (res.ok) {
                history.pushState({},"", "/PatientDashboard");
                history.go();
            } else {
                setInvalid("could not create your account");
            }
        }));
        // TODO: verify login info here
    }

    const verifyInfo = () => {
        if (password !== confirmPassword ) {
            setInvalid("Passwords must match");
            return false;
        }
        if (password === "") {
            setInvalid("Password is required");
            return false;
        }
        if (middleInitial === "") {
            setInvalid("Middle Initial is required");
            return false;
        }
        if (username === "") {
            setInvalid("Username is required");
            return false;
        }
        if (dob === "") {
            setInvalid("Date of Birth is required");
            return false;
        }
        if (ssn === "") {
            setInvalid("Social Security Number is required");
            return false;
        }
        if (phone === "") {
            setInvalid("Phone Number is required");
            return false;
        }
        if (email === "") {
            setInvalid("Email is required");
            return false;
        }
        if (city === "") {
            setInvalid("City is required");
            return false;
        }
        if (state === "") {
            setInvalid("State is required");
            return false;
        }
        if (address === "") {
            setInvalid("Address is required");
            return false;
        }
        if (first === "") {
            setInvalid("First Name is required");
            return false;
        }
        if (last === "") {
            setInvalid("Last Name is required");
            return false;
        }
        return true;
    }

    return (
        <form className = "register-form" style={{display: "flex", flexDirection: "column", alignItems: "center", alignSelf: "center"}}>
            <div>
                <label for="firstname"><b>First Name</b></label>
                <input 
                type="text" 
                placeholder="Enter First Name" 
                name="firstname" 
                id="firstname" 
                onChange={(e) => setFirst(e.target.value)}
                value={first}
                required
                />
                <label for="middleInitial"><b>Middle Initial</b></label>
                <input type="text"
                placeholder="Enter Middle Initial" 
                name="middleInitial" 
                id="middleInitial" 
                required
                onChange={(e) => setMiddleInitial(e.target.value)}
                value={middleInitial}
                />

                <label for="lastname"><b>Last Name</b></label>
                <input type="text"
                placeholder="Enter Last Name" 
                name="lastname" 
                id="lastname" 
                required
                onChange={(e) => setLast(e.target.value)}
                value={last}
                />

                <label for="dob"><b>Date of Birth</b></label>
                <input type="text"
                placeholder="Enter Date of Birth" 
                name="dob" 
                id="dob" 
                required
                onChange={(e) => setDob(e.target.value)}
                value={dob}
                />

                <div>
                <b id= "sex">Sex</b>
                    <label id = "sexlabel">
                        <input
                        type="radio"
                        value="Male"
                        name="gender"
                        checked={gender === 'Male'}
                        onChange={() => setGender('Male')}
                        />
                        Male
                    </label>
                    <label id = "sexlabel">
                        <input
                        type="radio"
                        value="Female"
                        name="gender"
                        checked={gender === 'Female'}
                        onChange={() => setGender('Female')}
                        />
                        Female
                    </label>
                </div>

                <label for="ssn"><b>Social Security Number</b></label>
                <input 
                type="text" 
                placeholder="Enter SSN" 
                name="ssn" 
                id="ssn" 
                required
                onChange={(e) => setSsn(e.target.value)}
                value={ssn}
                />

                <label for="address"><b>Street Address</b></label>
                <input type="text" 
                placeholder="Enter Street Address" 
                name="address" 
                id="address" 
                required
                onChange={(e) => setAddress(e.target.value)}
                value={address}/>

                <label for="state"><b>State</b></label>
                <select name="state" id="state" onChange={(e) => setState(e.target.value)} value={state}>
                    <option value="">Select a State</option>
                    <option value="AL">Alabama</option>
                    <option value="AK">Alaska</option>
                    <option value="AZ">Arizona</option>
                    <option value="AR">Arkansas</option>
                    <option value="CA">California</option>
                    <option value="CO">Colorado</option>
                    <option value="CT">Connecticut</option>
                    <option value="DE">Delaware</option>
                    <option value="DC">District Of Columbia</option>
                    <option value="FL">Florida</option>
                    <option value="GA">Georgia</option>
                    <option value="HI">Hawaii</option>
                    <option value="ID">Idaho</option>
                    <option value="IL">Illinois</option>
                    <option value="IN">Indiana</option>
                    <option value="IA">Iowa</option>
                    <option value="KS">Kansas</option>
                    <option value="KY">Kentucky</option>
                    <option value="LA">Louisiana</option>
                    <option value="ME">Maine</option>
                    <option value="MD">Maryland</option>
                    <option value="MA">Massachusetts</option>
                    <option value="MI">Michigan</option>
                    <option value="MN">Minnesota</option>
                    <option value="MS">Mississippi</option>
                    <option value="MO">Missouri</option>
                    <option value="MT">Montana</option>
                    <option value="NE">Nebraska</option>
                    <option value="NV">Nevada</option>
                    <option value="NH">New Hampshire</option>
                    <option value="NJ">New Jersey</option>
                    <option value="NM">New Mexico</option>
                    <option value="NY">New York</option>
                    <option value="NC">North Carolina</option>
                    <option value="ND">North Dakota</option>
                    <option value="OH">Ohio</option>
                    <option value="OK">Oklahoma</option>
                    <option value="OR">Oregon</option>
                    <option value="PA">Pennsylvania</option>
                    <option value="RI">Rhode Island</option>
                    <option value="SC">South Carolina</option>
                    <option value="SD">South Dakota</option>
                    <option value="TN">Tennessee</option>
                    <option value="TX">Texas</option>
                    <option value="UT">Utah</option>
                    <option value="VT">Vermont</option>
                    <option value="VA">Virginia</option>
                    <option value="WA">Washington</option>
                    <option value="WV">West Virginia</option>
                    <option value="WI">Wisconsin</option>
                    <option value="WY">Wyoming</option>
                </select>

                <label for="city"><b>City</b></label>
                <input type="text" 
                placeholder="Enter City" 
                name="city" 
                id="city" 
                required
                onChange={(e) => setCity(e.target.value)}
                value={city}
                />

                <label for="zipcode"><b>Zip Code</b></label>
                <input type="tel" 
                pattern="[0-9]*" 
                placeholder="Zip Code"
                max="99999" 
                onChange={(e) => setZip(e.target.value)}
                value={zip}
                />

                <label for="phone"><b>Phone Number</b></label>
                <input type="tel"
                id="phone"
                name="phone"
                placeholder="012-345-6789"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                required
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                />
                <small>Format: 012-345-6789</small>

                <label for="email"><b>Email</b></label>
                <input type="text" 
                placeholder="Enter Email" 
                name="email" 
                id="email" 
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}/>

            <label for="username"><b>Username</b></label>
                <input type="text" 
                placeholder="Enter Username" 
                name="username" 
                id="username" 
                required
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                />

                <label for="psw"><b>Password</b></label>
                <input type="password"
                name="password" 
                id="password" 
                required
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                />

                <label for="psw-repeat"><b>Repeat Password</b></label>
                <input type="password"
                name="confirm_password"
                id="confirm_password"
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                />
                
                {invalid}

                <Button className="formButton" id="login-button" type="submit" onClick={handleSubmit}>
                    Register
                </Button>
        
            </div>

            <p>Already Have An Account?</p><Link
                href="/Login"
                id="register-button"
                style={{
                    backgroundColor: 'rgb(65, 194, 151)',
                    border: '1px solid rgb(90, 190, 157)',
                    textAlign: "center"
                }}
            >
                Sign in!
            </Link>
            
        </form>
    )
}

