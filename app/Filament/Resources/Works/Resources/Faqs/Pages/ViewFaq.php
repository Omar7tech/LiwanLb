<?php

namespace App\Filament\Resources\Works\Resources\Faqs\Pages;

use App\Filament\Resources\Works\Resources\Faqs\FaqResource;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;

class ViewFaq extends ViewRecord
{
    protected static string $resource = FaqResource::class;

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),
        ];
    }
}
