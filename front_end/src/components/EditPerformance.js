import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import authHeader from "../services/auth-header";
import AuthService from "../services/authService";

const API_URL = "http://localhost:5000/api/";

export default function EditPerformance() {
    const history = useHistory();
    const { id } = useParams();
    const [employee, setEmployee] = useState([]);
    const [score, setScore] = useState('');
    const [reviewerRecipient, setReviewerRecipient] = useState();
    const [reviewer, setReviewer] = useState(employee);
    const [isAdmin, setIsAdmin] = useState(false);
    const currentUser = AuthService.getCurrentUser();
    

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setIsAdmin(user.roles.includes("ROLE_ADMIN"));
    }
  }, []);


    useEffect(() => {
        getEmployee();
        getPerformanceById();
    }, []);
 
    const getEmployee = async () => {
        const response = await axios.get(API_URL+"employee/all", { headers: authHeader()});
        setEmployee(response.data);
    };

    const getPerformanceById = async () => {
        const response = await axios.get(API_URL+"performance/"+id, {headers: authHeader()});
        setReviewer(response.data.reviewer);
        setReviewerRecipient(response.data.reviewer_recipient);
        setScore(response.data.score);
    }

    const updatePerformance = async (e) => {
        e.preventDefault();
        await axios.post(API_URL+"performance/update/"+id, {
          id_reviewer: reviewer,
          id_reviewer_recipient: reviewerRecipient,
          score: score,
        }, {headers: authHeader()})
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
        history.push("/employee/list-performance");
    };

    const onChangeScore = (e) => {
        const score = e.target.value;
        setScore(score);
      };
      console.log(reviewer,score, 'score')

      const onChangeReviewer = (e) => {
        const reviewer = e.target.value;
        setReviewer(reviewer);
      };

      const onChangeReviewerRecipient = (e) => {
        const reviewerRecipient = e.target.value;
        setReviewerRecipient(reviewerRecipient);
      };

      console.log(employee, 'emp');

    return(
        <>
            <div className="col-md-12">
                <h3>Please update your review</h3>
                <div className="card-container">
                    <Form onSubmit={updatePerformance}>
                        <div>
                            {isAdmin ? <>
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
                            </> : 
                            <div>{reviewerRecipient}</div>
                            }
                            
                            <div className="form-group">
                                <label htmlFor="score">Score</label>
                                <Input
                                type="text"
                                className="form-control"
                                name="score"
                                value={score}
                                onChange={onChangeScore}
                                />
                            </div>
                            <div className="form-group">
                                <button className="btn btn-warning btn-block" onClick={() => history.goBack()}>Back</button>
                                <button className="btn btn-primary btn-block">Update Feedback</button>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    )
}