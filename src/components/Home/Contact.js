import React from 'react'
import { Button } from '@mui/material'
import "./contact.css";
export const Contact = () => {
  return (
    <div> 
      <div className='contact'>
    <h1>E-mail</h1>
      <a className="mailBtn" href="mailto:vanshikamohindra.vani@gmail.com">
        <Button>vanshikamohindra.vani@gmail.com</Button>
      </a>
    <h1>LinkedIn</h1>
    <a className="mailBtn" href="https://www.linkedin.com/in/vanshika-mohindra-543350207/">
        <Button>Vanshika Mohindra</Button>
      </a>
    <h1>GitHub</h1>
    <a className="mailBtn" href="https://github.com/vanshiikaa17">
        <Button>vanshiikaa17</Button>
      </a>

  </div>
  </div>
  )
}
