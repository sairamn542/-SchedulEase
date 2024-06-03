import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react'
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom'

function TodoLogin() {
  const[cookies,  setCookie, removeCookie] = useCookies('userid')
  let navigate = useNavigate();

  const formik = useFormik({
    initialValues : {
      UserId : '',
      Password : ''
    },
    onSubmit : (user)=>{
      axios.get(`http://127.0.0.1:6060/get-user`)
      .then(response =>{
         var client = response.data.find(record => record.UserId === user.UserId)
         if(client) {
          if(user.Password === client.Password) {
            setCookie('userid', user.UserId)
            navigate('/dashboard')
          } else {
            navigate('/invalid')
          }
         } else {
          navigate('/invalid')
         }
      })
    }
  })
  return (
    <div>
      <form className='bg-light p-4 m-3 w-25' onSubmit={formik.handleSubmit}>
        <h3>User Login</h3>
          <dl> 
            <dt>UserId</dt>
            <dd><input type="text" className='form-control' name='UserId' onChange={formik.handleChange} /></dd>
            <dt>password</dt>
            <dd><input type="password" className='form-control' name='Password' onChange={formik.handleChange} /></dd>
          </dl>
          <button className='btn btn-warning w-100'>Login</button>
          <div><Link to='/register'>New User Register</Link></div>
        </form>
    </div>
  )
}

export default TodoLogin