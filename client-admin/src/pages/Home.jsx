import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import axios from 'axios'
import {
    Link
} from "react-router-dom";

export default function Home() {
    const [data, setdata] = useState([]);
    const [loading, setloading] = useState(true)


    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

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

    if(loading) {
        return (<h1>Loading...</h1>)
    }
    return (
        <div>
            {/* <h1>Your Reimbursment</h1> */}
            <Button variant="dark" style={{ marginBottom: "30px", marginTop: '30px' }}><Link to="/add">Add Reimbursment</Link></Button>
            {/* {JSON.stringify(data)} */}
            <div className="container">
                <div className="row">
                    {data.map((x) => (
                        <div className="col-md-4 col-sm-6">
                            <Card key={x.id} style={{ width: '18rem', marginRight: "20px" }}>
                                <Card.Img variant="top" src={x.attachment} />
                                <Card.Body>
                                    <Card.Title>{x.category}</Card.Title>
                                    <Card.Text>
                                        <p>Submited By : {x.Employee.employee_name}</p>
                                        <p>{numberWithCommas(x.amount)}</p>
                                        <p>{x.status}</p>
                                    </Card.Text>
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
                                </Card.Body>
                            </Card>
                            <br></br>
                            {/* <Link to={`/detail/${pokemon.id}`}><button className="btn btn-primary btn-mrgn">
                                Detail</button></Link> */}
                            {/* <button className="btn btn-primary" onClick={() => dispatch({ type: "ADDFAV", value: pokemon.imageUrl })} >
                                Add to Deck</button> */}
                            <br></br><br></br>

                        </div>))}
                </div></div>
        </div>
    )
}
