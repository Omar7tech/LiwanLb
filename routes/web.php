<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\CostStudyController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\InquiryController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ResidencyController;
use App\Http\Controllers\WorkController;
use App\Http\Middleware\RoleAuthRedirect;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Middleware\CheckSiteActive;

use App\Settings\GeneralSettings;
use Inertia\Middleware\EncryptHistory;

Route::get('/maintenance', function (GeneralSettings $settings) {
    if ($settings->site_active) {
        return redirect()->route('home');
    }
    return view('maintenance');
})->name('maintenance');

Route::middleware([CheckSiteActive::class])->group(function () {
    Route::get('/', [HomeController::class, 'index'])->name('home');

    Route::get('/blogs', [BlogController::class, 'index'])->name('blogs');
    Route::get('/blog/{blog}', [BlogController::class, 'show'])->name('blogs.show');
    Route::get('/works', [WorkController::class, 'index'])->name('work');
    Route::get('/work/{work}', [WorkController::class, 'show'])->name('work.show');
    Route::get('/cost-study', [CostStudyController::class, 'index'])->name('cost-study');
    Route::post('/inquiry', [InquiryController::class, 'store'])->name('inquiry.store')->middleware('throttle:5,1');
    Route::get('/partner-with-us', function () {
        return Inertia::render('PartnerWithUs');
    })->name('partner-with-us');
    Route::get('/residency/{residency}', [ResidencyController::class, 'show'])->name('residency.show');



    Route::get('/login', [AuthController::class, 'index'])->name('login')->middleware('guest');
    Route::post('/login-store', [AuthController::class, 'store'])->name('login-store')->middleware('throttle:5,1');



    Route::middleware(['auth', RoleAuthRedirect::class , EncryptHistory::class])->group(function () {
        Route::name('dashboard.')->prefix('dashboard')->group(function () {
            Route::get('/', [DashboardController::class, 'index'])->name('index');
            Route::get('/profile', [ProfileController::class, 'index'])->name('profile');
            Route::put('/profile', [ProfileController::class, 'update'])->name('profile.update');
            Route::get('/contact', [DashboardController::class, 'contact'])->name('contact');
            Route::get('/projects', [ProjectController::class, 'index'])->name('projects.index');
            Route::get('/project/{project}', [ProjectController::class, 'show'])->name('projects.show');
            
            // Comment routes
            Route::post('/project-updates/{projectUpdate}/comments', [CommentController::class, 'store'])->name('comments.store');
            Route::put('/comments/{comment}', [CommentController::class, 'update'])->name('comments.update');
            Route::delete('/comments/{comment}', [CommentController::class, 'destroy'])->name('comments.destroy');
        });


        Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
    });

});
