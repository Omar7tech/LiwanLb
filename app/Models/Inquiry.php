<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inquiry extends Model
{
    /** @use HasFactory<\Database\Factories\InquiryFactory> */
    use HasFactory;

    protected $fillable = [
        'full_name',
        'phone',
        'email',
        'project_type',
        'project_location',
        'notes',
        'type',
        'ip_address',
        'user_agent',
    ];
}
