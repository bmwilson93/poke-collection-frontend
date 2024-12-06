import { useState } from "react";
import './css/Login.css';

const Signup = () => {
  // Form Input States
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Form Input Handlers
  const handleEmailChange = e => setEmail(e.target.value);
  const handleUsernameChange = e => setUsername(e.target.value);
  const handlePasswordChange = e => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // build the body object
    // make the call with a signup util function
    // set the user State (passed from App.js)
    // clear the password state
  }


  return (
    <div className='full-height'>

      <div className="signup-container">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input type='email' value={email} onChange={handleEmailChange} placeholder='Email'/>
          <input type='text' value={username} onChange={handleUsernameChange} placeholder='Username'/>
          <input type='password' value={password} onChange={handlePasswordChange} placeholder='Password'/>
          <button onClick={handleSubmit}>Log In</button>
        </form>
        <p>Already have an account? <a>Log In</a></p>
      </div>
      
    </div>
  )
}

export default Signup