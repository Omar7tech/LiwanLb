<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Work;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $superAdminRole = \Spatie\Permission\Models\Role::firstOrCreate(['name' => 'super_admin']);
        $clientRole = \Spatie\Permission\Models\Role::firstOrCreate(['name' => 'client']);
        $foremanRole = \Spatie\Permission\Models\Role::firstOrCreate(['name' => 'foreman']);
        $bloggerRole = \Spatie\Permission\Models\Role::firstOrCreate(['name' => 'blogger']);
        
        $admin = User::firstOrCreate(
            ['email' => 'liwan@admin.com'],
            [
                'name' => 'Liwan Admin',
                'username' => 'admin',
                'password' => bcrypt('password'),
                'email_verified_at' => now(),
            ]
        );
        
        if (!$admin->hasRole('super_admin')) {
            $admin->assignRole('super_admin');
        }
        

        $this->call([
            DesignDeliveryStandardSeeder::class,
            BlogSeeder::class ,
            TestimonialSeeder::class,
            WorkSeeder::class,
            FaqSeeder::class,
            ResidencySeeder::class
        ]);

    }
}
