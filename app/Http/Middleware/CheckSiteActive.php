<?php

namespace App\Http\Middleware;

use App\Settings\GeneralSettings;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\ServiceUnavailableHttpException;

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

        // Throw service unavailable exception which will be handled by the exception handler
        throw new ServiceUnavailableHttpException('We are currently under maintenance. Please check back soon.');
    }
}
