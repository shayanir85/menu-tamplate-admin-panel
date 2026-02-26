<?php


use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;


// User Authentication Routes
Route::post('/login', [UserController::class,'login'])->middleware('throttle:5,3'); // User login endpoint


// Product Routes
Route::resource('/products', ProductController::class); // Get all products

Route::post('/register', [UserController::class,'register'])->middleware('throttle:5,3'); // User registration endpoint
// Protected Routes (requires authentication)
Route::middleware('auth:sanctum')->group(function () {
    
    
});
