import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Table} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import authHeader from "../services/auth-header";

const API_URL = "http://localhost:5000/api/";


export default function ListUsers() {
    const [employee, setEmployee] = useState([]);

    useEffect(() => {
        getEmployee();
    }, []);
 
    const getEmployee = async () => {
        const response = await axios.get(API_URL+"employee/all", { headers: authHeader()});
        setEmployee(response.data);
    };

    const deleteEmployee = async (id) => {
        await axios.delete(API_URL+"employee/delete/" + id, { headers: authHeader()});
        getEmployee();
    };

    return(
        <>
        <h3>List of users</h3>
        <Link to={"/register"}>
            <Button>Add User</Button>
        </Link>
        <Table striped bordered hover>
            <thead>
                <tr>
                <th>#</th>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {employee.map((data, id) => (
                    <tr key={id}>
                    <td>{id+1}</td>
                    <td>{data.name}</td>
                    <td>{data.username}</td>
                    <td>{data.email}</td>
                    <td>
                        <Link to={"/employee/update/"+data.id}>
                            <Button variant="warning">Edit User</Button>
                        </Link>
                        <Button onClick={()=>deleteEmployee(data.id)} variant="danger">Delete User</Button>
                    </td>
                </tr>
                ))}
                
            </tbody>
        </Table>
        </>
    )
};
