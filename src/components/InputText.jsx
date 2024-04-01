import React, { forwardRef } from 'react'

const InputText = forwardRef((props, ref) => {
  return (
    <input
      ref={ref}
      className="bg-gray-600 py-1 px-2 mx-1"
      onChange={props.onChange}
      placeholder={props.placeholder}
      type="text"
      value={props.value}
    />
  )
})

export default InputText
