import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import { useNavigate  } from 'react-router-dom';


const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const response = await axios.post('http://localhost/api/login', {
                email: email,
                password: password
            });
            
            const token = response.data.access_token;
            
            Cookies.set("token", token, { expires: 7 });       
              console.log('Login successful!', token);
              console.log(response.data);
              Cookies.set("userName", name, { expires: 7 });
         navigate("/");
              
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
       <div>
        
        <div className="login-form">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={email} 
                        onChange={handleEmailChange} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        value={password} 
                        onChange={handlePasswordChange} 
                        required 
                    />
                </div>
                <button type="submit">Login</button>
            </form>

            
        </div>
        </div>
    );
}

export default Login;
