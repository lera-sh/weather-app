import React from 'react'

const Button = (props) => {
  return (
    <button
      className="bg-gray-950 px-2 py-0.5"
      disabled={props.disabled}
      onClick={props.onClick}
      type={props.type}
    >
      {props.text}
    </button>
  )
}

export default Button
