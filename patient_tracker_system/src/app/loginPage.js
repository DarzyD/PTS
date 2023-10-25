import React from 'react'
import './loginpage.css'
const loginPage = () => {
  return (
    (
        <body>
            <div className="container">
              <form>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <h1>Patient Tracker System</h1>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <h2>Log In</h2>
                </div>
                <div style={{ marginTop: '10px', marginBottom: '10px' }}>
                  <label htmlFor="username"> <b>Username: </b> </label>
                  <input
                    id="username"
                    type="text"
                    placeholder="Enter Username"
                    name="uname"
                    required
                  />
                  <label htmlFor="password"> <b>Password: </b> </label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Enter Password"
                    name="psw"
                    required
                  />
                  <a href="#">Forgot Username or Password?</a>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <p id="errorMessage"> </p>
                </div>
                <div>
                  <button id="login-button" type="login">
                    Login
                  </button>
                </div>
                <div>
                  <button
                    id="register-button"
                    style={{
                      backgroundColor: 'rgb(65, 194, 151)',
                      border: '1px solid rgb(90, 190, 157)',
                    }}
                    type="register"
                  >
                    No account? Register Here!
                  </button>
                </div>
              </form>
            </div>
        </body>
        )
  )
}

export default loginpage