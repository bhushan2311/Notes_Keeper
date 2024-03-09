import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = () => {

  const [credentials, setCredentials] = useState({ name: "", email: "", password: "" });
  let navigate = useNavigate();

  const Submit = async () => {
    const { name, email, password } = credentials;

    const url = `http://localhost:8000/api/auth/createuser`
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, password })
    })

    console.log("Itthe alo");
    const json = await response.json();
    console.log(json);
    console.log("hi json");
    console.log(json.success);

    if (json.success === "true") {
      // Save the auth token and redirect
      localStorage.setItem('token',json.authToken);
      console.log("navigate below 3000");
      navigate("/"); 
    }
    else if (json.success === "false") {
      alert('invalid credential');
    }

  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  return (
    <div className="container">
      <form className="">
        <div className="mb-3">
          <label htmlFor="exampleDropdownFormEmail2" className="form-label">Full Name</label>
          <input
            name="name"
            type="name"
            value={credentials.name}
            onChange={onChange}
            className="form-control"
            id="name"
            placeholder="email@example.com" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleDropdownFormEmail2" className="form-label">Email address</label>
          <input
            name="email"
            type="email"
            value={credentials.email}
            onChange={onChange}
            className="form-control"
            id="email"
            placeholder="email@example.com" minLength={5} required />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleDropdownFormPassword2" className="form-label">Password</label>
          <input
            name="password"
            type="password"
            value={credentials.password}
            onChange={onChange}
            className="form-control"
            id="password"
            placeholder="Password" minLength={5} required />
        </div>
        <button type="submit" onClick={Submit} className="btn btn-primary">Sign in</button>
      </form>
    </div>
  )
}

export default Signup;