<?php

namespace App\Http\Middleware;

use App\Http\Resources\sharedWorkListResource;
use App\Models\Work;
use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'generalSettings' => app(\App\Settings\GeneralSettings::class),
            'socialSettings' => app(\App\Settings\SocialSettings::class),
            'name' => config('app.name'),
            'auth' => [
                'user' => $request->user() ? [
                    ...$request->user()->toArray(),
                    'roles' => $request->user()->roles->pluck('name')->toArray(),
                ] : null,
            ],
            'sharedWorks' => fn() => sharedWorkListResource::collection(Work::all()),
        ];
    }

    /**
     * Determines if the request should be handled by Inertia.
     * 
     * This fixes the Android Chrome tab restoration issue where
     * Chrome sometimes sends requests with Inertia headers but
     * expects HTML responses.
     */
    public function shouldHandle(Request $request): bool
    {
        // Check for Android Chrome tab restoration issue
        // If the request has Inertia headers but also has a referer
        // that doesn't match our app domain, it's likely a tab restoration
        $referer = $request->header('referer');
        $host = $request->getHost();
        
        if ($referer && !str_contains($referer, $host)) {
            // This looks like a tab restoration, don't handle with Inertia
            return false;
        }

        // Check for partial X-Inertia headers (some browsers send incomplete headers)
        $inertiaHeader = $request->header('X-Inertia');
        $inertiaVersionHeader = $request->header('X-Inertia-Version');
        
        if ($inertiaHeader && !$inertiaVersionHeader) {
            // Incomplete Inertia headers, likely tab restoration
            return false;
        }

        // Check for missing X-Requested-With header (tab restoration often misses this)
        if ($inertiaHeader && !$request->header('X-Requested-With')) {
            return false;
        }

        // Check if this is a regular Inertia request
        return $inertiaHeader && $inertiaVersionHeader && $request->header('X-Requested-With');
    }
}
