<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TaskController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route pour l'inscription
Route::post('/register', [AuthController::class, 'register']);

// Route pour la connexion
Route::post('/login', [AuthController::class, 'login']);

// Route pour la déconnexion (protégée par l'authentification)
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

// Les routes des tâches protégées par l'authentification
Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('tasks', TaskController::class);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
