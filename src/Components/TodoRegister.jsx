import axios from 'axios'
// import { response } from 'express'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function TodoRegister() {

  const[msg,setMsg] = useState('')
  const[validClass,setValidClass] = useState('')

  let navigate = useNavigate()
  const formik = useFormik({
    initialValues : {
      UserId : '',
      UserName : '',
      Password : '',
      Email : '',
      Mobile : ''
    },
    onSubmit : (user)=>{
      axios.post(`http://127.0.0.1:6060/register-user`, user)
      .then(()=>{
        alert('User Registered')
        navigate('/login')
      })
    }
  })
  
  function verifyUserId(e) {
    axios.get(`http://127.0.0.1:6060/get-user`)
    .then(response=>{
      for(var user  of response.data) {
        if(user.UserId === e.target.value) {
            setMsg('User Id is taken')
            setValidClass('text-danger')
            break;
        } else {
          setMsg('UserId is Available')
          setValidClass('text-success')
        }
      }
    })
  }

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className='bg-light p-4 m-2 border border-2 border-primary rounded w-25'>
        <div className='h5 bi bi-person-fill'>Register user</div>
        <dl>
          <dt>UserId</dt>
          <dd><input type="text" name='UserId' onKeyUp={verifyUserId} className='form-control' onChange={formik.handleChange} /></dd>
          <dd className={validClass}>{msg}</dd>
          <dt>UserName</dt>
          <dd><input type="text" name='UserName' className='form-control' onChange={formik.handleChange} /></dd>
          <dt>Password</dt>
          <dd><input type="password" name='Password' className='form-control' onChange={formik.handleChange} /></dd>
          <dt>Email</dt>
          <dd><input type="email" name='Email' className='form-control' onChange={formik.handleChange} /></dd>
          <dt>Mobile No</dt>
          <dd><input type="text" name='Mobile' className='form-control' onChange={formik.handleChange} /></dd>
        </dl>
        <button className='btn btn-warning w-100'>Register</button>
        <div>
        <Link to='/login'>Exidting User Login</Link>
      </div>
      </form>
    </div>
  )
}

export default TodoRegister