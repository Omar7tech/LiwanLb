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

        // Add blog posts
        $sitemap->add(\App\Models\Blog::all());

        // Add other models as needed:
        // $sitemap->add(\App\Models\Product::all());
        // $sitemap->add(\App\Models\Service::all());
        // $sitemap->add(\App\Models\Category::all());

        // Add static pages
        $staticUrls = [
             Url::create(route('home'))
                ->setPriority(1.0),
             Url::create(route('about')),
        ];

        foreach ($staticUrls as $url) {
            $sitemap->add($url);
        }

        $sitemap->writeToFile(public_path('sitemap.xml'));
    }
}
