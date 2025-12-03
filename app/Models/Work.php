<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Work extends Model implements HasMedia
{
    /** @use HasFactory<\Database\Factories\WorkFactory> */
    use HasFactory, HasSlug;
    use InteractsWithMedia;
    public $registerMediaConversionsUsingModelInstance = true;
    protected $guarded = ['id'];

    protected function casts(): array
    {
        return [
            'active' => 'boolean',
            'process_steps' => 'array',
        ];
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

    public function Faqs()
    {
        return $this->hasMany(Faq::class);
    }

    public function Residencies()
    {
        return $this->hasMany(Residency::class);
    }

    protected static function booted(): void
    {
        static::addGlobalScope('WorkScope', function (Builder $builder) {
            $builder->orderBy('order', 'asc')->where('active', true);
        });
    }

    public function registerMediaConversions(?Media $media = null): void
    {
        $this->addMediaConversion('webp')
            ->format('webp')
            ->quality(20)
            ->nonQueued();
    }
}
