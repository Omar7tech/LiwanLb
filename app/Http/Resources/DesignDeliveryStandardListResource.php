<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DesignDeliveryStandardListResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'english_title' => $this->english_title,
            'english_description' => $this->english_description,
            'arabic_title' => $this->arabic_title,
            'arabic_description' => $this->arabic_description, 
        ];
    }
}
