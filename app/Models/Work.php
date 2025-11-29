<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Work extends Model
{
    /** @use HasFactory<\Database\Factories\WorkFactory> */
    use HasFactory , HasSlug;

    protected $guarded = ['id'];

    protected function casts(): array
    {
        return [
            'active' => 'boolean',
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
}
