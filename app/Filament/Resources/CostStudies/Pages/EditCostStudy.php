<?php

namespace App\Filament\Resources\CostStudies\Pages;

use App\Filament\Resources\CostStudies\CostStudyResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditCostStudy extends EditRecord
{
    protected static string $resource = CostStudyResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
