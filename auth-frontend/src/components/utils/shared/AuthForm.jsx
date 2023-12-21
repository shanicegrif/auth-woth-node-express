import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const API_URL = meta.env.VITE_API_URL;
const AuthForm = ({ authFormType }) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
   
    handleFormAuth = () => {

    } 
  
    handleSignUp = async (event) => {
        const user = event;
        try {
          const response = await axios.post(`${API_URL}/user/`, user);
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <form onSubmit={ () => {}}>
            <input type='text'>
            
            </input>
            <input type=''>
            
            </input>
                
        </form>
        
    );
}

export default AuthForm;
