<?php

namespace App\Filament\Resources\Projects\Resources\ProjectUpdates\Pages;

use App\Filament\Resources\Projects\Resources\ProjectUpdates\ProjectUpdateResource;
use Filament\Actions\DeleteAction;
use Filament\Actions\ViewAction;
use Filament\Resources\Pages\EditRecord;

class EditProjectUpdate extends EditRecord
{
    protected static string $resource = ProjectUpdateResource::class;

    protected function getHeaderActions(): array
    {
        return [
            ViewAction::make(),
            DeleteAction::make(),
        ];
    }
}
