import { useNavigate } from 'react-router-dom'
import { register, getUser } from '../services/user.service'
import { useState } from 'react'
import { useLogin } from '../context/UserContext'
import { loginServer } from '../services/user.service'

export const Login_page = () => {
    const navigate = useNavigate()
    const { login: loginClient, isLoggedIn, logout:userLogout, setLoggedInData, loggedInData } = useLogin()
    const [registerErrors, setRegisterErrors] = useState({})
    const [loginErrors, setLoginErrors] = useState("")

const handleRegister = e => {
    e.preventDefault()
    let { name, email, pw, cpw } = e.target
            name = name.value
            email = email.value 
            const password = pw.value
            const confirmPassword = cpw.value 
            register({name, email, password, confirmPassword,}) //cookie/jwt is sent from server when registering
                .then( (res)=>{ 
                    loginClient() //Now set login to true client side for tracking
                    getUser(res.data._id)
                    .then(data => {
                        setLoggedInData(data) // gets logged in user's data.
                    })
                    navigate('/') 
                })
                .catch( errors => {
                    setRegisterErrors( errors ) } )
}

const handleLogin = e => {
    e.preventDefault()
    let { email, pw} = e.target
    loginServer( {email: email.value, password: pw.value} )
    .then((res)=>{ 
        loginClient() //Now set login to true client side for tracking
        getUser(res)
        .then(data => {
            setLoggedInData(data) // gets logged in user's data.
        })
        navigate('/') 
    })
    .catch ((err)=> {
        setLoginErrors(err)
    })
}

    return (
        <>
        <div className="login-page">
            <div className="box1 login">
                <h2>Sign up!</h2>
                        {registerErrors.name && <p className='errors'>{registerErrors.name.message}</p>}
                        {registerErrors.email && <p className='errors'>{registerErrors.email.message}</p>}
                        {registerErrors.password && <p className='errors'>{registerErrors.password.message}</p>}
                        {registerErrors.confirmPassword && <p className='errors'>{registerErrors.confirmPassword.message}</p>}
                <form onSubmit={handleRegister}>
                    <div className="labels">
                        <label htmlFor="name">Name: </label>
                        <label htmlFor="email">Email: </label>
                        <label htmlFor="pw">Password:</label>
                        <label htmlFor="cpw">Confirm Password:</label>
                    </div>
                    <div className="input">
                        <input type="text" name="name"/>
                        <input type="text" name="email"/>
                        <input type="password" name="pw"/>
                        <input type="password" name="cpw"/>
                        <input type="submit" value="Sign up"></input>
                    </div>
                </form>
            </div>
            <div className="box2 login">
                <h2>Sign in</h2>
                {loginErrors && <p className='errors'>Incorrect credentials</p>}
                <form onSubmit={handleLogin}>
                    <div className="labels">
                        <label htmlFor="email">Email:</label>
                        <label htmlFor="pw">Password:</label>
                    </div>
                    <div className="input">
                        <input type="text" name="email"/>
                        <input type="password" name="pw"/>
                        <input type="submit" value="Sign in"></input>
                    </div>
                </form>
            </div>
        </div>
        </>
    )

}