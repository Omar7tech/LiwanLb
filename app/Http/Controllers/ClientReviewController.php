<?php

namespace App\Http\Controllers;

use App\Models\ClientReview;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ClientReviewController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        
        // Users can only view their own review
        $review = ClientReview::where('client_id', $user->id)->first();
        
        return Inertia::render('ClientReviews', [
            'review' => $review,
            'hasReview' => !is_null($review),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'rating' => 'required|integer|min:0|max:5',
            'review_notes' => 'nullable|string|max:1000',
        ]);

        $user = Auth::user();
        
        // Security: Force client_id to authenticated user's ID to prevent manipulation
        ClientReview::updateOrCreate(
            ['client_id' => $user->id], // Always use authenticated user's ID
            [
                'rating' => $request->rating,
                'review_notes' => $request->review_notes,
            ]
        );

        return back()->with('success', 'Feedback saved successfully!');
    }

    public function destroy()
    {
        $user = Auth::user();
        
        // Users can only delete their own review
        $review = ClientReview::where('client_id', $user->id)->first();
        
        if ($review) {
            $review->delete();
        }

        return back()->with('success', 'Feedback deleted successfully!');
    }
}
