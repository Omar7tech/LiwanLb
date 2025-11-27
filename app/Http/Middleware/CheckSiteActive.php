<?php

namespace App\Http\Middleware;

use App\Settings\GeneralSettings;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckSiteActive
{
    public function __construct(public GeneralSettings $settings)
    {
    }

    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Allow access if site is active
        if ($this->settings->site_active) {
            return $next($request);
        }

        // Allow access to maintenance page
        if ($request->routeIs('maintenance')) {
            return $next($request);
        }

        return redirect()->route('maintenance');
    }
}
