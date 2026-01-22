<?php

namespace Database\Seeders;

use App\Models\CostStudy;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CostStudySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Clear existing records
        CostStudy::truncate();
        
        // Generate 10,000 records in batches for better performance
        $batchSize = 1000;
        $totalRecords = 10000;
        
        $firstNames = [
            'Ahmed', 'Mohammed', 'Ali', 'Omar', 'Hassan', 'Said', 'Abdullah', 'Youssef', 
            'Ibrahim', 'Musa', 'Abdul', 'Khalid', 'Walid', 'Tariq', 'Nasser', 'Fahd',
            'Sultan', 'Marwan', 'Rashid', 'Hamza', 'Bilal', 'Zaid', 'Yasin', 'Hussein',
            'Mustafa', 'Amin', 'Jamal', 'Karim', 'Samir', 'Wael', 'Mazen', 'Rami'
        ];
        
        $lastNames = [
            'Al-Mansour', 'Al-Hassani', 'Al-Saud', 'Al-Qahtani', 'Al-Otaibi', 'Al-Shammari',
            'Al-Dossary', 'Al-Harbi', 'Al-Ghamdi', 'Al-Mutairi', 'Al-Rashid', 'Al-Ahmad',
            'Al-Mohammed', 'Al-Ali', 'Al-Khalifa', 'Al-Mansour', 'Al-Saeed', 'Al-Marwan',
            'Al-Zahran', 'Al-Asiri', 'Al-Bakr', 'Al-Fahad', 'Al-Jasser', 'Al-Majed',
            'Al-Nasser', 'Al-Qahtani', 'Al-Rajhi', 'Al-Sharif', 'Al-Tamimi', 'Al-Yami'
        ];
        
        $this->command->info("Seeding {$totalRecords} Cost Study records...");
        
        for ($batch = 0; $batch < $totalRecords / $batchSize; $batch++) {
            $records = [];
            
            for ($i = 0; $i < $batchSize; $i++) {
                $firstName = $firstNames[array_rand($firstNames)];
                $lastName = $lastNames[array_rand($lastNames)];
                $fullName = $firstName . ' ' . $lastName;
                
                // Generate mobile number in Saudi format
                $mobileNumber = '05' . rand(10000000, 99999999);
                
                $records[] = [
                    'full_name' => $fullName,
                    'mobile_number' => $mobileNumber,
                    'created_at' => now()->subDays(rand(0, 365))->format('Y-m-d H:i:s'),
                    'updated_at' => now()->format('Y-m-d H:i:s'),
                ];
            }
            
            // Insert batch
            DB::table('cost_studies')->insert($records);
            
            $this->command->info("Batch " . ($batch + 1) . " of " . ($totalRecords / $batchSize) . " completed.");
        }
        
        $this->command->info("Successfully seeded {$totalRecords} Cost Study records!");
    }
}
