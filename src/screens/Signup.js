import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Navbar from '../components/Navbar';
export default function Signup() {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: ""})
  let navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
    
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })

    });
    const json = await response.json()
    console.log(json);
    if (json.success) {
      //save the auth toke to local storage and redirect
      localStorage.setItem('token', json.authToken)
      navigate("/login")

    }
    else {
      const errorMessages = json.errors.map(error => error.msg).join(", ");
      alert(errorMessages);
      // alert("Enter Valid Credentials")
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <div style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")', backgroundSize: 'cover',height: '100vh' }}>
      <div>
      <Navbar />
      </div>

        <div className='container' >
          <form className='w-50 m-auto mt-5 border bg-dark' style={{ borderColor: 'purple' }}  onSubmit={handleSubmit}>
         
            <div className="m-3">
              <label htmlFor="name" className="form-label">Username</label>
              <input type="text" className="form-control"  placeholder="Enter your name" name='name' value={credentials.name} onChange={onChange} aria-describedby="emailHelp" />
            </div>
            <div className="m-3">
              <label htmlFor="email" className="form-label">Email ID</label>
              <input type="email" className="form-control"  placeholder="abcd@gmail.com" name='email' value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
              <div id="emailHelp" className="form-text">We'll never share your email with anyone.</div>
            </div>
            <div className="m-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" placeholder="Minimum of 8 Characters" className="form-control" value={credentials.password} onChange={onChange} name='password' />
            </div>
            <button type="submit" className="m-3 btn" style={{ backgroundColor: 'purple', color: 'white' }}>Submit</button>
            <Link to="/login" className="m-3 mx-1 btn" style={{ backgroundColor: '#7b3f00', color: '#fff' }}>Sign in</Link>
          </form>
        </div>
      </div>
  )
}