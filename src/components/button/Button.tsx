import React from 'react'

interface IButton {
  type: 'button' | 'reset' | 'submit' | undefined
  onClickHandler: (e: React.MouseEvent<HTMLButtonElement>) => void
  children: React.ReactNode
}

export default function Button(props: IButton) {
  const { type, onClickHandler, children } = props

  return (
    <button
      className="bg-green px-2 py-1 rounded-md text-black"
      type={type}
      onClick={onClickHandler}
    >
      {children}
    </button>
  )
}
