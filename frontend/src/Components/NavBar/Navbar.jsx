import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='bg-dark p-3'>
      <Link to={'/Contacts/list'} className='navbar-brand text-light ms-md-5'><i className='fa fa-mobile text-warning ms-5+ me-2'/>Contact <span className='text-warning'>Manager</span></Link>
    </div>
  )
}

export default Navbar
