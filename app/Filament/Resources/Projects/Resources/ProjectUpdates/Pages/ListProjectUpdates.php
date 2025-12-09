<?php

namespace App\Filament\Resources\Projects\Resources\ProjectUpdates\Pages;

use App\Filament\Resources\Projects\Resources\ProjectUpdates\ProjectUpdateResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;
use BackedEnum;
class ListProjectUpdates extends ListRecords
{

    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-clock';

    protected static string $resource = ProjectUpdateResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
