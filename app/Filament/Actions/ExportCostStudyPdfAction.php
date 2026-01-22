<?php

namespace App\Filament\Actions;

use App\Models\CostStudy;
use Filament\Actions\Action;
use Illuminate\Support\Collection;

class ExportCostStudyPdfAction extends Action
{
    public static function make(?string $name = 'export_pdf'): static
    {
        return parent::make($name)
            ->label('Export Report (Text)')
            ->icon('heroicon-o-document-arrow-down')
            ->accessSelectedRecords()
            ->action(function (Collection $records) {
                // If no records selected, get all records
                if ($records->isEmpty()) {
                    $records = CostStudy::all();
                }
                
                $filename = 'cost_studies_report_' . date('Y-m-d_H-i-s') . '.txt';
                
                $text = self::generateReportText($records);
                
                $headers = [
                    'Content-Type' => 'text/plain',
                    'Content-Disposition' => "attachment; filename=\"{$filename}\"",
                ];
                
                return response()->stream(function () use ($text) {
                    echo $text;
                }, 200, $headers);
            })
            ->deselectRecordsAfterCompletion()
            ->successNotificationTitle('Cost studies report exported successfully');
    }
    
    private static function generateReportText(Collection $records): string
    {
        $text = "COST STUDIES REPORT\n";
        $text .= "Generated on: " . date('Y-m-d H:i:s') . "\n";
        $text .= "Total Records: " . $records->count() . "\n";
        $text .= str_repeat("=", 80) . "\n\n";
        
        // Table header
        $text .= sprintf("%-5s %-20s %-15s %s\n", "ID", "Full Name", "Mobile Number", "Submitted At");
        $text .= str_repeat("-", 80) . "\n";
        
        // Table data
        foreach ($records as $record) {
            $text .= sprintf("%-5d %-20s %-15s %s\n", 
                $record->id,
                $record->full_name,
                $record->mobile_number,
                $record->created_at->format('Y-m-d H:i:s')
            );
        }
        
        $text .= "\n" . str_repeat("=", 80) . "\n";
        $text .= "End of Report\n";
        
        return $text;
    }
}
