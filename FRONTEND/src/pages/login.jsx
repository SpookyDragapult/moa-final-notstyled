import React, { useState } from 'react';
import { useUser } from '../contexts/UserContext'; // Import useUser hook
import axios from 'axios'; // Make sure axios is imported
import styles from '../styles/login.module.css'; 

function Login() {
    
    const [isActive, setIsActive] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [cpassword, setCpassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { setUserData } = useUser(); // Get the setter for userData


    const style = {
        backgroundImage: "url('/images/rm222-mind-22.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
    };

    const handleRegisterClick = () => {
        setIsActive(true); // Show Sign Up form
    };

    const handleLoginClick = () => {
        setIsActive(false); // Show Login form
    };

    // Handle sign up form submission
    const handleSignUp = async (e) => {
        e.preventDefault();
        if (password !== cpassword) {
            setError('Passwords do not match!');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/api/auth/signup', { email, password, name });
            setLoading(false);
            if (response.data) {
                setError('');
                setIsActive(false); // Switch to login form after successful signup
            }
        } catch (err) {
            setLoading(false);
            setError(err.response ? err.response.data.message : 'Error occurred during sign up');
        }
    };

    // Handle login form submission
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            setLoading(false);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token); // Store JWT token
                
                 // Save user data to UserContext, make sure to use the _id field from MongoDB
                    const userData = {
                        _id: response.data._id,  // Ensure you're using _id here
                        name: response.data.name,
                        email: response.data.email,
                    };
                    setUserData(userData); // Update the context with user data

                
                window.location.href = '/'; // Redirect to home page after successful login
            }
        } catch (err) {
            setLoading(false);
            setError(err.response ? err.response.data.message : 'Error occurred during login');
        }
    };

    return (
        <div style={style}>
        <div className='d-flex flex-row justify-content-center'>
            <div className='d-flex flex-column'>
          <div className='p-5 m-5'></div>
        <div className={`${styles.container} ${isActive ? styles.active : ''}`} id="container">
            {/* Sign Up Form */}
            <div className={`${styles["form-container"]} ${styles["sign-up"]}`}>
                <form onSubmit={handleSignUp}>
                    <h1>Create Account</h1>
                    <span>or use your email for registration</span>
                    <input 
                        type="text" 
                        name="name" 
                        placeholder="Name" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required 
                    />
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Email or No.Telephone" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                    />
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="Password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                    />
                    <input 
                        type="password" 
                        name="cpassword" 
                        placeholder="Confirm Password" 
                        value={cpassword}
                        onChange={(e) => setCpassword(e.target.value)}
                        required 
                    />
                    {error && <p className={styles.error}>{error}</p>}
                    <button type="submit" disabled={loading}>
                        {loading ? 'Signing Up...' : 'Sign Up'}
                    </button>
                </form>
            </div>

            {/* Sign In Form */}
            <div className={`${styles["form-container"]} ${styles["sign-in"]}`}>
                <form onSubmit={handleLogin}>
                    <h1>Sign In</h1>
                    <span>or use your email and password</span>
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                    />
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="Password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                    />
                    {error && <p className={styles.error}>{error}</p>}
                    <button type="submit" disabled={loading}>
                        {loading ? 'Logging In...' : 'Sign In'}
                    </button>
                    <button className={styles.hidden} onClick={handleRegisterClick} id="register">Sign Up</button>
                </form>
            </div>

            {/* Toggle Panel */}
            <div className={styles["toggle-container"]}>
                <div className={styles.toggle}>
                    <div className={`${styles["toggle-panel"]} ${styles["toggle-left"]}`}>
                        <h1>Welcome Back!</h1>
                        <p>Enter your personal details to use all of the site features</p>
                        <button className={styles.hidden} onClick={handleLoginClick} id="login">Sign In</button>
                    </div>
                </div>
            </div>
        </div>
        </div>
        </div>
        </div>
       
        
      
    );
}

export default Login;
