import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    
    <nav class="navbar sticky-top navbar-dark bg-dark">
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <a className="navbar-brand" id="navtitle">🌿 homegrow circular economy 🌿</a>
          <Link  to="/home" className="btn btn-success">Home</Link>
          <Link  to="/marketplace" className="btn btn-success">Marketplace</Link>
          <a href="#"  onClick={handleClick}>
          <button type="button" class="btn btn-success">Logout</button>
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login" className="btn btn-success">Login</Link>
          <Link to="/marketplace" className="btn btn-success">Marketplace</Link>
          <Link to="/signup" className="btn btn-success">Sign Up</Link>
        </div>
      )}
    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
