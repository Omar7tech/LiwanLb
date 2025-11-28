<?php

namespace App\Filament\Resources\Residencies\Pages;

use App\Filament\Resources\Residencies\ResidencyResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ManageRecords;

class ManageResidencies extends ManageRecords
{
    protected static string $resource = ResidencyResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
