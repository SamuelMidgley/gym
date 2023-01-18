import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/button/Button'

export default function LogIn() {
  const navigate = useNavigate()

  function onClickHandler(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    navigate('/gym/home')
  }

  return (
    <main className="flex flex-col justify-center w-full h-full items-center mt-20">
      <h1 className="text-3xl font-bold mb-4">💪 Gym</h1>
      <section className="flex bg-brand-600 p-8 rounded-lg w-full max-w-sm mb-20">
        <div className="w-full">
          <h2 className="text-2xl mb-2">Log In</h2>
          <div className="mb-2">
            <label className="flex flex-col" htmlFor="log-in">
              <span>Username</span>
              <input
                className="border-2 border-transparent rounded p-1 w-full focus:border-green"
                name="log-in"
              />
            </label>
          </div>
          <div className="mb-2">
            <label className="flex flex-col" htmlFor="password">
              <span>Password</span>
              <input
                type="password"
                className="border-2 border-transparent rounded p-1 w-full focus:border-green"
                name="password"
              />
            </label>
          </div>
          <div className="mt-4 flex items-center justify-center">
            <Button
              type="submit"
              onClickHandler={(e) => onClickHandler(e)}
              primary
            >
              Log in
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
