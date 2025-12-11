<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;
use Spatie\Sitemap\Contracts\Sitemapable;
use Spatie\Sitemap\Tags\Url;

class Residency extends Model implements HasMedia, Sitemapable
{
    /** @use HasFactory<\Database\Factories\ResidencyFactory> */
    use HasFactory , HasSlug;
    use InteractsWithMedia;
    protected $guarded = ['id'];

    protected function casts(): array
    {
        return [
            'active' => 'boolean',
        ];
    }

    public $registerMediaConversionsUsingModelInstance = true;

    public function registerMediaConversions(?Media $media = null): void
    {
        $this->addMediaConversion('webp')
            ->format('webp')
            ->quality(20)
            ->nonQueued();
    }


    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('name')
            ->saveSlugsTo('slug');
    }

    public function getRouteKeyName()
    {
        return 'slug';
    }

    public function Work()
    {
        return $this->belongsTo(Work::class);
    }

    public function residencyContents()
    {
        return $this->hasMany(ResidencyContent::class);
    }

     protected static function booted(): void
    {
        static::addGlobalScope('ResidencyScope', function (Builder $builder) {
            $builder->orderBy('order', 'asc')->where('active', true);
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

    public function toSitemapTag(): Url|string|array
    {
        return Url::create(route('residency.show', $this))
            ->setLastModificationDate(Carbon::create($this->updated_at));
    }

}
