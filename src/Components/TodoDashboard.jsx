import axios from 'axios';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom';

function TodoDashboard() {
  const[cookies, setCookie, removeCookie] = useCookies('userid');
  const[appointments, setAppointments] = useState([])
  let navigate = useNavigate()
  function handleSignout() {
    removeCookie('userid');
    navigate('/login')
  }
  useEffect(()=>{
    if(cookies['userid'] === undefined) {
      navigate('/login')
    } else {
      axios.get(`http://127.0.0.1:6060/view-tasks/${cookies['userid']}`)
      .then(response =>{
        setAppointments(response.data)
      })
    }
  },[])
  return (
    <div className='bg-white p-4'>
        <h3 className='d-flex justify-content-between'><span>{cookies['userid']} - Dashboard & user appointments</span> <button className='btn btn-link' onClick={handleSignout}>Signout</button></h3>
        <main className='w-50'>
          <div className='h4'>Your appointments</div>
          <Link to='/add-task' className='bi bi-calendar btn btn-primary'>Add appointment</Link>
          {
            appointments.map((appointment)=>(
              <div className='alert alert-success alert-dismissible mt-3'>
                <button className='btn btn-close' data-bs-dismiss='alert'></button>
                <h3>{appointment.Title}</h3>
                <p>{appointment.Description}</p>
                <p>{moment(appointment.Date).format('dddd,MMMM Do YYYY')}</p>
                <button className='btn btn-warning bi bi-pen-fill'>Edit</button>
                <Link to={`/delete-task/${appointment.Appointment_id}`} className='btn btn-danger bi bi-trash ms-2'>Edit</Link>
              </div>
            ))
          }
        </main>
    </div>
  )
}

export default TodoDashboard