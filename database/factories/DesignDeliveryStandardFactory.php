<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\DesignDeliveryStandard>
 */
class DesignDeliveryStandardFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'english_title' => $this->faker->sentence(2),
            'english_description' => $this->faker->paragraph(1),
            'arabic_title' => $this->faker->sentence(2),
            'arabic_description' => $this->faker->paragraph(1),
            'order' => $this->faker->numberBetween(1, 100),
            'active' => true,
        ];
    }
}
