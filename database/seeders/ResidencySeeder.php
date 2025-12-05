<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ResidencySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\Residency::factory(100)
            ->has(\App\Models\ResidencyContent::factory()->count(rand(3, 5)))
            ->create();
    }
}
