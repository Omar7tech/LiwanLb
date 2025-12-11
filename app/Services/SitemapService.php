<?php

namespace App\Services;

use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\Tags\Url;

class SitemapService
{
    /**
     * Generate sitemap with multiple models and static URLs
     */
    public static function generate(): void
    {
        $sitemap = Sitemap::create();
        $sitemap->add(\App\Models\Blog::where('active', true)->get());
        $sitemap->add(\App\Models\Residency::where('active', true)->get());
        
        $staticUrls = [
             Url::create(route('home'))
                ->setPriority(1.0),
             Url::create(route('work')),
             Url::create(route('cost-study')),
             Url::create(route('blogs')),
             Url::create(route('partner-with-us')),
        ];

        foreach ($staticUrls as $url) {
            $sitemap->add($url);
        }

        $sitemap->writeToFile(public_path('sitemap.xml'));
    }
}
