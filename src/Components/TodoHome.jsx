import React from 'react'
import { Link } from 'react-router-dom'

function TodoHome() {
  return (
    <main className='d-flex justify-content-center align-items-center' style={{height:'100vh'}}>
        <Link className='btn btn-warning me-2' to='/login'>User Login</Link>
        <Link to='/register' className='btn btn-primary'>New user Register</Link>
    </main>
  )
}

export default TodoHome