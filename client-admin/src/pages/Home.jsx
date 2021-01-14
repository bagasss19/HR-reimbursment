import React, { useEffect, useState } from 'react'
import { Button, Table, Image, Badge, Form } from 'react-bootstrap'
import Loader from 'react-loader-spinner'
import axios from 'axios'
import {
    Link
} from "react-router-dom";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

export default function Home() {
    const [data, setdata] = useState([]);
    const [employees, setemployees] = useState([]);
    const [loading, setloading] = useState(true)
    const [id, setid] = useState()

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    function filterEmployee(id = '') {
        axios({
            url: 'http://localhost:3000/admin/' + id,
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
    }

    //get reimburst
    useEffect(() => {
        axios({
            url: 'http://localhost:3000/admin',
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

    //get employee
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
                setemployees(response.data)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
    }, []);

    if (loading) {
        return (<Loader
            type="Circles"
            color="#00BFFF"
            height={100}
            width={100}
            style={{ marginTop: "175px" }}
        />)
    }
    return (
        <div>
            <Button variant="light" style={{ marginBottom: "30px", marginTop: '30px' }}><Link to="/add">Add Reimbursment</Link></Button>
            {/* {JSON.stringify(employees)} */}

            <Form.Group controlId="filterEmployee">
                <Form.Control as="select"
                    style={{ width: "20%", marginLeft: "550px" }}
                    defaultValue={id}
                    onClick={e => {
                        setid(e.target.value)
                        console.log(id, "<<<<IDDDD")
                        filterEmployee(id)
                    }}
                >
                    <option>Filter By Employee</option>
                    {employees.map((x) => {
                        return <option value={x.id} key={x.id}>{x.employee_name}</option>
                    })}
                </Form.Control>
            </Form.Group>


            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th style={{ width: "100px" }}>Image</th>
                        <th>Category</th>
                        <th>Submited By</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {data.map((x) => (
                        <tr key={x.id}>
                            <td>{x.id}</td>
                            <td> <Image src={x.attachment} rounded style={{ height: "25px" }} /></td>
                            <td>{x.category}</td>
                            <td>{x.Employee.employee_name}</td>
                            <td>Rp. {numberWithCommas(x.amount)}</td>
                            <td>{(() => {
                                switch (x.status) {
                                    case "Approved": return <h5><Badge variant="success">Approved</Badge></h5>;
                                    case "Waiting": return <h5><Badge variant="warning">Waiting</Badge></h5>;
                                    case "Rejected": return <h5><Badge variant="danger">Rejected</Badge></h5>;
                                    default: return <h5>Not Confirmed</h5>;
                                }
                            })()}</td>
                            <td>
                                <Link to={`/${x.id}`}><Button variant="primary" style={{ marginRight: "10px" }}>Edit</Button></Link>
                                <Button variant="primary" onClick={(e) => {
                                    e.preventDefault()
                                    axios({
                                        url: 'http://localhost:3000/reimbursment/' + x.id,
                                        method: 'delete',
                                        headers: {
                                            token: localStorage.token
                                        }
                                    })
                                        .then(function (response) {
                                            // handle success
                                            console.log(response, "response<<<<<<<<<<< SUKSES GAKKKKKK")
                                            window.location.reload();

                                        })
                                        .catch(function (error) {
                                            // handle error
                                            console.log(error);
                                        })
                                }}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div >
    )
}
