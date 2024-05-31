import React, { useState } from 'react';
import axios from 'axios';

const CreateTask = () => {
  // États pour les champs du formulaire
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [completed, setCompleted] = useState(false);

  // Gestion de la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Envoi des données au backend pour créer une tâche
      const response = await axios.post('http://localhost:8000/api/tasks', {
        title, description, due_date: dueDate, completed
      }, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      console.log(response.data); // Affichage de la réponse pour vérification
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
      <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
      <label>
        Completed:
        <input type="checkbox" checked={completed} onChange={(e) => setCompleted(e.target.checked)} />
      </label>
      <button type="submit">Create Task</button>
    </form>
  );
};

export default CreateTask;
