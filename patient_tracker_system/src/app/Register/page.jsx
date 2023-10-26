'use client';
import React, {useState} from "react";
import {Button} from "@nextui-org/react";
import Link from "next/link";
import "./registerpage.css";

const RegisterForm = ({setLoggedIn}) => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState(''); // Properly defined the gender state

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name, password, gender);
        // TODO: verify login info here
        setLoggedIn(true);
    }

    return (
        <form style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <h2>Register Form</h2>
            <div>
                <label for="firstname"><b>First Name</b></label>
                <input type="text" placeholder="Enter First Name" name="firstname" id="firstname" required></input>

                <label for="lastname"><b>Last Name</b></label>
                <input type="text" placeholder="Enter Last Name" name="lastname" id="lastname" required></input>

                <label for="dob"><b>Date of Birth</b></label>
                <input type="text" placeholder="Enter Date of Birth" name="dob" id="dob" required></input>

                <div>
                <h3>Sex</h3>
                    <label>
                        <input
                        type="radio"
                        value="Male"
                        name="gender"
                        checked={gender === 'Male'}
                        onChange={() => setGender('Male')}
                        />
                        Male
                    </label>
                    <label>
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
                <input type="text" placeholder="Enter SSN" name="ssn" id="ssn" required></input>

                <label for="address"><b>Street Address</b></label>
                <input type="text" placeholder="Enter Street Address" name="address" id="address" required></input>

                <label for="state"><b>State</b></label>
                <select name="state" id="state">
                    <option value="" selected="selected">Select a State</option>
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
                <input type="text" placeholder="Enter City" name="city" id="city" required></input>

                <label for="zipcode"><b>Zip Code</b></label>
                <input type="tel" pattern="[0-9]*" placeholder="Zip Code" max="99999" />

                <label for="phone"><b>Phone Number</b></label>
                <input type="tel" id="phone" name="phone" placeholder="012-345-6789" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required></input>
                <small>Format: 012-345-6789</small>

                <label for="email"><b>Email</b></label>
                <input type="text" placeholder="Enter Email" name="email" id="email" required></input>

                <label for="psw"><b>Password</b></label>
                <input type="password" name="password" id="password" onchange='check_pass();'/>

                <label for="psw-repeat"><b>Repeat Password</b></label>
                <input type="password" name="confirm_password" id="confirm_password" onchange='check_pass();'/>
                
                
                {/* <input type="submit" name="submit"  value="registration"  id="submit" disabled/>

                <Button id="login-button" type="submit" onClick={handleSubmit}>
                    Login
                </Button> */}
            
            </div>

            <p>Already Have An Account?</p><Link
                href="./Login"
                id="register-button"
                style={{
                    backgroundColor: 'rgb(65, 194, 151)',
                    border: '1px solid rgb(90, 190, 157)',
                }}
            >
                Sign in!
            </Link>
            
        </form>
    )
}

function check_pass() {
    if (document.getElementById('password').value ==
            document.getElementById('confirm_password').value) {
        document.getElementById('submit').disabled = false;
    } else {
        document.getElementById('submit').disabled = true;
    }
}

export default RegisterForm;
