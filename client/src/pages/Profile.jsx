import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import axios from 'axios'
// import {
//     Link
// } from "react-router-dom";

export default function Profile() {
    const [data, setdata] = useState([]);

    useEffect(() => {
        axios({
            url: 'http://localhost:3000',
            method: 'get',
            headers: {
                token: localStorage.token
            }
        })
            .then(function (response) {
                // handle success
                console.log(response, "response<<<<<<<<<<<")
                setdata(response.data)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
    }, []);
    return (
        <div>
            <h1>Employee Profile</h1>
            {/* {JSON.stringify(data)} */}
            <Card style={{ width: '18rem', marginTop : "150px"}} className="mx-auto">
                <Card.Body>
                    <Card.Title>{data.employee_name}</Card.Title>
                    <Card.Text>
                        <p>Employee ID : {data.employee_id}</p>
                        <p>Role : {data.employee_role}</p>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}
