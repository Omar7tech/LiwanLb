<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProjectListResource;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PaymentController extends Controller
{
    /**
     * Display the payment dashboard for authenticated clients.
     */
    public function index()
    {
        $user = Auth::user();
        
        // Get projects for the current client user that have payment links
        $projects = Project::where('client_id', $user->id)
            ->whereNotNull('payment_link')
            ->where('payment_link', '!=', '')
            ->with('media') // Load media relationships
            ->orderBy('created_at', 'desc')
            ->get();

        return inertia('dashboard/payments', [
            'auth' => [
                'user' => [
                    'name' => $user->name,
                    'email' => $user->email,
                ],
            ],
            'projects' => ProjectListResource::collection($projects)->toArray(request()),
        ]);
    }
}
