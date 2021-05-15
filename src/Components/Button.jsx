import React from 'react'

const Button =({onClick, text, backgroundColor }) => { 
    
    return (
      <button onClick={onClick} style={{ background: backgroundColor }}>{text}</button>
    )  
}
export default Button
