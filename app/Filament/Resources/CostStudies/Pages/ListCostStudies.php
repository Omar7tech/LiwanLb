<?php

namespace App\Filament\Resources\CostStudies\Pages;

use App\Filament\Resources\CostStudies\CostStudyResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListCostStudies extends ListRecords
{
    protected static string $resource = CostStudyResource::class;

    protected function getHeaderActions(): array
    {
        return [
            
        ];
    }
}
