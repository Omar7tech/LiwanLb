<?php

namespace App\Filament\Resources\Works\Resources\Residencies\Resources\ResidencyContents\Pages;

use App\Filament\Resources\Works\Resources\Residencies\Resources\ResidencyContents\ResidencyContentResource;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;

class ViewResidencyContent extends ViewRecord
{
    protected static string $resource = ResidencyContentResource::class;

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),
        ];
    }
}
