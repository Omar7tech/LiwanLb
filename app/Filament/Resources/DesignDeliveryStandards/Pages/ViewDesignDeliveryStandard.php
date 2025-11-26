<?php

namespace App\Filament\Resources\DesignDeliveryStandards\Pages;

use App\Filament\Resources\DesignDeliveryStandards\DesignDeliveryStandardResource;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;

class ViewDesignDeliveryStandard extends ViewRecord
{
    protected static string $resource = DesignDeliveryStandardResource::class;

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),
        ];
    }
}
