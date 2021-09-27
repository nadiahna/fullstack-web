/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import authHeader from "../services/auth-header";
import { isEmail } from "validator";

const API_URL = "http://localhost:5000/api/employee/";

const required = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };
  
  const validEmail = (value) => {
    if (!isEmail(value)) {
      return (
        <div className="alert alert-danger" role="alert">
          This is not a valid email.
        </div>
      );
    }
  };
  
  const vname = (value) => {
      if (value.length < 3 || value.length > 20) {
        return (
          <div className="alert alert-danger" role="alert">
            The Name must be between 3 and 20 characters.
          </div>
        );
      }
    };
  
  const vusername = (value) => {
    if (value.length < 3 || value.length > 20) {
      return (
        <div className="alert alert-danger" role="alert">
          The username must be between 3 and 20 characters.
        </div>
      );
    }
  };
  
  const vpassword = (value) => {
    if (value.length < 6 || value.length > 40) {
      return (
        <div className="alert alert-danger" role="alert">
          The password must be between 6 and 40 characters.
        </div>
      );
    }
  };

export default function EditUser() {
    const history = useHistory();
    const { id } = useParams();
    const [name, setName] = useState("")
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onChangeName = (e) => {
        const name = e.target.value;
        setName(name);
      };
    
      const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
      };
    
      const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
      };
    
      const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
      };

      const updateUser = async (e) => {
          e.preventDefault();
          await axios.post(API_URL+"update/"+id, {
            name: name,
            username: username,
            email: email,
            password: password,
          }, {headers: authHeader()})
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
          history.push("/employee/list-users");
      }
      useEffect(() => {
        getEmployeeById();
    }, []);
 
    const getEmployeeById = async () => {
        const response = await axios.get(API_URL+id, {headers: authHeader()});
        setName(response.data.name);
        setUsername(response.data.username);
        setEmail(response.data.email);
        setPassword(response.data.password);
    }

    return(
        <div className="col-md-12">
        <h3>Please edit data employee</h3>
        <div className="card-container">
            <Form onSubmit={updateUser}>
                <div>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <Input
                        type="text"
                        className="form-control"
                        name="name"
                        value={name}
                        onChange={onChangeName}
                        validations={[required, vname]}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <Input
                    type="text"
                    className="form-control"
                    name="username"
                    value={username}
                    onChange={onChangeUsername}
                    validations={[required, vusername]}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <Input
                    type="text"
                    className="form-control"
                    name="email"
                    value={email}
                    onChange={onChangeEmail}
                    validations={[required, validEmail]}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <Input
                    type="password"
                    className="form-control"
                    name="password"
                    value={password}
                    onChange={onChangePassword}
                    validations={[required, vpassword]}
                    />
                </div>

                <div className="form-group">
                    <button className="btn btn-warning btn-block" onClick={() => history.goBack()}>Cancel</button>
                    <button className="btn btn-primary btn-block">Update Employee</button>
                </div>
                </div>
            </Form>
        </div>
    </div>
    )
};
