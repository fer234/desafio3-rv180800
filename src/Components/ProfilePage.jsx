import React, { useContext } from "react";
import { UserContext } from "../providers/UserProvider";
import { auth } from "../firebase";
import { Router, Link } from "@reach/router";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from 'react-toastify';

import Empleado from "./Home/Empleado"
import SignIn from "./SignIn"

const ProfilePage = () => {

  // Asigna un user para leer el contexto del tema actual.
  // React encontrará el Provider superior más cercano y usará su valor.
  const user = useContext(UserContext);

  const { photoURL, displayName, email } = user;
  console.log(" Usuario ProfilePage : " + displayName + " - " + email);

  const signOut = () => {
    auth.signOut();
  };

  return (
    <div>
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand">{displayName}</a>
          </div>
          <ul className="nav navbar-nav">     
            <li><Link to="empleado">Empleado</Link></li>
            <button className="btn btn-danger" onClick={() => { signOut() }}>
              Sign out</button>
          </ul>
        </div>
      </nav>
      <Router>
      <Empleado exact path="empleado"/>
      <SignIn exact path="SignIn"/>
      </Router>
      <ToastContainer />

      <div className="card text-center">
      <div className="card-header">
      Bienvenido
      </div>
      <div className="card-body">
      <h5 className="card-title">En este proyecto encontraras un crud para empleados.</h5>
      <p className="card-text">Fue hecho con React y Firebase.</p>
      <a href="https://github.com/fer234" className="btn btn-info">GitHub</a>
      </div>
      <div className="card-footer text-muted">
      Mira el codigo fuente
      </div>
      </div>
    </div>
  )
};

export default ProfilePage;
