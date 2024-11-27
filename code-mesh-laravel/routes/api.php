<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\MailController;
use App\Http\Controllers\OpenAiController;
use App\Http\Controllers\Judge0Controller;

Route::post('/compile', [Judge0Controller::class, 'Compile']);
Route::post('/analyse', [OpenAiController::class, 'validateScript']);
Route::post('/invite', [MailController::class, 'sendInvitation'])->withoutMiddleware(['auth:api']);
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
