<?php

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post('/products', function (Request $request) {
    $product = new Product();
    $product->name = $request->name;
    $product->price = $request->price;
    $product->save();
});
Route::get('/products', function () {
    return response()->json([product::all()]);
});