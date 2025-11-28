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
        // $sitemap->add(\App\Models\Product::all());
        // $sitemap->add(\App\Models\Service::all());
        // $sitemap->add(\App\Models\Category::all());
        $staticUrls = [
             Url::create(route('home'))
                ->setPriority(1.0),
             Url::create(route('work')),
        ];

        foreach ($staticUrls as $url) {
            $sitemap->add($url);
        }

        $sitemap->writeToFile(public_path('sitemap.xml'));
    }
}
