<?php

use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use  Laravel\Sanctum\Sanctum;
use Illuminate\Support\Facades\Auth;
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
Route::post('/register', function (Request $request) {
    $user = new User();
    $user->name = $request->name;
    $user->email = $request->email;
    $user->password = $request->password;
    if($user->save()){
        if(Auth::attempt($request->only('email','password'))){
               $token = $user->createToken('auth-token')->plainTextToken;
                return response()->json([
                    'success' => true,
                    'token' => $token,
                    'user_data' => $user->email
                ]);
        }
    }
    return response()->json(['message' => 'failed'],401);
});
Route::post('/login', function (Request $request) {
     $validated_data = $request->validate([
        'email'=> 'required|email',
        'password'=> 'required',
     ]);
    if (Auth::attempt($validated_data)) {
        $user = Auth::user();
        $token = $user->createToken('auth-token')->plainTextToken;
        
        return response()->json([
            'success' => true,
            'token' => $token,
            'user_email' => $user->email
        ]);
    }    
    
    return response()->json([
        'success' => false,
        'message' => 'ایمیل یا رمز عبور اشتباه است'
    ], 401);

})->middleware('throttle:5,1');
Route::get('/products', function () {
    return response()->json([product::all()]);
});