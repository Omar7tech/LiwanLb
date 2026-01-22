<?php

namespace App\Filament\Actions;

use App\Models\CostStudy;
use Filament\Actions\Action;
use Filament\Notifications\Notification;
use Illuminate\Support\Collection;

class ExportCostStudyCsvAction extends Action
{
    public static function make(?string $name = 'export_csv'): static
    {
        return parent::make($name)
            ->label('Export CSV')
            ->icon('heroicon-o-document-arrow-down')
            ->accessSelectedRecords()
            ->action(function (Collection $records) {
                // If no records selected, get all records
                if ($records->isEmpty()) {
                    $records = CostStudy::all();
                }
                
                $filename = 'cost_studies_' . date('Y-m-d_H-i-s') . '.csv';
                
                $headers = [
                    'Content-Type' => 'text/csv',
                    'Content-Disposition' => "attachment; filename=\"{$filename}\"",
                ];
                
                $callback = function () use ($records) {
                    $file = fopen('php://output', 'w');
                    
                    // CSV Header
                    fputcsv($file, ['ID', 'Full Name', 'Mobile Number', 'Submitted At']);
                    
                    // CSV Data
                    $records->each(function ($record) use ($file) {
                        fputcsv($file, [
                            $record->id,
                            $record->full_name,
                            $record->mobile_number,
                            $record->created_at->format('Y-m-d H:i:s'),
                        ]);
                    });
                    
                    fclose($file);
                };
                
                return response()->stream($callback, 200, $headers);
            })
            ->deselectRecordsAfterCompletion()
            ->successNotificationTitle('Cost studies exported to CSV successfully');
    }
}
