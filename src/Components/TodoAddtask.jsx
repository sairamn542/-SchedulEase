import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { useCookies } from 'react-cookie'
import { Link, useNavigate } from 'react-router-dom'

function TodoAddtask() {
  const[cookies,setCookie,removeCookie] = useCookies('userid')
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues : {
      Appointment_id : '',
      Title : '',
      Description : '',
      Date : '',
      UserId : cookies['userid']
    },
    onSubmit : (task)=>{
      axios.post(`http://127.0.0.1:6060/add-task`, task)
      alert('task added')
      navigate('/dashboard')
    }
  })
  return (
    <div className='bg-light text-dark p-4'>
        <form className='w-25' onSubmit={formik.handleSubmit}>
          <div className='h4'>{cookies['userid']} - Add task</div>
            <dl>
                <dt>Appointment Id</dt>
                <dd><input type="number" name='Appointment_id' onChange={formik.handleChange} className='form-control'/></dd>
                <dt>Title</dt>
                <dd><input type="text" name='Title' onChange={formik.handleChange} className='form-control' /></dd>
                <dt>Description</dt>
                <dd>
                    <textarea rows='4' cols='30' name='Description' onChange={formik.handleChange} className='form-control'></textarea>
                </dd>
                <dt>Date</dt>
                <dd><input type="date" name='Date' onChange={formik.handleChange} className='form-control' /></dd>
            </dl>
            <button type='submit' className='btn btn-warning w-50'>Submit</button>
            <Link to='/dashboard' className='btn btn-danger w-50'>Cancel</Link>
        </form>
    </div>
  )
}

export default TodoAddtask