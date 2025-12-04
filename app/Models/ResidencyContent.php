<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class ResidencyContent extends Model implements HasMedia
{
    /** @use HasFactory<\Database\Factories\ResidencyContentFactory> */
    use HasFactory;
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


    public function residency()
    {
        return $this->belongsTo(Residency::class);
    }

    protected static function booted(): void
    {
        static::addGlobalScope('ResidencyContentScope', function (Builder $builder) {
            $builder->orderBy('order', 'asc')->where('active', true);
        });
    }
}
