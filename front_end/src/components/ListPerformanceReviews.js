import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import authHeader from "../services/auth-header";

const API_URL = "http://localhost:5000/api/performance/";

export default function ListPerformanceReviews() {
    const [performance, setPerformance] = useState([]);

    useEffect(() => {
        getPerformance();
    }, []);
 
    const getPerformance = async () => {
        const response = await axios.get(API_URL+"all", { headers: authHeader()});
        setPerformance(response.data);
    };

    const deletePerformance = async (id) => {
        await axios.delete(API_URL+"delete/" + id, { headers: authHeader()});
        getPerformance();
    };
    return(
        <>
            <h3>List Performance Reviews</h3>
            <Link to={"/register"}>
                <Button>Add Review</Button>
            </Link>{'   '}
            <Link to={"/employee/create/relation"}>
                <Button>Create Relation Between Employee</Button>
            </Link>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Reviewer</th>
                    <th>Reviewer Recipient</th>
                    <th>Score</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {performance.map((data, id) => (
                        <tr key={id}>
                            <td>{id+1}</td>
                            <td>{data.reviewer}</td>
                            <td>{data.reviewer_recipient}</td>
                            <td>{data.score}</td>
                        <td>
                            <Link to={"/employee/update/"+data.id}>
                                <Button variant="warning">Edit User</Button>
                            </Link>
                            <Button onClick={()=>deletePerformance(data.id)} variant="danger">Delete User</Button>
                        </td>
                    </tr>
                    ))}
                    
                </tbody>
            </Table>
        </>
    )
}