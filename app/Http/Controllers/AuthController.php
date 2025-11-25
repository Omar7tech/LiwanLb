<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AuthController extends Controller
{

    public function index()
    {
        Auth::logout();
        return Inertia::render('auth/login');
    }
    public function store(Request $request)
    {
        Auth::logout();

        $validated = $request->validate([
            'username' => 'required|max:255',
            'password' => 'required|max:255',
        ]);

        if (Auth::attempt($validated , true)) {
            $request->session()->regenerate();
            return to_route('dashboard');
        }

        return back()->withErrors([
            'username' => 'Invalid credentials.',
        ]);

    }

    public function logout(Request $request)
{
    Auth::logout();

    $request->session()->invalidate();
    $request->session()->regenerateToken();

    return to_route('login');
}

}
