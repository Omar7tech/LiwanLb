<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DesignDeliveryStandard extends Model
{
    /** @use HasFactory<\Database\Factories\DesignDeliveryStandardFactory> */
    use HasFactory;
    protected $guarded = ['id'];

    protected function casts(): array
    {
        return [
            'active' => 'boolean',
        ];
    }
}
