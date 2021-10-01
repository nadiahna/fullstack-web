import React, { useState, useEffect } from "react";
import { Switch, Route, Link, BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/authService";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardAdmin from "./components/BoardAdmin";
import ListUsers from "./components/ListUsers";
import EditUser from "./components/EditUser";
import ListPerformanceReviews from "./components/ListPerformanceReviews";
import AddPerfomanceReviews from "./components/AddPerfomanceReviews";
import EditPerformance from "./components/EditPerformance";
import RelationUserPage from "./components/RelationUserPage";

export default function App() {
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>

            {showAdminBoard && (
              <>
              {/* <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li> */}
              <li className="nav-item">
                <Link to={"/employee/list-users"} className="nav-link">
                  List Users
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link to={"/employee/list-performance"} className="nav-link">
                  List Performance
                </Link>
              </li> */}
              </>
            )}

            {currentUser && (
              <>
                <li className="nav-item">
                  <Link to={"/employee/list-performance"} className="nav-link">
                    List Performance
                  </Link>
                </li>
                {/* <li className="nav-item">
                  <Link to={"/user"} className="nav-link">
                    User
                  </Link>
                </li> */}
              </>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/user" component={BoardUser} />
            <Route path="/admin" component={BoardAdmin} />
            <Route path="/employee/list-users" component={ListUsers} />
            <Route path="/employee/update/:id" component={EditUser} />
            <Route path="/employee/list-performance" component={ListPerformanceReviews} />
            <Route path="/employee/add-performance" component={AddPerfomanceReviews} />
            <Route path="/employee/update-performance/:id" component={EditPerformance} />
            <Route path="/employee/create/relation" component={RelationUserPage} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};
