<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Work>
 */
class WorkFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $steps = [];
        for ($i = 0; $i < rand(4, 8); $i++) {
            $steps[] = [
                'title' => $this->faker->sentence(3),
                'description' => $this->faker->paragraph(),
            ];
        }

        return [
            'name' => $this->faker->unique()->word(),
            'title' => $this->faker->optional()->sentence(3),
            'visual_text' => $this->faker->sentence(6 , true),
            'process_title' => 'For homeowners building a new house or transforming an existing one.',
            'process_steps' => $steps,
            'order' => $this->faker->numberBetween(0, 50),
            'active' => true,
        ];
    }
}
