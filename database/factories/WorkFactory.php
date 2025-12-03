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
        $steps = [
            [
                'title' => 'Understanding Your Lifestyle',
                'description' => 'We begin by exploring your needs, family habits, and long-term plans to shape a home that reflects how you truly live.',
            ],
            [
                'title' => 'Concept & Space Planning',
                'description' => 'We develop functional layouts, circulation, lighting strategy, and an initial architectural concept aligned with your budget.',
            ],
            [
                'title' => 'Detailed Architectural Design',
                'description' => 'Full drawings, elevations, materials, and 3D visualizations to help you see your home clearly — before execution begins.',
            ],
            [
                'title' => 'Licensing & Documentation',
                'description' => 'We manage all approvals, with a clear roadmap covering zoning, regulations, and municipal requirements.',
            ],
            [
                'title' => 'Execution & Supervision',
                'description' => 'On-site visits, contractor coordination, quality control, and continuous communication until handover.',
            ],
        ];

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
