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
        $user = $request->user();

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'username' => ['required', 'string', 'max:255', 'unique:users,username,' . $user->id],
            'phoneNumber' => ['nullable', 'string', 'min:8', 'max:20'],
            'password' => ['nullable', 'string', 'min:8', 'confirmed'],
        ]);

        $user->name = $validated['name'];
        $user->username = $validated['username'];
        
        // Only update phone number if it's provided and valid
        if (isset($validated['phoneNumber'])) {
            if (empty($validated['phoneNumber'])) {
                $user->phoneNumber = null;
            } else {
                // Sanitize phone number (remove spaces, dashes, parentheses)
                $sanitizedPhone = preg_replace('/[\s\-\(\)]/', '', $validated['phoneNumber']);
                $user->phoneNumber = $sanitizedPhone;
            }
        }

        if (!empty($validated['password'])) {
            $user->password = Hash::make($validated['password']);
        }

        $user->save();

        return back()->with('success', 'Profile updated successfully.');
    }
}
