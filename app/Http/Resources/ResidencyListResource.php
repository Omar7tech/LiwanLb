<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ResidencyListResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // 💡 FIX: Consistently use the 'webp' conversion for the final URL
        $imageUrl = $this->getFirstMediaUrl('images', 'webp');
        
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            // Check if the URL exists, if so, use it, otherwise use null
            'image' => $imageUrl ?: null, 
        ];
    }
}