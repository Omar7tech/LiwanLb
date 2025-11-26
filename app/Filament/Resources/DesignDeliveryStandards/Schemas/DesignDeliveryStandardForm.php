<?php

namespace App\Filament\Resources\DesignDeliveryStandards\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class DesignDeliveryStandardForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('english_title')->required(),
                Textarea::make('english_description')
                    ->columnSpanFull(),
                TextInput::make('arabic_title')->required(),
                Textarea::make('arabic_description')
                    ->columnSpanFull(),
                Toggle::make('active')
                    ->required(),
            ]);
    }
}
