<?php

namespace App\Filament\Resources\Works\Resources\Residencies\Resources\ResidencyContents\Pages;

use App\Filament\Resources\Works\Resources\Residencies\Resources\ResidencyContents\ResidencyContentResource;
use BackedEnum;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListResidencyContents extends ListRecords
{
    protected static string $resource = ResidencyContentResource::class;

    protected static ?string $title = "Residency Contents";

    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-rectangle-stack';

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
