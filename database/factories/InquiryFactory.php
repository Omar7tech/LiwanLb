<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Inquiry>
 */
class InquiryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'full_name' => fake()->name(),
            'phone' => fake()->e164PhoneNumber(),
            'email' => fake()->unique()->safeEmail(),
            'project_type' => fake()->randomElement(['Residential', 'Commercial', 'Industrial', 'Mixed-Use']),
            'project_location' => fake()->city() . ', ' . fake()->country(),
            'notes' => fake()->optional()->paragraph(),
        ];
    }
}
