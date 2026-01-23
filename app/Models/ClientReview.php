<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ClientReview extends Model
{
    use HasFactory;

    protected $fillable = [
        'client_id',
        'rating',
        'review_notes',
    ];

    protected $casts = [
        'rating' => 'integer',
    ];

    public function client(): BelongsTo
    {
        return $this->belongsTo(User::class, 'client_id');
    }

    public function getStarsAttribute(): string
    {
        $rating = (int) $this->rating;
        $fullStars = $rating;
        $emptyStars = 5 - $fullStars;
        
        $stars = str_repeat('★', $fullStars);
        $stars .= str_repeat('☆', $emptyStars);
        
        return $stars . " ({$rating})";
    }
}
