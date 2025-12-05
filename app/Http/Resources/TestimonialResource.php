<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TestimonialResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'name' => $this->name,
            'testimonial' => $this->testimonial,
            'rating' => $this->rating,
            'work_name' => $this->work?->title ?? $this->work?->name,
        ];
    }
}
