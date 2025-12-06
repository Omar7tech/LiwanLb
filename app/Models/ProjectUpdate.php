<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class ProjectUpdate extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;
    
    public $registerMediaConversionsUsingModelInstance = true;

    protected $fillable = [
        'project_id',
        'name',
        'description',
        'date',
    ];

    protected $casts = [
        'date' => 'date',
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
}
