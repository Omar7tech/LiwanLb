<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function index()
    {
        return Inertia::render('Profile');
    }

    public function update(Request $request)
    {
        // Explicit authorization check
        $user = auth()->user();
        if (!$user) {
            abort(403, 'Unauthorized');
        }

        // Enhanced validation with security
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', 'regex:/^[a-zA-Z\s\-\'\.]+$/'],
            'username' => ['required', 'string', 'max:255', 'min:3', 'regex:/^[a-zA-Z0-9_\-]+$/', Rule::unique('users')->ignore($user->id)],
            'phoneNumber' => ['nullable', 'string', 'regex:/^\+?[1-9]\d{1,14}$/', 'max:20'],
            'password' => ['nullable', 'string', 'min:8', 'confirmed'],
        ], [
            'name.regex' => 'Invalid characters in name',
            'username.regex' => 'Username can only contain letters, numbers, underscores, and hyphens',
            'phoneNumber.regex' => 'Invalid phone number format',
        ]);

        // Sanitize and update fields
        $user->name = htmlspecialchars(strip_tags($validated['name']), ENT_QUOTES, 'UTF-8');
        $user->username = htmlspecialchars(strip_tags($validated['username']), ENT_QUOTES, 'UTF-8');
        
        // Handle phone number
        if (empty($validated['phoneNumber'])) {
            $user->phoneNumber = null;
        } else {
            $user->phoneNumber = $validated['phoneNumber'];
        }

        // Password change requires current password verification
        if (!empty($validated['password'])) {
            if (!$request->filled('current_password') || !Hash::check($request->input('current_password'), $user->password)) {
                return back()->withErrors(['current_password' => 'Current password is required to change password.']);
            }
            $user->password = Hash::make($validated['password']);
        }

        $user->save();

        return back()->with('success', 'Profile updated successfully.');
    }
}
