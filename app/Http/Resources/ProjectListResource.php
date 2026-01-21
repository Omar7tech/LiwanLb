<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectListResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'start_date' => $this->start_date,
            'status' => $this->status,
            'location' => $this->location,
            'image' => $this->getFirstMediaUrl('images', 'webp') ?: null,
            'payment_link' => $this->payment_link,
            'project_notes' => $this->project_notes,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            
        ];
    }
}
