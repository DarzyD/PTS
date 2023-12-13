'use client';
import React from "react";
import "./appt.css";

export default function Page() {
    return( 
        
        <div>
             <h1>New Appointment</h1>
        
            <form id="appointmentForm">
                <label for="doctor">Select Doctor:</label>
                <select id="doctor" name="doctor">
                    <option value="doctor1">Doctor 1</option>
                    <option value="doctor2">Doctor 2</option>
                    <option value="doctor3">Doctor 3</option>
                </select>
        
                <label for="date">Select Date:</label>
                <input type="date" id="date" name="date" required></input>
        
                <label for="time">Select Time:</label>
                <input type="time" id="time" name="time" required></input>
        
                <button type="submit">Schedule Appointment</button>
                
            </form>

        </div>
       
        
    )

}



