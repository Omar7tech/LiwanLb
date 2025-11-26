<?php

namespace App\Filament\Resources\DesignDeliveryStandards\Pages;

use App\Filament\Resources\DesignDeliveryStandards\DesignDeliveryStandardResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListDesignDeliveryStandards extends ListRecords
{
    protected static string $resource = DesignDeliveryStandardResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
