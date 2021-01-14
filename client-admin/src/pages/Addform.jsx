import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import '../App.css'
import axios from 'axios'
import ImageUploader from 'react-images-upload';

export default function Addform(props) {
    const [data, setdata] = useState([])
    const [category, setcategory] = useState("")
    const [employee, setemployee] = useState("")
    const [amount, setamount] = useState(0)
    const [attachment, setattachment] = useState(null)

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
                setdata(response.data)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
    }, []);

    function onDrop(picture) {
        console.log(picture[0], "<<<<<ada gak???")
        setattachment(picture[0])
    }

    function add() {
        const input = new FormData();
        input.append('attachment', attachment)
        input.append('category', category)
        input.append('employee_id', employee)
        input.append('amount', amount)

        // for (let pair of input.entries()) {
        //     console.log(pair[0] + ', ' + pair[1]);
        // }

        const config = {
            headers: {
                token: localStorage.token
            }
        };
        axios.post("http://localhost:3000/admin/reimbursment", input, config)
            .then(function (response) {
                // handle success
                props.history.push('/')

            })
            .catch(function (error) {
                // handle error
                console.log(error, "<<<<<<<<<<<<<<ERRRORRR");
            })
    }
    return (
        <>
            <h1 style={{ marginTop: "50px" }}>Add Reimbursment</h1>
            <Form style={{ marginTop: "100px", width: "50%", marginLeft: "300px" }}
                encType="multipart/form-data"
                onSubmit={(e) => {
                    e.preventDefault()
                    add()
                    console.log(attachment, "<<<<<<<<<<<<<<SUBMIT FORM");
                }
                }>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Employee</Form.Label>
                    <Form.Control as="select" name="employee_id" onChange={e => setemployee(e.target.value)}>
                        <option>Select Employee</option>
                        {data.map(x => {
                            return <option value={x.id} key={x.id}>{x.employee_name}</option>
                        })}
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Category</Form.Label>
                    <Form.Control as="select" name="category" onChange={e => setcategory(e.target.value)}>
                        <option>Food & Beverages</option>
                        <option>Transportation</option>
                        <option>Office Supplies</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="formGroupEmail">
                    <Form.Label>Amount</Form.Label>
                    <Form.Control type="text" name="amount" placeholder="Amount" onChange={e => setamount(e.target.value)} />
                </Form.Group>

                <ImageUploader
                    withIcon={true}
                    buttonText='Choose images'
                    onChange={onDrop}
                    imgExtension={['.jpg', '.gif', '.png', '.gif']}
                    maxFileSize={5242880}
                    withPreview={true}
                    singleImage={true}
                />
{/* 
                <Form.Group controlId="editForm">
                    <Form.Label>Attachment</Form.Label>
                    <Form.Control name="attachment" type="file" placeholder="Attachment"
                        // defaultValue={attachment}
                        onChange={e => {
                            console.log(e.target.files[0], "<<<<<<<<<<<<VALUE IMAGE")
                            setattachment(e.target.files[0])
                        }} />
                </Form.Group> */}

                <Button variant="primary" type="submit">Submit</Button>
            </Form>
        </>
    )
}
