/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import authHeader from "../services/auth-header";
import AuthService from "../services/authService";

const API_URL = "http://localhost:5000/api/performance";

export default function ListPerformanceReviews() {
    const [performance, setPerformance] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [currentUser, setCurrentUser] = useState('');
    

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
        setCurrentUser(user);
        setIsAdmin(user.roles.includes("ROLE_ADMIN"));
    }
  }, []);
  console.log(currentUser, 'user');

    useEffect(() => {
        getPerformance();
    }, []);
 
    const getPerformance = async () => {
        const response = await axios.get( isAdmin ? API_URL+"/all" : API_URL+"By/" + currentUser.id, { headers: authHeader()});
        setPerformance(response.data);
    };

    console.log(performance, 'perf');

    const deletePerformance = async (id) => {
        await axios.delete(API_URL+"delete/" + id, { headers: authHeader()});
        getPerformance();
    };
    return(
        <>
            <h3>List Performance Reviews</h3>
            {isAdmin && 
                <>
                    <Link to={"/employee/add-performance"}>
                        <Button>Add Review</Button>
                    </Link>
                    <Link to={"/employee/create/relation"}>
                            <Button>Create Relation Between Employee</Button>
                    </Link>
                </>
            }
            <Table striped bordered hover>
                {isAdmin ? 
                <>
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
                            <Link to={"/employee/update-performance/"+data.id}>
                                <Button variant="warning">Edit</Button>
                            </Link>
                            <Button onClick={()=>deletePerformance(data.id)} variant="danger">Delete</Button>
                        </td>
                    </tr>
                    ))}
                    
                </tbody>
                </> : 
                <>
                    <thead>
                    <tr>
                    <th>#</th>
                    <th>Reviewer Recipient</th>
                    <th>Your Feedback</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {performance.map((data, id) => (
                        <tr key={id}>
                            <td>{id+1}</td>
                            <td>{data.reviewer_recipient}</td>
                            <td>{data.score}</td>
                        <td>
                            <Link to={"/employee/update-performance/"+data.id}>
                                <Button variant="warning">Add/Edit Feedback</Button>
                            </Link>
                        </td>
                    </tr>
                    ))}
                    
                </tbody>
                </>}
            </Table>
        </>
    )
}