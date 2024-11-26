<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TestFileController;

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

//for test pusher
Route::post('update_file', [TestFileController::class, 'update_content']);
Route::post('get_file', [TestFileController::class, 'get_file_content']);
 