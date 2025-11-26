<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\HomeController;
use App\Http\Middleware\RoleAuthRedirect;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class , 'index'])->name('home');

Route::get('/blogs', [BlogController::class , 'index'])->name('blogs');
Route::get('/blog/{blog}' , [BlogController::class , 'show'] )->name('blogs.show');
Route::get('/about', function () {
    return Inertia::render('about');
})->name('about');


Route::get('/login', [AuthController::class, 'index'])->name('login')->middleware('guest');
Route::post('/login-store', [AuthController::class, 'store'])->name('login-store');



Route::middleware(['auth' , RoleAuthRedirect::class])->group(function (){
Route::get('/dashboard' , function () {
    return Inertia::render('dashboard');
})->name('dashboard');
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
});



