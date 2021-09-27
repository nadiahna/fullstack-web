import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import authHeader from "../services/auth-header";

const API_URL = "http://localhost:5000/api/";


export default function RelationUserPage() {
    const [employee, setEmployee] = useState([]);

    useEffect(() => {
        getEmployee();
    }, []);
 
    const getEmployee = async () => {
        const response = await axios.get(API_URL+"employee/all", { headers: authHeader()});
        setEmployee(response.data);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(API_URL+"performance/create",{
            reviewer: employee.name,
            reviewer_recipient: employee.name,
            id_reviewer: employee.id,
            id_reviewer_recipient: employee.id
        }, {headers: authHeader()})
        .then(function(response){
            console.log(response);
        })
        .catch(function(err){
            console.log(err)
        });
    }
    return(
        <>
            <h3>Create Relation User for Review</h3>
            <div>
                <Form onSubmit={handleSubmit}>
                    <div>
                        <h5>Select user for reviewer</h5>         
                        <select class="form-select" aria-label="Default select example">
                            <option selected>Open this select menu</option>
                            {employee.map((employee, id) => (
                                <option value={id}>{employee.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <h5>Select user to receipt a review</h5>
                        <select class="form-select" aria-label="Default select example">
                            <option selected>Open this select menu</option>
                            {employee.map((employee, id) => (
                                <option value={id}>{employee.name}</option>
                            ))}
                        </select>
                    </div>
                    <Button type="submit">Submit</Button>
                </Form>
            </div>
        </>

    )
}