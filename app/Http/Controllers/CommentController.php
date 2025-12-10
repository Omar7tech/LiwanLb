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
            'content' => $validated['content'],
        ]);

        return redirect()->back()
            ->with('success', 'Comment added successfully!');
    }

    /**
     * Update the specified comment.
     */
    public function update(Request $request, UpdateComment $comment)
    {
        $validated = $request->validate([
            'content' => 'required|string|max:1000',
        ]);

        $comment->update([
            'content' => $validated['content'],
        ]);

        return redirect()->back()
            ->with('success', 'Comment updated successfully!');
    }

    /**
     * Remove the specified comment.
     */
    public function destroy(UpdateComment $comment)
    {
        $comment->delete();

        return redirect()->back()
            ->with('success', 'Comment deleted successfully!');
    }
}
