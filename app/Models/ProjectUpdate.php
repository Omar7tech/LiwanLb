<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class ProjectUpdate extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;
    

    protected $fillable = [
        'project_id',
        'name',
        'description',
        'date',
        'updated_by',
    ];

    protected $casts = [
        'date' => 'date',
        'name' => 'string',
        'description' => 'string',
    ];
    
    protected $attributes = [
        'name' => null,
        'description' => null,
    ];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }
    
    // Alias for backward compatibility
    public function projectSection()
    {
        return $this->project();
    }

    public function registerMediaConversions(?Media $media = null): void
    {
        $this->addMediaConversion('webp')
            ->format('webp')
            ->quality(20)
            ->nonQueued();
    }
    
    public function updater()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    public function comments()
    {
        return $this->hasMany(UpdateComment::class);
    }

    protected static function booted(): void
    {
        static::addGlobalScope('ProjectUpdateScope', function (Builder $builder) {
            $builder->orderBy('date', 'desc');
        });
    }

}
