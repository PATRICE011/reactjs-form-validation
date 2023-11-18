import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [registeredUsers, setRegisteredUsers] = useState([]);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    setRegisteredUsers(storedUsers);
  }, []);

  function validateReg(event) {
    event.preventDefault();

    const username = event.target.username.value;
    const email = event.target.email.value;
    const pass = event.target.password.value;
    const pass2 = event.target.confirmPass.value;

    if (username === '') {
      alert('Username is required!');
      return;
    }

    if (username.length < 3 || username.length > 15) {
      alert('Username must be between 3 and 15 characters.');
      return;
    }

    if (isUsernameTaken(username)) {
      alert('Username is already taken. Please choose a different one.');
      return;
    }

    if (email === '' || !isValidEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    if (isEmailTaken(email)) {
      alert('Email is already taken. Please use a different one.');
      return;
    }

    if (pass.length < 8 || pass.length > 20) {
      alert('Password must be between 8 and 20 characters.');
      return;
    }

    if (pass !== pass2) {
      alert('Passwords do not match.');
      return;
    }

    // Save data to local storage or state
    const newUser = {
      username: username,
      email: email,
      password: pass,
    };

    const usersInStorage = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    const updatedUsers = [...usersInStorage, newUser];
    localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));

    setRegisteredUsers(updatedUsers);
    alert('Registration successful!');

    event.target.reset();
  }

  function validateLogin(event) {
    event.preventDefault();

    const email = event.target.loginEmail.value;
    const password = event.target.loginPass.value;

    const foundUser = registeredUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (!foundUser) {
      alert('Invalid email or password.');
      return;
    }

    alert(`Welcome, ${foundUser.username}!`);
  }

  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function isUsernameTaken(username) {
    return registeredUsers.some((user) => user.username === username);
  }

  function isEmailTaken(email) {
    return registeredUsers.some((user) => user.email === email);
  }

  return (
    <section id="Validation">
      {/* Registration form */}
      <form className="container" onSubmit={validateReg}>
        <div className="regform">
          <h2>Register</h2>
          <div className="input-container">
            <label htmlFor="username">Username</label>
            <input type="text" name="username" id="username" required />
          </div>
          <div className="input-container">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="input-container">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required />
          </div>
          <div className="input-container">
            <label htmlFor="confirmPass">Confirm Password</label>
            <input type="password" id="confirmPass" name="confirmPass" required />
          </div>
          <button type="submit">Sign Up</button>
        </div>
      </form>

      {/* Log in form */}
      <form className="container" onSubmit={validateLogin}>
        <div className="logform">
          <h2>Log In</h2>
          <div className="input-container">
            <label htmlFor="loginEmail">Email</label>
            <input type="email" id="loginEmail" name="loginEmail" required />
          </div>
          <div className="input-container">
            <label htmlFor="loginPass">Password</label>
            <input type="password" id="loginPass" name="loginPass" required />
          </div>
          <button type="submit">Log In</button>
        </div>
      </form>
    </section>
  );
}

export default App;
