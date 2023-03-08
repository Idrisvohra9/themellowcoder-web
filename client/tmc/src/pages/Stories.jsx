import React from 'react'
import useLoader from '../Hooks/useLoader'
export default function ShortBlogs() {
  useLoader();
  return (
    <div className='mainContent'>
      <div className="mt-2 ms-3 me-3">
        <h1>Stories!</h1>
      </div>
    </div>
  )
}
