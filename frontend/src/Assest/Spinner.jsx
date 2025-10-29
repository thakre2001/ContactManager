import React from 'react'
import spinner from './spinner.webp'

const Spinner = () => {
  return (
    <div className='w-100 flex justify-center'>
      <img src={spinner} alt="" className='mx-auto img-fluid' />
    </div>
  )
}

export default Spinner
