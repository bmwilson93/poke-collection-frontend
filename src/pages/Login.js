import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAPI } from "../utils/fetchAPI";
import './css/Login.css';

const Login = ({ setUser, applyCollected }) => {
  const navigate = useNavigate();

  // Form Input States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Form Input Handlers
  const handleEmailChange = e => setEmail(e.target.value);
  const handlePasswordChange = e => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let body = JSON.stringify({
      "email": email,
      "password": password
    });
    const response = await fetchAPI('login', 'POST', body);
    setUser(response);
    setPassword('');
    navigate('/');
  }


  return (
    <div className='full-height'>

      <div className="login-container">
        <h2>Log In</h2>
        <form>
          <input type='email' value={email} onChange={handleEmailChange} placeholder='Email'/>
          <input type='password' value={password} onChange={handlePasswordChange} placeholder='Password'/>
          <button onClick={handleSubmit}>Log In</button>
        </form>
        <p>Don't have an account? <a onClick={() => {navigate('/signup')}}>Sign Up</a></p>
      </div>
      
    </div>
  )
}

export default Login