import { Link } from "react-router-dom"
import "./navbar.css"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"

const Navbar = () => {

  const {user} = useContext(AuthContext)

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to='/' style={{color:"inherit",textDecoration:"none"}}>
          <h2 className="logo">Zen Rooms</h2>
        </Link>
        {user ? `Welcome ${user.username}!` : <div className="navItems">
          <button className="navButton">Register</button>
          <button className="navButton">Login</button>
        </div>}
      </div>
    </div>
  )
}

export default Navbar