'use client';
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
//import db from '../../patient_tracker_system_backend/databaseConn.js';

// import { useRouter } from 'next/router'; 

import "./appt.css";
import { DevBundlerService } from 'next/dist/server/lib/dev-bundler-service';

export default function Page() {
    const [doctors, setDoctors] = useState([]);
    const {data: session} = useSession();
    // const router = useRouter();

    const validDate = (selectedDate) => {
        const currentDate = new Date();
        const selectedDateObj = new Date(selectedDate);
        return selectedDateObj > currentDate;
    };

    const submitAppointment = async (event) => {
        event.preventDefault();

        const selectedDoctor = document.getElementById('doctor').value;
        const selectedTime = document.getElementById('time').value;

        const selectedDate = document.getElementById('date').value;
        // Check if the selected date is after today
        if (!validDate(selectedDate)) {
            alert('Please select a later date.');
            return;
        }
        //check to see if all required are filled in 
        if (!selectedDoctor || !selectedDate || !selectedTime) {
            alert('Please fill in all required fields.');
            return;
        }

        const res = await fetch("http://localhost:3001/appointment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body : JSON.stringify({
                user: session?.user?.username,
                doctor: selectedDoctor,
                date: selectedDate.replace(/-/g,""),
                time: selectedTime.replace(/:/g, "")
            })
            
        })
        if (res.ok) {
            //going back to previous page when submission is done corectly
            history.pushState({},"", "/PatientDashboard");
            history.go();
        }
    };

    useEffect(()=>{
        const res = fetch("http://localhost:3001/doctor", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            
        })
        res.then((response) => {
            const resCode = response.status;
            response.json().then((doctors) => {
                if (resCode == 200 && doctors?.length) {
                    setDoctors(doctors)
                }}
            )
        })
    },[]);

    return( 
        
        <div>
             <h1>New Appointment</h1>
        
            <form id="appointmentForm">
                <label for="doctor">Select Doctor:</label>
                <select id="doctor" name="doctor">
                    {doctors.map((doctor) => (
                        <option key={doctor.username} value={doctor.username}>
                            {doctor.first} {doctor.last}
                        </option>
                    ))}
                </select>
        
                <label for="date">Select Date:</label>
                <input type="date" id="date" name="date" required ></input>
        
                <label for="time">Select Time:</label>
                <input type="time" id="time" name="time" required></input>
        
                <button type="submit" onClick={submitAppointment}>Schedule Appointment</button>
                

            </form>

        </div>
       
        
    )

}



