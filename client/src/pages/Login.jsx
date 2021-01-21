import React, { useState } from 'react'
import '../App.css'
import axios from '../config/axios'
import "bulma/css/bulma.css";
// import { getRole, setRole } from '../redux/action';
// import { useDispatch, useSelector } from 'react-redux'

export default function Login(props) {
    // const dispatch = useDispatch()
    const [password, setpassword] = useState("")
    const [id, setid] = useState("")

    function login() {
        axios.post('/', {
            employee_id: id,
            password
        })
            .then(function (response) {
                localStorage.role = response.data.role
                localStorage.token = response.data.token
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
            <h1 className="is-size-1 is-family-code" style={{ marginTop: "50px" }}>Welcome, Please Login</h1>

            <form className="form"
                style={{ justifyContent: "center", alignContent: "center", marginTop: "100px", width: "50%", display: "inline-block" }}
                onSubmit={(e) => {
                    e.preventDefault()
                    login()
                }}>
                <div className="field">
                    <label className="label is-family-code">Employee ID</label>
                    <input className="input" type="number" placeholder="Employee ID" onChange={e => setid(e.target.value)} />
                </div>

                <div className="field">
                    <label className="label is-family-code">Password</label>
                    <input className="input" type="password" placeholder="Password" onChange={e => setpassword(e.target.value)} />
                </div>

                <div className="field">
                    <div className="control">
                        <button className="button is-black">Login</button>
                    </div>
                </div>
            </form>
        </>
    )
}
