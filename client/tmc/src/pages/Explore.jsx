import React from 'react'
import useLoader from "../Hooks/useLoader"
export default function Explore() {
  useLoader();
  return (
    <div className="mainContent">
      <div className="container mt-4">
        <h1>Explore</h1>
        <input type="text" className='input mt-3' placeholder='Explore the verse'/>
      </div>
    </div>
  )
}
