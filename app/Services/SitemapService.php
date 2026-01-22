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
        
        // Add blog posts with high priority and frequent updates
        $blogPosts = \App\Models\Blog::where('active', '=', true)->get();
        foreach ($blogPosts as $blog) {
            $sitemap->add(Url::create('https://liwanlb.com/blog/' . $blog->slug)
                ->setLastModificationDate($blog->updated_at)
                ->setChangeFrequency(Url::CHANGE_FREQUENCY_WEEKLY)
                ->setPriority(0.8));
        }
        
        // Add residency pages
        $residencies = \App\Models\Residency::where('active', '=', true)->get();
        foreach ($residencies as $residency) {
            $sitemap->add(Url::create('https://liwanlb.com/residency/' . $residency->slug)
                ->setLastModificationDate($residency->updated_at)
                ->setChangeFrequency(Url::CHANGE_FREQUENCY_MONTHLY)
                ->setPriority(0.7));
        }
        
        // Static pages with appropriate priorities
        $staticUrls = [
            Url::create('https://liwanlb.com')
                ->setPriority(1.0)
                ->setChangeFrequency(Url::CHANGE_FREQUENCY_DAILY),
            Url::create('https://liwanlb.com/works')
                ->setPriority(0.9)
                ->setChangeFrequency(Url::CHANGE_FREQUENCY_WEEKLY),
            Url::create('https://liwanlb.com/cost-study')
                ->setPriority(0.8)
                ->setChangeFrequency(Url::CHANGE_FREQUENCY_MONTHLY),
            Url::create('https://liwanlb.com/blogs')
                ->setPriority(0.9)
                ->setChangeFrequency(Url::CHANGE_FREQUENCY_DAILY),
            Url::create('https://liwanlb.com/partner-with-us')
                ->setPriority(0.6)
                ->setChangeFrequency(Url::CHANGE_FREQUENCY_MONTHLY),
        ];

        foreach ($staticUrls as $url) {
            $sitemap->add($url);
        }

        $sitemap->writeToFile(public_path('sitemap.xml'));
    }
}
