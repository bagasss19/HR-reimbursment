import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import '../App.css'
import axios from '../config/axios'

export default function Login(props) {
    const [id, setid] = useState("")
    const [password, setpassword] = useState("")

    function login() {
        axios.post('http://localhost:3000/admin', {
            employee_id : id,
            password
          })
          .then(function (response) {
            console.log(response, "RESPONSEEEEE<<<<<<<<<");
            localStorage.token = response.data
            props.history.push('/')
            window.location.reload();
          })
    }
    
    if (localStorage.token) {
       return (
           <h1>You Already Logged In</h1>
       )  
    }
    return (
        <>
        <h1 style={{marginTop : "50px"}}>Welcome, Please Login</h1>
            <Form style={{marginTop : "100px", width : "50%", marginLeft : "300px"}} 
            onSubmit={(e) => {
            e.preventDefault() 
            login()
            }
        }>
                <Form.Group controlId="formGroupEmail">
                    <Form.Label>Employee ID</Form.Label>
                    <Form.Control type="text" placeholder="Employee ID" onChange={e => setid(e.target.value)}/>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={e => setpassword(e.target.value)}/>
                </Form.Group>
                <Button variant="primary" type="submit">Submit</Button>
            </Form>
        </>
    )
}
