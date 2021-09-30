import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import authHeader from "../services/auth-header";

const API_URL = "http://localhost:5000/api/";


export default function RelationUserPage() {
    const [employee, setEmployee] = useState([]);
    const [reviewer, setReviewer] = useState(employee);
    const [reviewerRecipient, setReviewerRecipient] = useState(employee);

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
            reviewer: reviewer,
            reviewer_recipient: reviewerRecipient,
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
    console.log(reviewer, 'reviewr');
    console.log(reviewerRecipient, 'rr')

    // const onChangeReviewer = useState(() => {
    //     return () => {
    //         setReviewer(reviewer);
    //     }
        
    // });

    //   const onChangeReviewerRecipient = useState(() => {
    //     return () => {
    //         setReviewerRecipient(reviewerRecipient);
    //     }
    //   });
    const onChangeReviewer = (e) => {
        const [reviewer] = e.target.value;
        setReviewer(reviewer);
      };

      const onChangeReviewerRecipient = (e) => {
        const reviewerRecipient = e.target.value;
        setReviewerRecipient(reviewerRecipient);
      };

    return(
        <>
            <h3>Create Relation User for Review</h3>
            <div>
                <Form onSubmit={handleSubmit}>
                    <div>
                        <h5>Select user for reviewer</h5>         
                        <select class="form-select" aria-label="Default select example">
                            <option selected value={reviewer} onChange={onChangeReviewer}>Open this select menu</option>
                            {employee.map((employee, id) => (
                                <option key={id}>{employee.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <h5>Select user to receipt a review</h5>
                        <select class="form-select" aria-label="Default select example">
                            <option selected value={reviewerRecipient} onChange={onChangeReviewerRecipient}>Open this select menu</option>
                            {employee.map((employee, id) => (
                                <option key={id}>{employee.name}</option>
                            ))}
                        </select>
                    </div>
                    <Button type="submit">Submit</Button>
                </Form>
            </div>
        </>

    )
}