<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Project extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia, HasSlug;
    
    public $registerMediaConversionsUsingModelInstance = true;

    protected $fillable = [
        'name',
        'slug',
        'start_date',
        'status',
        'location',
        'client_id',
        'description',
    ];

    protected $casts = [
        'start_date' => 'date',
    ];

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

    public function client()
    {
        return $this->belongsTo(User::class, 'client_id');
    }

    public function foremen()
    {
        return $this->belongsToMany(User::class, 'project_foreman', 'project_id', 'foreman_id')
            ->withTimestamps();
    }

    public function projectUpdates()
    {
        return $this->hasMany(ProjectUpdate::class);
    }
    
    public function projectSections()
    {
        return $this->projectUpdates();
    }

    public function registerMediaConversions(?Media $media = null): void
    {
        $this->addMediaConversion('webp')
            ->format('webp')
            ->quality(20)
            ->nonQueued();
    }

    protected static function booted(): void
    {
        static::addGlobalScope('projectScope', function (Builder $builder) {
            $builder->orderBy('order', 'asc')->where('active', true);
        });
    }
}
