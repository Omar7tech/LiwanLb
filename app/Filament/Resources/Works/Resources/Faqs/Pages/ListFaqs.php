<?php

namespace App\Filament\Resources\Works\Resources\Faqs\Pages;

use App\Filament\Resources\Works\Resources\Faqs\FaqResource;
use BackedEnum;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListFaqs extends ListRecords
{
    protected static string $resource = FaqResource::class;
    protected static ?string $title = "Faqs";

    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-question-mark-circle';

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }

    protected function getHeaderWidgets(): array
    {
        return [
            \App\Filament\Resources\Works\Resources\Faqs\Widgets\FaqStats::class,
        ];
    }
}
