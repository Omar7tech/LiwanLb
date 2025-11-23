<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BlogController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/blogs', [BlogController::class , 'index'])->name('blogs');

Route::get('/about', function () {
    dump(Auth::user());
    return Inertia::render('about');
})->name('about');


Route::get('/login', [AuthController::class, 'index'])->name('login')->middleware('guest');
Route::post('/login-store', [AuthController::class, 'store'])->name('login-store');
Route::get('/dashboard' , function () {
    return Inertia::render('dashboard');
})->name('dashboard')->middleware('auth');
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');




