import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router';
import authHeader from "../services/auth-header";

const API_URL = "http://localhost:5000/api/";


export default function RelationUserPage() {
    const history = useHistory();
    const [employee, setEmployee] = useState([]);
    const [reviewer, setReviewer] = useState();
    const [reviewerRecipient, setReviewerRecipient] = useState();
    const [selectReviewer, setSelectReviewer] = useState();
    const [selectRecipient, setSelectRecipient] = useState();

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
            id_reviewer: reviewer,
            id_reviewer_recipient: reviewerRecipient,
            reviewer: selectReviewer,
            reviewer_recipient: selectRecipient,
        }, {headers: authHeader()})
        .then(function(response){
            console.log(response);
        })
        .catch(function(err){
            console.log(err)
        });
        history.push("/employee/list-performance");
    }


    const onChangeReviewer = (e) => {
        const reviewer = e.target.value;
        const selectId = employee.find(e => e.id === parseInt(reviewer));
        const selectName = selectId.name;
        setReviewer(reviewer);
        setSelectReviewer(selectName);
      };

      const onChangeReviewerRecipient = (e) => {
        const reviewerRecipient = e.target.value;
        const selectId = employee.find(e => e.id === parseInt(reviewerRecipient));
        const selectName = selectId.name;
        setReviewerRecipient(reviewerRecipient);
        setSelectRecipient(selectName);
      };

    return(
        <>
            <h3>Create Relation User for Review</h3>
            <div>
                <Form onSubmit={handleSubmit}>
                    <div>
                        <h5>Select user for reviewer</h5>         
                        <select class="form-select" aria-label="Default select example" onChange={onChangeReviewer}>
                            <option selected value={reviewer}>Open this select menu</option>
                            {employee.map((employee, id) => (
                                <option key={id} value={employee.id}>{employee.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <h5>Select user to receipt a review</h5>
                        <select class="form-select" aria-label="Default select example" onChange={onChangeReviewerRecipient}>
                            <option selected value={reviewerRecipient}>Open this select menu</option>
                            {employee.map((employee, id) => (
                                <option key={id} value={employee.id}>{employee.name}</option>
                            ))}
                        </select>
                    </div>
                    <Button type="submit">Submit</Button>
                </Form>
            </div>
        </>

    )
}