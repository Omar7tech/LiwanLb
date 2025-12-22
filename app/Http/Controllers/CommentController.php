<?php

namespace App\Http\Controllers;

use App\Models\ProjectUpdate;
use App\Models\UpdateComment;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;
use Illuminate\Auth\Access\AuthorizationException;

class CommentController extends Controller
{
    /**
     * Store a newly created comment.
     */
    public function store(Request $request, ProjectUpdate $projectUpdate)
    {
        // Authorization check: Ensure user can access this project update
        $this->authorizeProjectUpdateAccess($projectUpdate);

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
        // Authorization check: Ensure user can access this project update
        $this->authorizeProjectUpdateAccess($comment->projectUpdate);

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
        // Authorization check: Ensure user can access this project update
        $this->authorizeProjectUpdateAccess($comment->projectUpdate);

        $comment->delete();

        return redirect()->back()
            ->with('success', 'Comment deleted successfully!');
    }

    /**
     * Authorize access to project update based on user roles and project relationships.
     */
    private function authorizeProjectUpdateAccess(ProjectUpdate $projectUpdate): void
    {
        $user = auth()->user();
        
        if (!$user) {
            throw new AuthorizationException('Unauthorized access.');
        }

        // Super admins can access all project updates
        if ($user->hasRole('super_admin')) {
            return;
        }

        $project = $projectUpdate->project;

        // Check if user is the client of the project
        if ($project->client_id === $user->id) {
            return;
        }

        // Check if user is a foreman assigned to this project
        if ($project->foremen()->where('user_id', $user->id)->exists()) {
            return;
        }

        // If none of the above conditions are met, deny access
        throw new AuthorizationException('You do not have permission to access this project update.');
    }
}
