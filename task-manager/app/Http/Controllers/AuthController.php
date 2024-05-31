<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AuthController extends Controller
{
    // Méthode pour l'inscription
    public function register(Request $request) {
        // Validation des données d'entrée
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        // Création d'un nouvel utilisateur
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Retourne l'utilisateur créé
        return response()->json(['user' => $user], 201);
    }

    // Méthode pour la connexion
    public function login(Request $request) {
        // Validation des données d'entrée
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        // Récupération de l'utilisateur par email
        $user = User::where('email', $request->email)->first();

        // Vérification du mot de passe
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        // Création du token d'authentification
        $token = $user->createToken('token-name')->plainTextToken;

        // Retourne le token et l'utilisateur
        return response()->json(['token' => $token, 'user' => $user], 200);
    }

    // Méthode pour la déconnexion
    public function logout(Request $request) {
        // Suppression des tokens de l'utilisateur
        $request->user()->tokens()->delete();

        // Retourne un message de confirmation
        return response()->json(['message' => 'Logged out'], 200);
    }
}
