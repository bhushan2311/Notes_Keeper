import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [credentials, setCredentials] = useState({ email: "", password: "" });
    let navigate = useNavigate();

    const Submit = async (e) => {
        console.log('submit');
        e.preventDefault();
        const url = `http://localhost:8000/api/auth/login`;
        
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        })
        
        const json = await response.json();
        console.log(json);
        if(json.success==="true"){
            // alert('Successfull');
            // Save the auth token and redirect
            localStorage.setItem('token',json.authToken);
            navigate("/");
        }
        else if(json.success==="false"){
            alert('invalid credential');
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]:e.target.value })
    }

    return (
        <div className="container">
            <form className="">
                <div className="mb-3">
                    <label htmlFor="exampleDropdownFormEmail2" className="form-label">Email address</label>
                    <input
                        name="email"
                        type="email"
                        value={credentials.email}
                        onChange={onChange}
                        className="form-control"
                        id="exampleDropdownFormEmail2"
                        placeholder="email@example.com" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleDropdownFormPassword2" className="form-label">Password</label>
                    <input
                        name="password"
                        type="password"
                        value={credentials.password}
                        onChange={onChange}
                        className="form-control"
                        id="exampleDropdownFormPassword2"
                        placeholder="Password" />
                </div>
                <button type="submit"  onClick={Submit} className="btn btn-primary">Sign in</button>
            </form>
        </div>
    )
}

export default Login