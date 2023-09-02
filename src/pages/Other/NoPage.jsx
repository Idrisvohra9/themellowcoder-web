import React from 'react'
import useLoader from '../../Hooks/useLoader'
import grumpy from "../../components/Images/kraken.webp"

export default function NoPage() {
  useLoader();
  return (
    <div className=' dark h-100'>
      <div className="ms-3 me-3 d-flex justify-content-center align-items-center h-100 flex-column">
        <img src={grumpy} alt="" style={{width:"220px", height:"220px"}}/>
        <h1>You encountered Ocro!</h1>
        <h2><b>The page doesn't exist!</b></h2>
        <h3>(He is pissed..)</h3>
      </div>
    </div>
  )
}
