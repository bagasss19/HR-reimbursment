import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Profile() {
    const [data, setdata] = useState([]);

    useEffect(() => {
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
                    setdata(response.data)
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                });
        } else {
            axios({
                url: 'http://localhost:3000',
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
        }

    }, [])

    if (localStorage.role === "admin") {
        return (
            <>
                <h1 className="is-size-1 is-family-code" style={{ marginTop: "50px", marginBottom: "50px" }}>Employee Profile</h1>
                {/* {JSON.stringify(data)} */}

                <table className="table is-hoverable is-fullwidth">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Role</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.map((x) => (
                            <tr key={x.id}>
                                <td>{x.employee_id}</td>
                                <td>{x.employee_name}</td>
                                <td>{x.employee_role}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </>
        )
    } else {
        return (
            <>
                <h1 className="is-size-1 is-family-code" style={{ marginTop: "50px", marginBottom: "50px" }}>Employee Profile</h1>

                <table className="table is-hoverable is-fullwidth">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Role</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>{data.employee_id}</td>
                            <td>{data.employee_name}</td>
                            <td>{data.employee_role}</td>
                        </tr>
                    </tbody>
                </table>
            </>
        )
    }

}
