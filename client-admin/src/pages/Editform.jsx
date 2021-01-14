import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import '../App.css'
import axios from 'axios'
import {
    useParams
} from "react-router-dom";

export default function Editform(props) {
    let { id } = useParams();
    const [category, setcategory] = useState("")
    const [status, setstatus] = useState("")
    const [amount, setamount] = useState(0)
    const [loading, setloading] = useState(true)

    useEffect(() => {
        axios({
            url: 'http://localhost:3000/reimbursment/' + id,
            method: 'get',
            headers: {
                token: localStorage.token
            }
        })
            .then(function (response) {
                // handle success
                console.log(response.data.amount, "response<<<<<<<<<<<")
                setamount(response.data.amount)
                setcategory(response.data.category)
                setstatus(response.data.status)
                setloading(false)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
    }, [])

    function edit() {
        axios({
            url: 'http://localhost:3000/reimbursment/' + id,
            method: 'put',
            data: {
                category, amount, status
            },
            headers: {
                token: localStorage.token
            }
        })
            .then(function (response) {
                // handle success
                props.history.push('/')
                console.log(response, "response<<<<<<<<<<< SUKSES GAKKKKKK")

            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    if (loading) {
        return (<h1>Loading...</h1>)
    }
    return (
        <>
            <h1 style={{ marginTop: "50px" }}>Edit Reimbursment {id}</h1>
            <Form style={{ marginTop: "100px", width: "50%", marginLeft: "300px" }}
                onSubmit={(e) => {
                    e.preventDefault()
                    edit()
                    console.log(category, amount, "<<<<<<<<<<<<<<SUBMIT FORM");
                }
                }>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Category</Form.Label>
                    <Form.Control as="select"
                        defaultValue={category}
                        onChange={e => setcategory(e.target.value)}>
                        <option>Food & Beverages</option>
                        <option>Transportation</option>
                        <option>Office Supplies</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="formGroupEmail">
                    <Form.Label>Amount</Form.Label>
                    <Form.Control type="text" placeholder="Amount"
                        defaultValue={amount}
                        onChange={e => setamount(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Approval</Form.Label>
                    <Form.Control as="select"
                        defaultValue={status}
                        onChange={e => setstatus(e.target.value)}>
                        <option>Waiting</option>
                        <option>Approved</option>
                        <option>Rejected</option>
                    </Form.Control>
                </Form.Group>

                <Button variant="primary" type="submit">Submit</Button>
            </Form>
        </>
    )
}