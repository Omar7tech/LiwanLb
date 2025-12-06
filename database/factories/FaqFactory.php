<?php

namespace Database\Factories;

use App\Models\Work;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Faq>
 */
class FaqFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'question' => fake()->sentence(5),
            'answer' => fake()->paragraph(3),
            'order' => fake()->numberBetween(1, 10),
            'active' => fake()->boolean(),
            'work_id' => Work::count() ? Work::inRandomOrder()->first()->id : null,
        ];
    }
}
