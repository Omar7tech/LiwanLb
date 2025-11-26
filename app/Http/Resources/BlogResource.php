<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BlogResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */

    public static $wrap = false ;

    public function toArray(Request $request): array
    {
        return [
            'title' => $this->title,
            'slug' => $this->slug,
            'image' => $this->getFirstMediaUrl('images', 'webp') ?: null,
            'content' => $this->content,
            'description' => $this->description,
            'created_at' => $this->created_at->toFormattedDateString(),
        ];
    }
}
