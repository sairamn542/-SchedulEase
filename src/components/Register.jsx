import axios from 'axios'
// import { response } from 'express'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

function Register() {
    const[msg,setMsg] = useState('');
    // const[validClass, setValidClass] = useState('');
    let navigate = useNavigate()
    const formik = useFormik({
        initialValues : {
            UserId: "",
            UserName : "",
            Password : "",
            Email : "",
            Mobile : ""
        },
        onSubmit : (user)=>{
            axios.post(`http://127.0.0.1:2345/register-user`,user)
            .then(()=>{
                alert('Register successfully');
                navigate('/login')
            })
        }
    })
    function VerifyUsers(e) {
        axios.get(`http://127.0.0.1:2345/get-users`)
        .then(response=>{
            for(var data of response.data) {
                if(data.UserId === e.target.value) {
                    setMsg('UserId Taken - Try Another')
                    // setValidClass('text-danger')
                    break;
                } else {
                    setMsg('UserId Available')
                    // setValidClass('text-success')
                }
            }
        })
    }
  return (
    <div>
        <form onSubmit={formik.handleSubmit} className='bg-light p-4 m-3 border border-2 border-primary rounded w-25'>
            <div className='h5 bi bi-person-fill'>Register User</div>
            <dl>
                <dt>User Id</dt>
                <dd><input type="text" onKeyUp={VerifyUsers} name='UserId' onChange={formik.handleChange} className='form-control' /></dd>
                {/* <dd className={validClass}>{msg}</dd> here we can also apply suing ternary operator with css */} 
                <dd className={msg === 'UserId Available' ? 'text-success' : 'text-danger'}>{msg}</dd>
                <dt>User Name</dt>
                <dd><input type="text" name='UserName' onChange={formik.handleChange} className='form-control' /></dd>
                <dt>Password</dt>
                <dd><input type="text" name='Password' onChange={formik.handleChange} className='form-control' /></dd>
                <dt>Email</dt>
                <dd><input type="email" name='Email' onChange={formik.handleChange} className='form-control' /></dd>
                <dt>Mobile Number</dt>
                <dd><input type="text" name='Mobile' onChange={formik.handleChange} className='form-control' /></dd>
            </dl>
            <button className='btn btn-warning w-100'>Register</button>
            <div>
                <Link to='/login'>Existing User Login</Link>
            </div>
        </form>
    </div>
  )
}

export default Register