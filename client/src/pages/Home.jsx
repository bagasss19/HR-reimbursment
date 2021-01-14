import React, { useEffect, useState } from 'react'
import { Button, Badge, Table, Image } from 'react-bootstrap'
import axios from 'axios'
import {
    Link
} from "react-router-dom";

export default function Home() {
    const [data, setdata] = useState([]);
    const [loading, setloading] = useState(true)
    useEffect(() => {
        axios({
            url: 'http://localhost:3000/reimbursment',
            method: 'get',
            headers: {
                token: localStorage.token
            }
        })
            .then(function (response) {
                // handle success
                console.log(response, "response<<<<<<<<<<<")
                setdata(response.data)
                setloading(false)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
    }, []);

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    if (loading) {
        return (<h1>Loading...</h1>)
    }
    return (
        <div>
            {/* <h1>Your Reimbursment</h1> */}
            <Button variant="light" style={{ marginBottom: "30px", marginTop: '30px' }}><Link to="/add">Add Reimbursment</Link></Button>
            {/* {JSON.stringify(data)} */}

            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th  style={{ width:"100px" }}>Image</th>
                        <th>Category</th>
                        <th>Amount</th>
                        <th>Status</th>
                    </tr>
                </thead>

                <tbody>
                    {data.map((x) => (
                        <tr key={x.id}>
                            <td>{x.id}</td>
                            <td> <Image src={x.attachment} rounded style={{ height: "25px" }} /></td>
                            <td>{x.category}</td>
                            <td>Rp. {numberWithCommas(x.amount)}</td>
                            {(() => {
                                switch (x.status) {
                                    case "Approved": return <h5><Badge variant="success">Approved</Badge></h5>;
                                    case "Waiting": return <h5><Badge variant="warning">Waiting</Badge></h5>;
                                    case "Rejected": return <h5><Badge variant="danger">Rejected</Badge></h5>;
                                    default: return <h5>Not Confirmed</h5>;
                                }
                            })()}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}
