<?php

use App\Http\Controllers\CollaborationController;
use App\Http\Controllers\FileController;
use App\Http\Middleware\JWTMiddleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::middleware(JWTMiddleware::class)->group(function () {
    // Files Routes
    Route::prefix('files')->group(function () {
        // List all files owned by the logged in user
        Route::get('/', [FileController::class, 'index']);
        // Create new file for the logged in user
        Route::post('/', [FileController::class, 'store']);
        // Get specific file based on its id
        Route::get('/{file}', [FileController::class, 'show']);
        // Update file
        Route::put('/{file}', [FileController::class, 'update']);
        // Delete file
        Route::delete('/{file}', [FileController::class, 'destroy']);
    });

    //Collaborations Routes
    Route::prefix('collaborations')->group(function () {
        // List all collaborations (both as owner and collaborator)
        Route::get('/', [CollaborationController::class, 'index']);
        // Create new collaboration
        Route::post('/', [CollaborationController::class, 'store']);
        // Update collaboration role
        Route::put('/{id}', [CollaborationController::class, 'update']);
        // Delete collaboration
        Route::delete('/{id}', [CollaborationController::class, 'destroy']);
    });

});