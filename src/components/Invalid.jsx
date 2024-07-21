import React from 'react'
import { Link } from 'react-router-dom'

function Invalid() {
  return (
    <div className='bg-light w-100 p-4 m-3'>
        <div>Invalid Credentials</div>
        <Link to='/login'>Try Again</Link>
    </div>
  )
}

export default Invalid