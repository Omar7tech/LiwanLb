<?php

namespace App\Http\Controllers;

use App\Models\ProjectUpdate;
use App\Models\UpdateComment;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;

class CommentController extends Controller
{
    /**
     * Store a newly created comment.
     */
    public function store(Request $request, ProjectUpdate $projectUpdate)
    {
        $validated = $request->validate([
            'content' => 'required|string|max:1000',
        ]);

        $comment = $projectUpdate->comments()->create([
            'user_id' => auth()->id(),
            'content' => $validated['content'],
        ]);

        // Return back to the project page with success
        return redirect()->back()
            ->with('success', 'Comment added successfully!');
    }

    /**
     * Remove the specified comment.
     */
    public function destroy(UpdateComment $comment)
    {
        if ($comment->user_id !== auth()->id()) {
            abort(403, 'Unauthorized');
        }

        $comment->delete();

        return redirect()->back()
            ->with('success', 'Comment deleted successfully!');
    }
}
