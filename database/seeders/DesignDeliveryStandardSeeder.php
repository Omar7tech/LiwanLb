<?php

namespace Database\Seeders;

use App\Models\DesignDeliveryStandard;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DesignDeliveryStandardSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DesignDeliveryStandard::factory()->count(8)->create();
    }
}
