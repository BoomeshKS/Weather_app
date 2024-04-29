import React from 'react'
import { useNavigate } from 'react-router-dom';
import './Login.css'
import logo from '../Assests/undraw_access_account_re_8spm.svg'
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import logo1 from '../Assests/Register.svg';
import  {useContext} from 'react';
import UserContext from '../UserContext';



const Login = () => {


  const [loginUsername, setLoginUsernameInput] = useState('');
  const [loginPassword, setLoginPassword] = useState('');


  const [showLoginForm, setShowLoginForm] = useState(true);
  const { setLoginUsername } = useContext(UserContext)
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [redirectToHome, setRedirectToHome] = useState(false);

  const handleLogin = () => {

    if(redirectToHome){
      return <Navigate to="/" />;
    }

    // Perform login logic here
    // For simplicity, let's just check if login and register credentials are the same
    if (loginUsername === registerUsername && loginPassword === registerPassword && loginUsername) {
      setRedirectToHome(true);
      navigate('/')
      setLoginUsername(loginUsername);
    }
    else{
      alert("Enter Valid username and password")
    }
  };








  const loginForm =() => {
    setShowLoginForm(!showLoginForm);
    setRegisterUsername(registerUsername);
    setRegisterPassword(registerPassword);
  }

    // const user = 1;
    const navigate = useNavigate();

    // const handle = () =>{
    //     if(user==null){
    //         alert('hii')
    //     }
    //     else{
    //         localStorage.setItem('isLoggedIn', 'true');
    //         navigate('/')
    //     }
        
    // }



  return (
    <div >
      { showLoginForm ? (
        <div className='login-form'>
          <h1>Login</h1>
          <div className='img'>
            <img src={logo} alt='logo' className='logo'/>
          </div>
          <form className='form-1'>
            <tr>
              <td className='user'>
                <h3>Username</h3>
                <input type="text" placeholder='Username'
                  value={loginUsername}
                  onChange={(e) => setLoginUsernameInput(e.target.value)}/>
              </td>
            </tr>
            <tr>
              <td className='user'>
                <h3>Password</h3>
                <input type="password" placeholder='Password'
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}/>
              </td>
            </tr>
          </form>
          <form className='login-btn'>
            <button type='submit' to='/' onClick={handleLogin}>Login</button>
            <button onClick={loginForm}><a href='#'>Register</a></button>
          </form>
        </div>
      ):(
        <div className='login-form-2'>
          <h1>Register Form</h1>
        <div className='img'>
          <img src={logo1} alt='logo1' className='logo'/>
        </div>
        <form className='form-2'>
          <tr>
            <td className='user-1'>
              <h3>Name</h3>
              <input type="text" placeholder='Name'/>
            </td>
          </tr>
          <tr>
            <td className='user-1'>
              <h3>Phone Number</h3>
              <input type="number" placeholder='Mobile Number'/>
            </td>
          </tr>
          <tr>
            <td className='user-1'>
              <h3>Username</h3>
              <input type="text" placeholder='Username'
                value={registerUsername}
                onChange={(e) => setRegisterUsername(e.target.value)}/>
            </td>
          </tr>
          <tr>
            <td className='user-1'>
              <h3>Password</h3>
              <input type="password" placeholder='Password'
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}/>
            </td>
          </tr>
        </form>
        <div className='login-btn-2'>
          <button onClick={loginForm}><a>Register</a></button>
        </div>
        </div>
      )}

    </div>
  )
}

export default Login


