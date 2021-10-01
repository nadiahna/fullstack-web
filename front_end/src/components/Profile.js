/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import AuthService from "../services/authService";
import authHeader from "../services/auth-header";


const Profile = () => {
  const API_URL = "http://localhost:5000/api/performance/result/";
  const currentUser = AuthService.getCurrentUser();
  const [isUser, setIsUser] = useState(false);
  const [reviewsResult, setReviewsResult] = useState([]);

  useEffect(() => {
    if (currentUser) {
      setIsUser(currentUser.roles.includes("ROLE_USER"));
    }
  }, []);

  useEffect(() => {
    getReviewsResult();
}, []);

const getReviewsResult = async () => {
    const response = await axios.get(API_URL + currentUser.id, { headers: authHeader()});
    setReviewsResult(response.data);
};


// console.log(reviewsResult.score, 'ressu')

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.username}</strong> Profile
        </h3>
      </header>
      <p>
        <strong>Name :</strong> {currentUser.name}
        {/* <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
        {currentUser.accessToken.substr(currentUser.accessToken.length - 20)} */}
      </p>
      <p>
        <strong>{isUser && "Your reviews score:"}</strong> {reviewsResult.map(data => data.score).join(', ')}
      </p>
      <p>
        <strong>Id:</strong> {currentUser.id}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
      <strong>Authorities:</strong>
      <ul>
        {currentUser.roles &&
          currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul>
    </div>
  );
};

export default Profile;
