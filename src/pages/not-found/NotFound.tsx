import { Link } from 'react-router-dom'

import './NotFound.scss'

export default function NotFound() {
  return (
    <div className="not-found">
      <div className="not-found-text">
        <h1>Error 404</h1>
        <p>We can&apos;t seem to find the page you&apos;re looking for.</p>
        <Link to="/gym/home">Go Home</Link>
      </div>
      <div className="not-found-image">
        <img src="/assets/ghost-img.png" alt="ghost" />
        <div className="not-found-shadow" />
      </div>
    </div>
  )
}
