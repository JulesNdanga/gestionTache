import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
    // États pour les champs du formulaire
    const { login } = useContext(AuthContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [message, setMessage] = useState('');

    // Gestion de la soumission du formulaire
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            // Envoi des données au backend
            const response = await axios.post('http://localhost:8000/api/register', {
                name,
                email,
                password,
                password_confirmation: passwordConfirmation
            });
            console.log(response.data); // Affichage de la réponse pour vérification
            login(response.data.user, response.data.token);
            setMessage('Registration successful!');
        } catch (error) {
            setMessage('Registration failed. Please try again.');
            console.error(error);
        }
    };

    return ( 
        <form onSubmit = { handleSubmit } >
            <input type = "text"
            placeholder = "Name"
            value = { name }
            onChange = {
                (e) => setName(e.target.value)
            }
            /> <input type = "email"
            placeholder = "Email"
            value = { email }
            onChange = {
                (e) => setEmail(e.target.value)
            }
            /> <input type = "password"
            placeholder = "Password"
            value = { password }
            onChange = {
                (e) => setPassword(e.target.value)
            }
            /> <input type = "password"
            placeholder = "Confirm Password"
            value = { passwordConfirmation }
            onChange = {
                (e) => setPasswordConfirmation(e.target.value)
            }
            /> <button type = "submit" > Register </button > 
        </form>
    );
};

export default Register;