<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProjectListResource;
use App\Http\Resources\ProjectResource;
use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        abort_unless($user->hasRole('client'), 403);

        $projects = Project::query()
            ->where('client_id', $user->id)
            ->with('client')
            ->latest()
            ->get();

        return Inertia::render('projects/index', [
            'projects' => fn () => \App\Http\Resources\ProjectListResource::collection($projects),
        ]);
    }

    public function show(Request $request, Project $project)
    {
        $user = $request->user();
        abort_unless($user->hasRole('client'), 403);
        abort_unless($project->client_id === $user->id, 403);

        $project->load(['projectUpdates.updater', 'projectUpdates.comments']);

        return Inertia::render('projects/show', [
            'project' => fn () => new ProjectResource($project),
        ]);
    }

     public function notesIndex(Request $request)
    {

        $user = $request->user();
        abort_unless($user->hasRole('client'), 403);

        $projects = Project::query()
            ->where('client_id', $user->id)
            ->with('client')
            ->latest()
            ->get();

        return Inertia::render('dashboard/projectNotes', [
            'projects' => fn () => ProjectListResource::collection($projects),
        ]);
    }



    
}
