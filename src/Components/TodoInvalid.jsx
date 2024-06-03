import React from 'react'
import { Link } from 'react-router-dom'

function TodoInvalid() {
  return (
    <div className='bg-white p-4'>
      <h3 className='text-danger'>Invalid credential</h3>
      <Link to='/login'>Try again</Link>
    </div>
  )
}

export default TodoInvalid