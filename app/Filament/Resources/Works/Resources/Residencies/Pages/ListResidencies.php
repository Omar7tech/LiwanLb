<?php

namespace App\Filament\Resources\Works\Resources\Residencies\Pages;

use App\Filament\Resources\Works\Resources\Residencies\ResidencyResource;
use BackedEnum;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListResidencies extends ListRecords
{
    protected static string $resource = ResidencyResource::class;

    protected static ?string $title = "Residencies";

    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-home-modern';

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }

    protected function getHeaderWidgets(): array
    {
        return [
            \App\Filament\Resources\Works\Resources\Residencies\Widgets\ResidencyStats::class,
        ];
    }
}
