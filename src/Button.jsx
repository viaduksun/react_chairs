import React, { Component } from 'react'

export class Button extends Component {  
  render() {
    const {onClick, text, backgroundColor } = this.props
    return (
      <button onClick={onClick} style={{ background: backgroundColor }}>{text}</button>
    )
  }
}

export default Button
