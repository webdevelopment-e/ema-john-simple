import React, { useContext, useState } from "react";
import {UserContext} from '../../App';
import { useHistory, useLocation } from "react-router-dom";
import { createUserWithEmailAndPassword, handleGoogleSignIn, handleGoogleSignOut, initializeLoginFramework, signInWithEmailAndPassword } from "./loginManager";



function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    password: "",
    photo: "",
  });

  initializeLoginFramework();

  const [ loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () => {
    handleGoogleSignIn()
    .then(res => {
      // setUser(res);
      // setLoggedInUser(res);
      // history.replace(from);
      handleResponse(res, true);
    })
  }

  const  googleSignOut = () =>{
    handleGoogleSignOut()
    .then(res => {
      // setUser(res);
      // setLoggedInUser(res);
      handleResponse(res, false);
    })
  }

  const handleResponse = (res, redirect) => {
    setUser(res);
    setLoggedInUser(res);
    if(redirect){
      history.replace(from);
    }
  }



  // onchange er eventhandler
  const handleBlur = (e) => {
    let isFieldValid = true;
    // console.log(e.target.name, e.target.value);
    if (e.target.name === "email") {
      // const isEmailValid = /\S+@\S+\.\S+/.test(e.target.value);
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
      // console.log(isEmailValid);
    }
    if (e.target.name === "password") {
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;
      // console.log(isPasswordValid && passwordHasNumber);
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  };

  // form er handleSubmit button work
  const handleSubmit = (e) => {
    // console.log(user.email, user.password);
    if (newUser && user.email && user.password) {
      // console.log('submitting')
      createUserWithEmailAndPassword(user.name, user.email, user.password)
      .then(res => {
        // setUser(res);
        // setLoggedInUser(res);
        // history.replace(from);
        handleResponse(res, true);
      })
    }

    if (!newUser && user.email && user.password) {
        signInWithEmailAndPassword(user.email, user.password)
        .then(res => {
          // setUser(res)
          // setLoggedInUser(res)
          // history.replace(from);
          handleResponse(res, true);
        })
    }
    e.preventDefault();
  };



  return (
    <div style = {{textAlign: 'center'}}>
      {user.isSignedIn ? (
        <button onClick={googleSignOut}>Sign out</button>
      ) : (
        <button onClick={googleSignIn}>Sign in</button>
      )}
      <br />
      {<button>Log in using facebook</button>}
      {user.isSignedIn && (
        <div>
          <p>Welcome, {user.name}</p>
          <p>Your email: {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      )}

      <h1>Our own Authentication</h1>
      {/* <p>Name: {user.name}</p> 
        <p>Email: {user.email}</p>
        <p>Password: {user.password}</p> */}

      <input
        type="checkbox"
        onChange={() => setNewUser(!newUser)}
        name="newUser"
      />
      <label htmlFor="newUser">New user registration</label>
      <form onSubmit={handleSubmit}>
        {newUser && (
          <input
            type="text"
            name="name"
            onBlur={handleBlur}
            placeholder="Your name"
          />
        )}
        <br />
        <input
          type="text"
          name="email"
          onBlur={handleBlur}
          placeholder="Your email address"
          required
        />
        <br />
        <input
          type="password"
          name="password"
          onBlur={handleBlur}
          placeholder="Your password"
          required
        />
        <br />
        <input type="submit" value={newUser ? "Sign up" : "Sign in"} />
      </form>
      <p style={{ color: "red" }}>{user.error}</p>
      {user.success && (
        <p style={{ color: "green" }}>
          User {newUser ? "created" : "Logged in"} successfully
        </p>
      )}
    </div>
  );
}

export default Login;
