<?php

namespace Database\Seeders;

use App\Models\Work;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class WorkSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
         $works = [
            ['name' => 'Home', 'title' => 'Liwan For Every Home', 'arabic_name' => 'بيت'],
            ['name' => 'Estate', 'title' => 'Liwan Estate', 'arabic_name' => 'عقار'],
            ['name' => 'Interior', 'title' => 'Liwan Interiors', 'arabic_name' => 'ديكور داخلي'],
            ['name' => 'Business', 'title' => 'Liwan Business Space', 'arabic_name' => 'مساحة تجارية'],
        ];

        $faker = \Faker\Factory::create();

        foreach ($works as $index => $work) {
            $steps = [];
            for ($i = 0; $i < rand(4, 8); $i++) {
                $steps[] = [
                    'title' => $faker->sentence(3),
                    'description' => $faker->paragraph(),
                ];
            }

            Work::create([
                'name' => $work['name'],
                'title' => $work['title'],
                'arabic_name' => $work['arabic_name'],
                'visual_text' => $faker->sentence(),
                'process_title' => $faker->sentence(2),
                'process_steps' => $steps,
            ]);
        }
    }
}
