<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
{
    /**
     * Do not wrap the resource in a "data" key.
     */
    public static $wrap = false;

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
            'description' => $this->description,
            'image' => $this->getFirstMediaUrl('images', 'webp') ?: null,

            
            'project_updates' => [
                'data' => $this->whenLoaded('projectUpdates', function () {
                    return $this->projectUpdates->map(function ($update) {
                        return [
                            'id' => $update->id,
                            'project_id' => $update->project_id,
                            'name' => $update->name,
                            'description' => $update->description,
                            'date' => $update->date,
                            'updated_by' => $update->updated_by,
                            'updater' => $update->updater ? [
                                'id' => $update->updater->id,
                                'name' => $update->updater->name,
                                'email' => $update->updater->email,
                            ] : null,
                            'media' => $update->getMedia('project_update_images')->map(function ($media) {
                            return [
                                'id' => $media->id,
                                'original_url' => $media->getUrl('webp') ?? $media->getUrl(),
                            ];
                        }),
                        'comments' => $update->comments->map(function ($comment) {
                            return [
                                'id' => $comment->id,
                                'content' => $comment->content,
                                'created_at' => $comment->created_at->toISOString(),
                                'updated_at' => $comment->updated_at->toISOString(),
                            ];
                        }),
                            'created_at' => $update->created_at,
                            'updated_at' => $update->updated_at,
                        ];
                    });
                }),
            ],
        ];
    }
}
