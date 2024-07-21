import axios from 'axios';
import { useFormik } from 'formik';
// import { response } from 'express';
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { Link, useNavigate, useParams } from 'react-router-dom'

function EditTask() {
    const[appointments , setAppointments] = useState([{}])
    const params = useParams()
    const[cookies, setCookie] = useCookies(['userid'])
    let navigate = useNavigate()
    useEffect(()=>{
        axios.get(`http://127.0.0.1:2345/view-task/${params.id}`)
        .then(response=>{
          setAppointments(response.data)
        }).catch(err=>console.log(err))
    },[params.id])

    const formik = useFormik({
      initialValues : {
        Appointment_Id : appointments[0].Appointment_Id,
        Title : appointments[0].Title,
        Description : appointments[0].Description,
        Date : new Date(appointments[0].Date),
        UserId : cookies['userid']
      },
      onSubmit : (task)=>{
        axios.put(`http://127.0.0.1:2345/edit-task/${params.id}`,task)
        .then(()=>{
          alert('task edited successfully')
          navigate('/dashboard')
        })
      },
      enableReinitialize : true
    })

  return (
    <div className='bg-light text-dark p-4'>
        <h3>Edit task</h3>
        <form onSubmit={formik.handleSubmit}>
            <dl>
                <dt>AppointmentId</dt>
                <dd><input type="number" value={formik.values.Appointment_Id} onChange={formik.handleChange} name='Appointment_Id' className='form-control' /></dd>
                <dt>Title</dt>
                <dd><input type="text" value={formik.values.Title} onChange={formik.handleChange} name='Title' className='form-control' /></dd>
                <dt>Description</dt>
                <dd><textarea className='form-control' value={formik.values.Description} onChange={formik.handleChange} name='Description' rows='4' cols='40'></textarea></dd>
                <dt>Date</dt>
                <dd><input type="date" value={formik.values.Date} onChange={formik.handleChange} name='Date' /></dd>
            </dl>
            <button className='btn btn-success'>Save</button>
            <Link to='/dashboard' className='btn btn-danger ms-2'>Cancel</Link>
        </form>
    </div>
  )
}

export default EditTask