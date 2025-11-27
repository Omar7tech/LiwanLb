<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::firstOrCreate(
            ['email' => 'liwan@admin.com'],
            [
                'name' => 'Liwan Admin',
                'password' => 'password',
                'email_verified_at' => now(),
                'role' => 'admin',
            ]
        );
        User::firstOrCreate(
            ['email' => 'yamen@admin.com'],
            [
                'name' => 'Yamen',
                'username' => 'yamen',
                'password' => 'password',
                'email_verified_at' => now(),
                'role' => 'admin',
            ]
        );

        $this->call([
            DesignDeliveryStandardSeeder::class,
            BlogSeeder::class,
            TestimonialSeeder::class,
            FaqSeeder::class
        ]);

    }
}
