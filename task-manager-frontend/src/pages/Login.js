import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  // États pour les champs du formulaire
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Gestion de la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Envoi des données au backend
      const response = await axios.post('http://localhost:8000/api/login', {
        email, password
      });
      // Stockage du token dans le localStorage
      localStorage.setItem('token', response.data.token);
      console.log(response.data); // Affichage de la réponse pour vérification
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
