import { Link, useNavigate } from 'react-router-dom'
import { useLogin } from '../context/UserContext'
import { logout } from '../services/user.service'


export const Header = () => {
    const navigate = useNavigate()
    const { isLoggedIn, logout:userLogout, setLoggedInData, loggedInData } = useLogin()

    const handleLogout = async () => {
            try{
                await logout() //logout server side by clearing cookie/jwt
                userLogout()    //logout client side by toggling boolean
                navigate('/login')
            } catch( error ){
             //  console.error('Logout Failed:', error) 
                }
        }

    return (
        <div className='header-border'>
            <div className='header'>
                <div className='dropdown'>
                <Link className="home-btn" to="/">Home</Link>
                <div className='dropdown-content'>
                    <p>Categories</p>
                    <Link>Plants & Animals</Link>
                    <Link>Movies/Shows</Link>
                    <Link>Books/Comics</Link>
                    <Link>Games</Link>
                    <Link>Music</Link>
                    <Link>Sports</Link>
                    <Link>History</Link>
                    <Link>Language/Culture</Link>
                    <Link>Geography</Link>
                    <Link>Other</Link>
                </div>
                </div>
                <p className='title'>Tiny Quiz</p>
                {isLoggedIn?
                <>
                <Link to={`/profile/${loggedInData._id}`} className='profile-link'>Hello {loggedInData.name}!</Link>
                <button className="login-btn" onClick={handleLogout}>Sign out</button>
                </>:
                <Link className="login-btn" to="/login">Sign in / Sign up</Link>
                }
                {isLoggedIn && loggedInData._id == "68033c8f1868dbaeb9948802" &&
                <Link to="/admin" className='profile-link'>Admin Page</Link>}
            </div>
        </div>
    )
}