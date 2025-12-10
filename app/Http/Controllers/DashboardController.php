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

        // Only get what we need for the dashboard
        $projects = \App\Models\Project::query()
            ->where('client_id', $user->id)
            ->withCount('projectUpdates')
            ->get();

        // Calculate basic stats
        $totalProjects = $projects->count();
        $totalUpdates = $projects->sum('project_updates_count');

        // Projects by status
        /** @var \Illuminate\Support\Collection<string, int> $projectsByStatus */
        $projectsByStatus = $projects->groupBy('status')->map->count();

        // Updates by month - only if we have updates
        $updatesByMonth = collect([]);
        if ($totalUpdates > 0) {
            $updatesByMonth = \App\Models\ProjectUpdate::query()
                ->whereHas('project', function($query) use ($user) {
                    $query->where('client_id', $user->id);
                })
                ->selectRaw('DATE_FORMAT(date, "%b") as month, COUNT(*) as count')
                ->groupBy('month')
                ->orderByRaw('MONTH(date) DESC')
                ->limit(6)
                ->pluck('count', 'month');
        }

        return Inertia::render('dashboard', [
            'projects' => \App\Http\Resources\ProjectListResource::collection($projects),
            'projectStats' => [
                'total' => $totalProjects,
                'totalUpdates' => $totalUpdates,
                'byStatus' => [
                    'active' => $projectsByStatus->get('active', 0),
                    'completed' => $projectsByStatus->get('completed', 0),
                    'on_hold' => $projectsByStatus->get('on_hold', 0),
                    'pending' => $projectsByStatus->get('pending', 0),
                ],
                'updatesByMonth' => $updatesByMonth->toArray(),
            ],
        ]);
    }

    public function contact(Request $request)
    {
        $user = $request->user();
        abort_unless($user->hasRole('client'), 403);

        return Inertia::render('dashboard/contact' );
    }
}
