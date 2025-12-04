<?php

namespace App\Filament\Resources\Works\Resources\Residencies\Resources\ResidencyContents\Pages;

use App\Filament\Resources\Works\Resources\Residencies\Resources\ResidencyContents\ResidencyContentResource;
use Filament\Actions\DeleteAction;
use Filament\Actions\ViewAction;
use Filament\Resources\Pages\EditRecord;

class EditResidencyContent extends EditRecord
{
    protected static string $resource = ResidencyContentResource::class;

    protected function getHeaderActions(): array
    {
        return [
            ViewAction::make(),
            DeleteAction::make(),
        ];
    }
}
