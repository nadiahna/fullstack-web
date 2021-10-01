import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import authHeader from "../services/auth-header";
import AuthService from "../services/authService";

const API_URL = "http://localhost:5000/api/";

export default function AddPerfomanceReviews() {
    const history = useHistory();
    const [employee, setEmployee] = useState([]);
    const [score, setScore] = useState('');
    const [reviewer, setReviewer] = useState();
    const [reviewerRecipient, setReviewerRecipient] = useState();
    const [selected, setSelected] = useState();
    const [currentUser, setCurrentUser] = useState(undefined);
    const user = AuthService.getCurrentUser();

    useEffect(() => {
        getEmployee();
    }, []);
 
    const getEmployee = async () => {
        const response = await axios.get(API_URL+"employee/all", { headers: authHeader()});
        setEmployee(response.data);
    };

    const onChangeScore = (e) => {
        const score = e.target.value;
        setScore(score);
      };

      const onChangeReviewerRecipient = (e) => {
        const reviewerRecipient = e.target.value;
        const selectId = employee.find(e => e.id === parseInt(reviewerRecipient));
        const selectName = selectId.name;
        setReviewerRecipient(reviewerRecipient);
        setSelected(selectName);
      };
      console.log(selected, 'sel');

    const handleSubmit = async(e) => {
        e.preventDefault();
        await axios.post(API_URL+"performance/create", {
            id_reviewer: user.id,
            id_reviewer_recipient: reviewerRecipient,
            reviewer: user.name,
            reviewer_recipient: selected,
            score: score,
          }, {headers: authHeader()})
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
          history.push("/employee/list-performance");
    }


    return(
        <>
            <div className="col-md-12">
                <h3>Please add your feedback</h3>
                <div className="card-container">
                    <Form onSubmit={handleSubmit}>
                        <div>
                            <div>
                                <h5>Select user to receipt a review</h5>
                                <select class="form-select" aria-label="Default select example" onChange={onChangeReviewerRecipient}>
                                    <option selected>Open this select menu</option>
                                    {employee.map((employee, id) => (
                                        <option key={id} value={employee.id}>{employee.name}</option>
                                    ))}
                                </select>
                            </div>
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
                                <button className="btn btn-primary btn-block">Add Feedback</button>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    )
}