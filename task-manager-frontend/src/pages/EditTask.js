import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditTask = () => {
  // Récupération de l'id de la tâche à éditer depuis les paramètres d'URL
  const { id } = useParams();
  // États pour les champs du formulaire
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [completed, setCompleted] = useState(false);

  // Utilisation de useEffect pour récupérer les détails de la tâche à éditer
  useEffect(() => {
    const fetchTask = async () => {
      try {
        // Envoi de la requête pour récupérer les détails de la tâche
        const response = await axios.get(`http://localhost:8000/api/tasks/${id}`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        const task = response.data;
        // Mise à jour des états avec les données de la tâche
        setTitle(task.title);
        setDescription(task.description);
        setDueDate(task.due_date);
        setCompleted(task.completed);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTask();
  }, [id]);

  // Gestion de la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Envoi des données mises à jour au backend
      const response = await axios.put(`http://localhost:8000/api/tasks/${id}`, {
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
      <button type="submit">Update Task</button>
    </form>
  );
};

export default EditTask;
