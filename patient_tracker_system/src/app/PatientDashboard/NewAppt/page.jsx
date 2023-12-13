'use client';
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
// import db from '../../patient_tracker_system_backend/databaseConn.js';

// import { useRouter } from 'next/router'; 

import "./appt.css";
import { DevBundlerService } from 'next/dist/server/lib/dev-bundler-service';

export default function Page() {
    const [doctors, setDoctors] = useState([]);
    // const router = useRouter();

    const fetchDoctors = async () => {
        //mimicking a fetch request
        const testData = {
            "doctors":[
                {
                    "doctorUsername": "thisDoctor",
                    "firstName" : "Robin",
                    "lastName" : "Smith",
                    "middleInitial" : "M",
                    "dob" : "12041975",
                    "sex" : "F",
                    "address" : "test street",
                    "city" : "amherst",
                    "state" :"MA",
                },
                {
                    "doctorUsername": "test",
                    "firstName" : "Wendy",
                    "lastName" : "Smith",
                    "middleInitial" : "M",
                    "dob" : "12041975",
                    "sex" : "F",
                    "address" : "test street",
                    "city" : "amherst",
                    "state" :"MA",
                },
            ]
        }
        return testData;
    };

    const validDate = (selectedDate) => {
        const currentDate = new Date();
        const selectedDateObj = new Date(selectedDate);
        return selectedDateObj > currentDate;
    };

    const submitAppointment = (event) => {
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

        // TODO Handling appointment submission
        const text = "INSERT INTO appointments VALUES ($1,$2,$3,$4)";
        const values = [ "patientUsername", selectedDoctor, selectedDate, selectedTime];
        const result = db.query(text, values);

        //going back to previous page when submission is done corectly
        history.pushState({},"", "/PatientDashboard");
        history.go();
    };

    useEffect(()=>{
        const fetchData = async() =>{
            const doctorsData = await fetchDoctors();
            setDoctors(doctorsData.doctors);
        }
        fetchData();
    },[]);

    return( 
        
        <div>
             <h1>New Appointment</h1>
        
            <form id="appointmentForm">
                <label for="doctor">Select Doctor:</label>
                <select id="doctor" name="doctor">
                    {doctors.map((doctor) => (
                        <option key={doctor.doctorUsername} value={doctor.doctorUsername}>
                            {doctor.firstName} {doctor.lastName}
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



