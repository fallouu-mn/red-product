<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Api\HotelController;

// Routes d'authentification publiques
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Routes protégées par Sanctum
Route::middleware('auth:sanctum')->group(function () {
    // Routes d'authentification
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    
    // Routes des hôtels (SUPPRIMEZ LA DUPLICATION)
    Route::apiResource('hotels', HotelController::class);
    
    // Autres routes protégées...
});