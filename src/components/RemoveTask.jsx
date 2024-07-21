import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

function RemoveTask() {
  const[appointments, setAppointments] = useState([{}])
  let params = useParams()
  let navigate = useNavigate()
  useEffect(()=>{
    axios.get(`http://127.0.0.1:2345/view-task/${params.id}`)
    .then(response=>{
      setAppointments(response.data)
    }).catch(err=>console.log(err))
  },[params.id])

  function HandleClick() {
    axios.delete(`http://127.0.0.1:2345/delete-task/${params.id}`)
    .then(()=>{
      alert('task deleted')
      navigate('/dashboard')
    })
  }

  return (
    <div className='bg-light text-dark p-4 h4'>
      <h3>Are you sure? want to dete Task</h3>
       <dl>
       <dt>Title</dt>
       <dd>{appointments[0]?.Title}</dd>
       <dt>Description</dt>
       <dd>{appointments[0]?.Description}</dd>
       <dt>Date</dt>
       <dd>{moment(appointments[0].Date).format('DD MM YYYY')}</dd>
       </dl>
       <button className='btn btn-danger' onClick={HandleClick}>Yes</button>
       <Link to='/dashboard' className='btn btn-warning ms-2'>No</Link>
    </div>
  )
}

export default RemoveTask