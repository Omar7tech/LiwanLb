<?php

namespace App\Filament\Resources\DesignDeliveryStandards\Pages;

use App\Filament\Resources\DesignDeliveryStandards\DesignDeliveryStandardResource;
use Filament\Actions\DeleteAction;
use Filament\Actions\ViewAction;
use Filament\Resources\Pages\EditRecord;

class EditDesignDeliveryStandard extends EditRecord
{
    protected static string $resource = DesignDeliveryStandardResource::class;

    protected function getHeaderActions(): array
    {
        return [
            ViewAction::make(),
            DeleteAction::make(),
        ];
    }
}
