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
            ['name' => 'Home', 'title' => 'Liwan For Every Home'],
            ['name' => 'Estate', 'title' => 'Liwan Estate'],
            ['name' => 'Interior', 'title' => 'Liwan Interiors'],
            ['name' => 'Business', 'title' => 'Liwan Business Space'],
        ];

        foreach ($works as $index => $work) {
            Work::firstOrCreate(
                ['name' => $work['name']],
                [
                    'title' => $work['title'],
                    'order' => $index,
                ]
            );
        }
    }
}
