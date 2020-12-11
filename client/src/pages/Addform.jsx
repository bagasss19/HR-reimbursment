import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import '../App.css'
import axios from 'axios'

export default function Login(props) {
    const [category, setcategory] = useState("Food & Beverages")
    const [amount, setamount] = useState(0)
    const [attachment, setattachment] = useState("")

    function add() {
        axios({
            url: 'http://localhost:3000/reimbursment',
            method: 'post',
            data: {
                category, amount, attachment
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
    return (
        <>
            <h1 style={{ marginTop: "50px" }}>Add Reimbursment</h1>
            <Form style={{ marginTop: "100px", width: "50%", marginLeft: "300px" }}
                onSubmit={(e) => {
                    e.preventDefault()
                    add()
                    console.log(category, amount, attachment, "<<<<<<<<<<<<<<SUBMIT FORM");
                }
                }>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Category</Form.Label>
                    <Form.Control as="select" onChange={e => setcategory(e.target.value)}>
                        <option>Food & Beverages</option>
                        <option>Transportation</option>
                        <option>Office Supplies</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="formGroupEmail">
                    <Form.Label>Amount</Form.Label>
                    <Form.Control type="text" placeholder="Amount" onChange={e => setamount(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Attachment</Form.Label>
                    <Form.Control type="text" placeholder="Attachment" onChange={e => setattachment(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit">Submit</Button>
            </Form>
        </>
    )
}
