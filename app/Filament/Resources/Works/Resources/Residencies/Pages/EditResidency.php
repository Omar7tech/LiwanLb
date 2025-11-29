<?php

namespace App\Filament\Resources\Works\Resources\Residencies\Pages;

use App\Filament\Resources\Works\Resources\Residencies\ResidencyResource;
use Filament\Actions\DeleteAction;
use Filament\Actions\ViewAction;
use Filament\Resources\Pages\EditRecord;

class EditResidency extends EditRecord
{
    protected static string $resource = ResidencyResource::class;

    protected function getHeaderActions(): array
    {
        return [
            ViewAction::make(),
            DeleteAction::make(),
        ];
    }
}
