<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\ClientReviewController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\CostStudyController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\InquiryController;
use App\Http\Controllers\PaymentController;
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


Route::middleware([CheckSiteActive::class])->group(function () {
    Route::get('/', [HomeController::class, 'index'])->name('home');

    Route::get('/blogs', [BlogController::class, 'index'])->name('blogs');
    Route::get('/blog/{blog}', [BlogController::class, 'show'])->name('blogs.show');
    Route::get('/works', [WorkController::class, 'index'])->name('work');
    Route::get('/work/{work}', [WorkController::class, 'show'])->name('work.show');
    Route::get('/cost-study', [CostStudyController::class, 'index'])->name('cost-study');
    Route::post('/cost-study', [CostStudyController::class, 'store'])->name('cost-study.store')->middleware('throttle:3,1');
    Route::post('/inquiry', [InquiryController::class, 'store'])->name('inquiry.store')->middleware('throttle:5,1');
    Route::get('/partner-with-us', function () {
        return Inertia::render('PartnerWithUs');
    })->name('partner-with-us');
    Route::get('/residency/{residency}', [ResidencyController::class, 'show'])->name('residency.show');

    Route::get('/login', [AuthController::class, 'index'])->name('login')->middleware('guest');
    Route::post('/login-store', [AuthController::class, 'store'])->name('login-store')->middleware('throttle:3,1');

    Route::middleware(['auth', RoleAuthRedirect::class])->group(function () {
        Route::name('dashboard.')->prefix('dashboard')->group(function () {
            Route::get('/', [DashboardController::class, 'index'])->name('index');
            Route::get('/profile', [ProfileController::class, 'index'])->name('profile');
            Route::put('/profile', [ProfileController::class, 'update'])->name('profile.update')->middleware('throttle:5,1');
            Route::get('/contact', [DashboardController::class, 'contact'])->name('contact');
            Route::get('/requirements', [ProjectController::class, 'notesIndex'])->name('notes.index');
            Route::get('/projects', [ProjectController::class, 'index'])->name('projects.index');
            Route::get('/payments', [PaymentController::class, 'index'])->name('payments.index');
            Route::get('/client-reviews', [ClientReviewController::class, 'index'])->name('client-reviews');
            Route::post('/client-reviews', [ClientReviewController::class, 'store'])->name('client-reviews.store');
            Route::delete('/client-reviews', [ClientReviewController::class, 'destroy'])->name('client-reviews.destroy');
            Route::get('/project/{project}', [ProjectController::class, 'show'])->name('projects.show');
            Route::post('/project-updates/{projectUpdate}/comments', [CommentController::class, 'store'])->name('comments.store')->middleware('throttle:10,1');
            Route::put('/comments/{comment}', [CommentController::class, 'update'])->name('comments.update')->middleware('throttle:20,1');
            Route::delete('/comments/{comment}', [CommentController::class, 'destroy'])->name('comments.destroy')->middleware('throttle:20,1');
        });

        Route::post('/logout', [AuthController::class, 'logout'])->name('logout')->middleware('throttle:10,1');
    });

});
