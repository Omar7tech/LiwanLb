<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Testimonial extends Model
{
    /** @use HasFactory<\Database\Factories\TestimonialFactory> */
    use HasFactory;

    protected $guarded = ['id'];
    protected function casts(): array
    {
        return [
            'active' => 'boolean',
        ];
    }
    public function work()
    {
        return $this->belongsTo(Work::class);
    }

    protected static function booted(): void
    {
        static::addGlobalScope('TestimonialScope', function (Builder $builder) {
            $builder->orderBy('order', 'asc')->where('active', true);
        });
    }
}
