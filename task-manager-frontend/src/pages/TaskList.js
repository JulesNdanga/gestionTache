import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TaskList = () => {
  // État pour les tâches
  const [tasks, setTasks] = useState([]);

  // Utilisation de useEffect pour récupérer les tâches au montage du composant
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // Envoi de la requête pour récupérer les tâches
        const response = await axios.get('http://localhost:8000/api/tasks', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        // Mise à jour de l'état avec les tâches récupérées
        setTasks(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTasks();
  }, []);

  // Gestion de la suppression d'une tâche
  const handleDelete = async (taskId) => {
    try {
      // Envoi de la requête pour supprimer une tâche
      await axios.delete(`http://localhost:8000/api/tasks/${taskId}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      // Mise à jour de l'état pour retirer la tâche supprimée
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Task List</h1>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.title}
            <button onClick={() => handleDelete(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
