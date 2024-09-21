import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { CLIENTS, HOME, INFO, TRANSACTIONS,  } from 'constants/routes'
import { UserContext } from 'contexts/user'

const Nav = () => {
  const { pathname } = useLocation()
  const { setUser } = useContext(UserContext)

  const handleLogOut = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to={HOME}>Accounts</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${pathname === CLIENTS ? 'active' : ''}`} aria-current="page" to={CLIENTS}>Clients</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${pathname === TRANSACTIONS ? 'active' : ''}`} to={TRANSACTIONS}>Transactions</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${pathname === INFO ? 'active' : ''}`} to={INFO}>Bank info</Link>
            </li>
          </ul>
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item dropstart">
              <Link className="nav-link dropdown-toggle" to="" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Account
              </Link>
              <ul className="dropdown-menu">
                {/* <li><hr className="dropdown-divider" /></li> */}
                <li>
                  <button type="button" className="dropdown-item" onClick={handleLogOut}>
                    Log out
                  </button>
                  </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav
