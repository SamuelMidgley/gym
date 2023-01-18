import React from 'react'

type ButtonType = JSX.IntrinsicElements['button']['type']

interface IButton {
  type: ButtonType
  onClickHandler: (e: React.MouseEvent<HTMLButtonElement>) => void
  children: React.ReactNode
  primary: boolean
}

export default function Button(props: IButton) {
  const { type, onClickHandler, children, primary } = props

  return (
    <button
      className={`px-2 py-2 rounded-md
       ${
         primary
           ? 'bg-green text-black border-2 border-green border-solid'
           : 'border-2 border-solid border-green'
       }`}
      type={type}
      onClick={onClickHandler}
    >
      {children}
    </button>
  )
}
