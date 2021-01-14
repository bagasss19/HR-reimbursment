import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import '../App.css'
import ImageUploader from 'react-images-upload';
import axios from 'axios'

export default function Login(props) {
    const [category, setcategory] = useState("Food & Beverages")
    const [amount, setamount] = useState(0)
    const [attachment, setattachment] = useState("")

    function add() {
        const input = new FormData();
        input.append('attachment', attachment)
        input.append('category', category)
        input.append('amount', amount)

        // for (let pair of input.entries()) {
        //     console.log(pair[0] + ', ' + pair[1]);
        // }

        const config = {
            headers: {
                token: localStorage.token
            }
        };
        axios.post("http://localhost:3000/reimbursment", input, config)
            .then(function (response) {
                // handle success
                props.history.push('/')

            })
            .catch(function (error) {
                // handle error
                console.log(error, "<<<<<<<<<<<<<<ERRRORRR");
            })
    }

    function onDrop(picture) {
            console.log(picture[0], "<<<<<ada gak???")
            setattachment(picture[0])
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

                {/* <Form.Group controlId="formBasicPassword">
                    <Form.Label>Attachment</Form.Label>
                    <Form.Control type="text" placeholder="Attachment" onChange={e => setattachment(e.target.value)} />
                </Form.Group> */}


                <ImageUploader
                    withIcon={true}
                    buttonText='Choose images'
                    onChange={onDrop}
                    imgExtension={['.jpg', '.gif', '.png', '.gif']}
                    maxFileSize={5242880}
                    withPreview={true}
                    singleImage={true}
                />

                <Button variant="primary" type="submit">Submit</Button>
            </Form>
        </>
    )
}
