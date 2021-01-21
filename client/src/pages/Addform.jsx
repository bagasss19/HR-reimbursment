import React, { useState, useEffect } from 'react'
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

    function adminAdd() {
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


    if (localStorage.role === "admin") {
        return (
            <>
                <h1 className="is-size-1 is-family-code" style={{ marginTop: "50px" }}>Add Reimbursment</h1>
                <form className="form" style={{ marginTop: "100px", width: "50%", marginLeft: "300px" }}
                    encType="multipart/form-data"
                    onSubmit={(e) => {
                        e.preventDefault()
                        adminAdd()
                        console.log(attachment, "<<<<<<<<<<<<<<SUBMIT FORM");
                    }
                    }>


                    <div className="field">
                        <label className="label is-family-code">Employee</label>
                        <div className="select is-info" style={{ marginBottom: "30px" }}>
                            <select name="employee_id" onChange={e => setemployee(e.target.value)}>
                                <option>Select Employee</option>
                                {data.map(x => {
                                    return <option value={x.id} key={x.id}>{x.employee_name}</option>
                                })}
                            </select>
                        </div>
                    </div>

                    <div className="field">
                        <label className="label is-family-code">Category</label>
                        <div className="select is-info" style={{ marginBottom: "30px" }}>
                            <select name="category" onChange={e => setcategory(e.target.value)}>
                                <option>Food & Beverages</option>
                                <option>Transportation</option>
                                <option>Office Supplies</option>
                            </select>
                        </div>
                    </div>

                    <div className="field">
                        <label className="label is-family-code">Amount</label>
                        <input className="input" type="text" name="amount"
                            style={{ marginBottom: "30px" }}
                            placeholder="Amount" onChange={e => setamount(e.target.value)} />
                    </div>

                    <ImageUploader
                        style={{ marginBottom: "30px" }}
                        withIcon={true}
                        buttonText='Choose images'
                        onChange={onDrop}
                        imgExtension={['.jpg', '.gif', '.png', '.gif']}
                        maxFileSize={5242880}
                        withPreview={true}
                        singleImage={true}
                    />

                    <button className="button is-black" type="submit">Submit</button>
                </form>
            </>
        )
    } else {
        return (
            <>
                <h1 className="is-size-1 is-family-code" style={{ marginTop: "50px" }}>Add Reimbursment</h1>
                <form className="form" style={{ marginTop: "100px", width: "50%", marginLeft: "300px" }}
                    encType="multipart/form-data"
                    onSubmit={(e) => {
                        e.preventDefault()
                        add()
                        console.log(attachment, "<<<<<<<<<<<<<<SUBMIT FORM");
                    }
                    }>

                    <div className="field">
                        <label className="label is-family-code">Category</label>
                        <div className="select is-info" style={{ marginBottom: "30px" }}>
                            <select name="category" onChange={e => setcategory(e.target.value)}>
                                <option>Food & Beverages</option>
                                <option>Transportation</option>
                                <option>Office Supplies</option>
                            </select>
                        </div>
                    </div>

                    <div className="field">
                        <label className="label is-family-code">Amount</label>
                        <input className="input" type="text" name="amount"
                            style={{ marginBottom: "30px" }}
                            placeholder="Amount" onChange={e => setamount(e.target.value)} />
                    </div>

                    <ImageUploader
                        style={{ marginBottom: "30px" }}
                        withIcon={true}
                        buttonText='Choose images'
                        onChange={onDrop}
                        imgExtension={['.jpg', '.gif', '.png', '.gif']}
                        maxFileSize={5242880}
                        withPreview={true}
                        singleImage={true}
                    />

                    <button className="button is-black" type="submit">Submit</button>
                </form>
            </>
        )
    }

}
