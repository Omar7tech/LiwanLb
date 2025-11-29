<?php

namespace App\Filament\Resources\Works\Resources\Residencies\Pages;

use App\Filament\Resources\Works\Resources\Residencies\ResidencyResource;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;

class ViewResidency extends ViewRecord
{
    protected static string $resource = ResidencyResource::class;

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),
        ];
    }
}
