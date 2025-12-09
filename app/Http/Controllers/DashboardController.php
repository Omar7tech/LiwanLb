<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        abort_unless($user->hasRole('client'), 403);

        $projects = \App\Models\Project::query()
            ->where('client_id', $user->id)
            ->get();

        return Inertia::render('dashboard', [
            'projects' => \App\Http\Resources\ProjectListResource::collection($projects),
            'projectStats' => [
                'total' => $projects->count(),
            ],
        ]);
    }
}
