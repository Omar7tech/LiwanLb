<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Faq extends Model
{
    /** @use HasFactory<\Database\Factories\FaqFactory> */
    use HasFactory;
    protected $guarded = ['id'];

    protected function casts(): array
    {
        return [
            'active' => 'boolean',
        ];
    }

    public function Work()
    {
        return $this->belongsTo(Work::class);
    }   

    protected static function booted(): void
    {
        static::addGlobalScope('FaqScope', function (Builder $builder) {
            $builder->orderBy('order', 'asc')->where('active', true);
        });
    }
    
}
