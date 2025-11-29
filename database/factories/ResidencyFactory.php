<?php

namespace Database\Factories;

use App\Models\Work;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Residency>
 */
class ResidencyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        
        return [
            'name' => $this->faker->company() . ' Residency',
            'active' => true,
            'order' => $this->faker->numberBetween(1, 100),
            'work_id' => Work::inRandomOrder()->first()->id,
        ];
    }
}

