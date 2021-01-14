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
            url: 'http://localhost:3000/allprofile',
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
            <h1 style={{marginTop : "50px", marginBottom : "50px"}}>Employee Profile</h1>
            {/* {JSON.stringify(data)} */}
            <div className="container">
                <div className="row">
                    {data.map((x) => (
                        <div className="col-md-4 col-sm-6">
                            <Card key={x.id} style={{ width: '18rem', marginRight: "20px" }}>
                                <Card.Img variant="top" src={x.attachment} />
                                <Card.Body>
                                    <Card.Title>{x.employee_name}</Card.Title>
                                    <Card.Text>
                                        <p>Employee ID : {x.employee_id}</p>
                                        <p>Role : {x.employee_role}</p>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            <br></br>
                        </div>))}
                </div></div>
        </div>
    )
}
