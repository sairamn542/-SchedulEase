import axios from 'axios';
import moment from 'moment';
// import { response } from 'express';
import React, { useState ,useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { Link, useNavigate } from 'react-router-dom'

function Dashboard() {
  const[cookies,setCookie,removeCookie] = useCookies('userid')
  const[appointments, setAppointments] = useState([{Appointment_Id : '',Title : '',Description : '',Date : new Date(), UserId : ''}]);

  let navigate = useNavigate()
  function handleSignout() {
    removeCookie('userid')
    navigate('/login')
  }
  useEffect(()=>{
    if(cookies['userid'] === undefined) {
      navigate('/login')
    } else  {
      axios.get(`http://127.0.0.1:2345/view-tasks/${cookies['userid']}`)
      .then(response=>{
        setAppointments(response.data)
      })
    }
  },[])
  return (
    <div className='bg-light m-3 p-4'>
        <h3 className='d-flex justify-content-between'><span>{cookies['userid']} - User Dashboard </span><button onClick={handleSignout} className='btn btn-link'>Signout</button></h3>
        <main className='w-50'>
          <div className='h4'>Your Appointments</div>
          <Link to='/add-task' className='bi bi-calendar btn btn-primary my-3'>Add Appointment</Link>
          {
            appointments.map(appointment=>(
              <div className='alert alert-success alert-dismissible'>
                <button className='btn btn-close' data-bs-dismiss='alert'></button>
                <h3>{appointment.Title}</h3>
                <p>{appointment.Description}</p>
                <p>{moment(appointment.Date).format('MMMM Do YYYY')}</p>
                <Link to={`/edit-task/${appointment.Appointment_Id}`} className='btn btn-warning bi bi-pen-fill me-2'>Edit</Link>
                <Link to={`/delete-task/${appointment.Appointment_Id}`} className='btn btn-danger bi bi-trash'>Remove</Link>
              </div>
            ))
          }
        </main>
    </div>
  )
}

export default Dashboard