<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Products;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use  Laravel\Sanctum\Sanctum;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use illuminate\Contracts\Auth\Authenticatable;


class UserController extends Controller
{
       public function login(Request $request){
            $validated_data = $request->validate([
                'email'=> 'required|email',
                'password'=> 'required',
                ]);
                if (Auth::attempt($validated_data)) {
                    Auth::login($validated_data);
                    $user = User::where('email', $validated_data['email'])->first();
                    $token = $user->createToken('auth-token')->plainTextToken;
                    return response()->json([
                        'success' => true,
                        'token' => $token,
                        'user_email' => $user->email
                    ]);
                }    
    
    return response()->json([
        'message' => 'ایمیل یا رمز عبور اشتباه است'
        ], 401);
        
    }

    public function register(Request $request)
    {
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email|unique:users',
        'password' => 'required|min:8'
    ]);

    $user = new User();
    $user->name = $request->name;
    $user->email = $request->email;
    $user->password = $request->password;
    if ($user->save()) {
        // Log the user in and create token
        Auth::login($user);
        $token = $user->createToken('auth-token')->plainTextToken;
    return response()->json([
        'success' => true,
        'token' => $token,
        'user' => $user
    ], 201);
    }
    return response()->json([
        'success' => false,
    ], 201);

    }
}
