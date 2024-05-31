import React from 'react';
import axios from 'axios';

const Logout = () => {
  // Gestion de la déconnexion
  const handleLogout = async () => {
    try {
      // Envoi de la requête de déconnexion au backend
      await axios.post('http://localhost:8000/api/logout', {}, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      // Suppression du token du localStorage
      localStorage.removeItem('token');
      console.log('Logged out'); // Affichage d'un message de confirmation
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;
