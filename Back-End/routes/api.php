<?php


use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;


// User Authentication Routes
Route::post('/login', [UserController::class,'login'])->middleware('throttle:5,3'); // User login endpoint
Route::post('/register', [UserController::class,'register'])->middleware('throttle:5,3'); // User registration endpoint


// Product Routes
Route::get('/products', [ProductController::class]); // Get all products
Route::put('/products/{id}', [ProductController::class]); // Update a specific product by ID
Route::get('/products/{id}/edit', [ProductController::class]); // Get product data for editing
Route::delete('/products/{id}', [ProductController::class]); // Delete a specific product by ID
Route::post('/products', [ProductController::class])->middleware('throttle:5,3'); // Create a new product


// Protected Routes (requires authentication)
// Route::middleware('auth:sanctum')->group(function () {});
