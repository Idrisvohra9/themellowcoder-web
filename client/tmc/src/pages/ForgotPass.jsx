import React from 'react'
import useLoader from '../Hooks/useLoader';
export default function ForgotPass() {
  useLoader();
  function resetPass(e) {
    e.preventDefault();
  }
  return (
    <div className='gradient-bg'>
      <form onSubmit={resetPass}>
        <h2></h2>
      </form>
    </div>
  )
}
