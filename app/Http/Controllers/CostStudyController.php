<?php

namespace App\Http\Controllers;

use App\Models\CostStudy;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class CostStudyController extends Controller
{
    public function index(){
        return Inertia::render('CostStudy', [
            'generalSettings' => app(\App\Settings\GeneralSettings::class),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'full_name' => 'required|string|min:4|max:20|regex:/^[a-zA-Z\s\p{Arabic}]+$/u',
            'mobile_number' => 'required|string|digits_between:8,20|regex:/^[0-9]+$/',
        ]);

        // Check if user is authenticated
        if (Auth::check()) {
            return redirect()->back()->with('success', 'User is authenticated');
        }

        // Check if this phone number already exists
        $existing = CostStudy::where('mobile_number', $validated['mobile_number'])->first();
        
        if ($existing) {
            return redirect()->back()->with('success', 'Phone number already exists');
        }

        // Create new cost study entry
        CostStudy::create($validated);

        return redirect()->back()->with('success', 'Cost study inquiry saved successfully');
    }
}
