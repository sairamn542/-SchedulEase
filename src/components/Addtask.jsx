import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react'
import { useCookies } from 'react-cookie'
import { Link, useNavigate } from 'react-router-dom'

function Addtask() {
  const[cookies, setCookies , removeCookie] = useCookies(['userid']);
  let navigate = useNavigate()
  const formik = useFormik({
   initialValues : {
    Appointment_Id : 0,
    Title : '',
    Description : '',
    Date : '',
    UserId : cookies['userid']
   },
   onSubmit : (task)=>{
    axios.post(`http://127.0.0.1:2345/add-task`,task)
      alert('task added successfully')
      navigate('/dashboard')
   }
  })
  return (
    <div>
        <div className='bg-light text-dark p-4'>
            <form className='w-25' onSubmit={formik.handleSubmit}>
              <div className='h4'>{cookies['userid']} - add-task</div>
                <dl>
                    <dt>Appointment Id</dt>
                    <dd><input type="number" name='Appointment_Id' onChange={formik.handleChange} className='form-control' /></dd>
                    <dt>Title</dt>
                    <dd><input type="text" name='Title' onChange={formik.handleChange}  className='form-control' /></dd>
                    <dt>Description</dt>
                    <dd><textarea name="Description" onChange={formik.handleChange}  id="" rows="4" cols="40" className='form-control'></textarea></dd>
                    <dt>Date</dt>
                    <dd><input type="date" name='Date' onChange={formik.handleChange}  className='form-control' /></dd>
                </dl>
                <button type='submit' className='w-50 btn btn-warning'>Submit</button>
                <Link to='/dashboard' className='btn btn-danger w-50'>Cancel</Link>
            </form>
        </div>
    </div>
  )
}

export default Addtask