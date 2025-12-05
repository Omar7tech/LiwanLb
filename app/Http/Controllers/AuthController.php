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

        if (Auth::attempt($validated, true)) {
            $user = Auth::user();
            
            // Only allow clients to log in from the public login page
            // Admins and super_admins should use /admin/login
            if ($user->hasRole('client')) {
                $request->session()->regenerate();
                return to_route('dashboard');
            }
            
            // If user is admin/super_admin, log them out and show error
            Auth::logout();
            return back()->withErrors([
                'username' => 'Admin users must log in through the admin panel.',
            ]);
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
