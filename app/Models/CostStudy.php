<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class CostStudy extends Model
{
    use HasFactory;

    protected $fillable = [
        'full_name',
        'mobile_number',
    ];
}
