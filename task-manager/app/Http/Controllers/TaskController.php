<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;

class TaskController extends Controller
{
    // Méthode pour lister les tâches de l'utilisateur connecté
    public function index(Request $request) {
        return Task::where('user_id', $request->user()->id)->get();
    }

    // Méthode pour créer une nouvelle tâche
    public function store(Request $request) {
        // Validation des données d'entrée
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'due_date' => 'required|date',
            'completed' => 'required|boolean',
        ]);

        // Création de la tâche
        $task = Task::create([
            'title' => $request->title,
            'description' => $request->description,
            'due_date' => $request->due_date,
            'completed' => $request->completed,
            'user_id' => $request->user()->id,
        ]);

        // Retourne la tâche créée
        return response()->json($task, 201);
    }

    // Méthode pour afficher une tâche spécifique
    public function show($id) {
        $task = Task::find($id);
        if ($task && $task->user_id == auth()->id()) {
            return response()->json($task);
        }
        return response()->json(['message' => 'Task not found'], 404);
    }

    // Méthode pour mettre à jour une tâche
    public function update(Request $request, $id) {
        // Validation des données d'entrée
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'due_date' => 'required|date',
            'completed' => 'required|boolean',
        ]);

        $task = Task::find($id);

        if ($task && $task->user_id == auth()->id()) {
            // Mise à jour des données de la tâche
            $task->update($request->all());
            return response()->json($task);
        }

        return response()->json(['message' => 'Task not found'], 404);
    }

    // Méthode pour supprimer une tâche
    public function destroy($id) {
        $task = Task::find($id);

        if ($task && $task->user_id == auth()->id()) {
            // Suppression de la tâche
            $task->delete();
            return response()->json(['message' => 'Task deleted']);
        }

        return response()->json(['message' => 'Task not found'], 404);
    }
}

