import React, { useState } from 'react';
import { auth, signInWithEmailAndPassword } from '../firebase';
import {
    BrowserRouter as Router,
    Link,
    useNavigate,
  } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const noAccount = () => {
      navigate("/Signup")
    }
    const handleLogin = async (e) => {
        e.preventDefault();
    
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password); // Use signInWithEmailAndPassword with auth object
          console.log('Logged in user:', userCredential.user);
          navigate("/")
          // Do something after successful login, e.g., redirect to a dashboard page.
        } catch (error) {
          console.error('Error logging in:', error.message);
          // Handle login error here.
        }
      };
  return (
    <div style={{ background: '#000000', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <form onSubmit={handleLogin} style={{ background: 'white', padding: '20px', borderRadius: '5px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)' }}>
        <h2 style={{ color: '#00bcd4', textAlign: 'center' }}>Login</h2>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ color: 'black', display: 'block', marginBottom: '5px' }}>Email</label>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '3px' }} />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ color: 'black', display: 'block', marginBottom: '5px' }}>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '3px' }} />
        </div>
        <button type="submit" style={{ background: '#00bcd4', color: 'white', border: 'none', padding: '10px 15px', borderRadius: '3px', width: '100%', cursor: 'pointer' }}>Login</button>
        <Link
          to="/Signup"
          style={{
            display: 'block',
            textAlign: 'center',
            marginTop: '10px',
            color: '#00bcd4',
            textDecoration: 'none',
            fontWeight: 'bold',
            fontSize: '16px',
          }}
        >
          Already have an account?
        </Link>
      </form>
    </div>
  );
};

export default LoginPage;
