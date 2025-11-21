<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AuthController extends Controller
{

    public function index()
    {
        return Inertia::render('auth/login');
    }
    public function store(Request $request)
    {

        $validated = $request->validate([
            'username' => 'required|max:255',
            'password' => 'required|max:255',
        ]);

        if (Auth::attempt($validated)) {
            $request->session()->regenerate();
            return to_route('dashboard');
        }

        return back()->withErrors([
            'username' => 'Invalid credentials.',
        ]);

    }

    public function logout()
    {
        Auth::logout();
        return to_route('login');
    }
}
