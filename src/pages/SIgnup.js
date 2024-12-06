import { useState } from "react";
import './css/Login.css';

const Signup = () => {
  // Form Input States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Form Input Handlers
  const handleEmailChange = e => setEmail(e.target.value);
  const handlePasswordChange = e => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // build the body object
    // make the call with a login util function
    // set the user State (passed from App.js)
    // clear the password state
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
        <p>Don't have an account? <a>Sign Up</a></p>
      </div>
      
    </div>
  )
}

export default Signup