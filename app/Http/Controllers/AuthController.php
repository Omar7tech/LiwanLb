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
            'username' => 'required|string|max:255',
            'password' => 'required|string|min:2|max:255',
        ]);

        // Try to find user by username or phone number
        $user = \App\Models\User::where('username', $request->username)
                               ->orWhere('phoneNumber', $request->username)
                               ->first();

        if ($user && \Illuminate\Support\Facades\Hash::check($request->password, $user->password)) {
            Auth::login($user, true);
            $request->session()->regenerate();
            
            // Only allow clients to log in from the public login page
            // Admins and super_admins should use /admin/login
            if ($user->hasRole('client')) {
                return to_route('dashboard.index');
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
