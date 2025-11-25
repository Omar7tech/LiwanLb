<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\Sitemap\Contracts\Sitemapable;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;
use Spatie\Sitemap\Tags\Url;
class Blog extends Model implements HasMedia , Sitemapable
{
    /** @use HasFactory<\Database\Factories\BlogFactory> */
    use HasFactory , HasSlug;
    use InteractsWithMedia;

    protected $guarded = ['id'];
    public function getSlugOptions() : SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('title')
            ->saveSlugsTo('slug');
    }

    public function getRouteKeyName()
    {
        return 'slug';
    }

    protected function casts(): array
    {
        return [
            'active' => 'boolean',
        ];
    }

     protected static function booted(): void
    {
        static::addGlobalScope('ServiceScope', function (Builder $builder) {
            $builder->orderBy('created_at', 'desc')->where('active', true);
        });

        
        static::created(function () {
            \App\Services\SitemapService::generate();
        });

        
        static::updated(function () {
            \App\Services\SitemapService::generate();
        });

        // Generate sitemap on delete
        static::deleted(function () {
            \App\Services\SitemapService::generate();
        });
    }

     public function toSitemapTag(): Url | string | array
    {
        return Url::create(route('blogs.show', $this))
            ->setLastModificationDate(Carbon::create($this->updated_at));
    }
}
