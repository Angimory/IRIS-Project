import React, { useState } from 'react';
import { auth, createUserWithEmailAndPassword } from './firebase';
import {
    BrowserRouter as Router,
    Link,
    useNavigate,
  } from 'react-router-dom';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
    
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password); 
          console.log('Logged in user:', userCredential.user);
          navigate("/")
    
        } catch (error) {
          console.error('Error logging in:', error.message);

        }
      };
  return (
    <div style={{ background: '#000000', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <form onSubmit={handleSignUp} style={{ background: 'white', padding: '20px', borderRadius: '5px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)' }}>
        <h2 style={{ color: '#00bcd4', textAlign: 'center' }}>Sign up</h2>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ color: 'black', display: 'block', marginBottom: '5px' }}>Email</label>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '3px' }} />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ color: 'black', display: 'block', marginBottom: '5px' }}>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '3px' }} />
        </div>
        <button type="submit" style={{ background: '#00bcd4', color: 'white', border: 'none', padding: '10px 15px', borderRadius: '3px', width: '100%', cursor: 'pointer' }}>Sign up</button>
        <Link
          to="/LoginPage"
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

export default Signup;
