import React, { useEffect, useState } from 'react'
import Loader from 'react-loader-spinner'
import axios from 'axios'
import {
    Link
} from "react-router-dom";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
// import { useSelector } from 'react-redux'
export default function Home() {
    const [data, setdata] = useState([]);
    const [employees, setemployees] = useState([]);
    const [loading, setloading] = useState(true)
    const [id, setid] = useState(0)

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    function filterEmployee(id) {
        console.log(id, "<<<<IDDDD")
        if (id === "Filter By Employee") {
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
        }
        else {
            console.log("Bagas Tampan")
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
                })
        }
    }


    useEffect(() => {
        //get employee for admin
        if (localStorage.role === "admin") {
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

            //get reimburst for admin
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
        }
        else {
            //get reimburst for employee
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
        }

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

    if (localStorage.role === "admin") {
        return (
            <>
                <Link to="/add">
                    <button className="button is-black"
                        style={{ marginBottom: "30px", marginTop: '30px' }}>Add Reimbursment</button>
                </Link>

                <div className="field" style={{ marginBottom: "30px" }}>
                    <div className="control">
                        <div className="select is-info">
                            <select
                                defaultValue={id}
                                onChange={(e) =>
                                    setid(e.target.value)
                                    // console.log(id, "<<<<IDDDD")
                                    // filterEmployee(id)
                                }
                                onClick={() => {
                                    filterEmployee(id)
                                }
                                }>

                                <option>Filter By Employee</option>
                                {employees.map((x) => {
                                    return <option value={x.id} key={x.id}>{x.employee_name}</option>
                                })}
                            </select>
                        </div>
                    </div>
                </div>

                <table className="table is-hoverable is-fullwidth">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Image</th>
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
                                <td><figure className="image is-32x32"> <img src={x.attachment} alt="img" style={{ height: "25px" }} /></figure></td>
                                <td>{x.category}</td>
                                <td>{x.Employee.employee_name}</td>
                                <td>Rp. {numberWithCommas(x.amount)}</td>
                                <td>{(() => {
                                    switch (x.status) {
                                        case "Approved": return <span className="tag is-success">Approved</span>
                                        case "Waiting": return <span className="tag is-warning">Waiting</span>
                                        case "Rejected": return <span className="tag is-danger">Rejected</span>
                                        default: return <h5>Not Confirmed</h5>;
                                    }
                                })()}</td>
                                <td>
                                    <Link to={`/${x.id}`}><button className="button is-black" style={{ marginRight: "10px" }}>Edit</button></Link>
                                    <button className="button is-black" onClick={(e) => {
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
                                    }}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </>
        )
    }

    //employee home
    else {
        return (
            <>
               <h1 className="is-size-1 is-family-code" style={{ marginTop: "50px" }}>Your Reimbursment</h1>
               <Link to="/add">
                    <button className="button is-black"
                        style={{ marginBottom: "30px", marginTop: '30px' }}>Add Reimbursment</button>
                </Link>
                <table className="table is-hoverable is-fullwidth" style={{marginTop : "50px"}}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Image</th>
                            <th>Category</th>
                            <th>Amount</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.map((x) => (
                            <tr key={x.id}>
                                <td>{x.id}</td>
                                <td><figure className="image is-32x32"> <img src={x.attachment} alt="img" style={{ height: "25px" }} /></figure></td>
                                <td>{x.category}</td>
                                <td>Rp. {numberWithCommas(x.amount)}</td>
                                <td>{(() => {
                                    switch (x.status) {
                                        case "Approved": return <span className="tag is-success">Approved</span>
                                        case "Waiting": return <span className="tag is-warning">Waiting</span>
                                        case "Rejected": return <span className="tag is-danger">Rejected</span>
                                        default: return <h5>Not Confirmed</h5>;
                                    }
                                })()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </>)
    }
}
