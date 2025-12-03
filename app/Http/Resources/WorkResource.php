<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class WorkResource extends JsonResource
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
            'id' => $this->id,
            'name' => $this->name,
            'title' => $this->title,
            'slug' => $this->slug,
            'visual_text' => $this->visual_text,
            'process_title' => $this->process_title,
            'process_steps' => $this->process_steps,
            'image' => $this->getFirstMediaUrl('images', 'webp') ?: null,
            'faqs' => [
                'data' => FaqListResource::collection($this->whenLoaded('Faqs'))
            ],
            'residencies' => [
                'data' => ResidencyListResource::collection($this->whenLoaded('Residencies'))
            ],
        ];
    }
}
