<?php

namespace App\Filament\Resources\CostStudies\Schemas;

use Filament\Schemas\Schema;
use Filament\Forms\Components\TextInput;

class CostStudyForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('full_name')
                    ->label('Full Name')
                    ->required()
                    ->minLength(4)
                    ->maxLength(20)
                    ->regex('/^[a-zA-Z\s\p{Arabic}]+$/u'),
                TextInput::make('mobile_number')
                    ->label('Mobile Number')
                    ->required()
                    ->numeric()
                    ->minLength(8)
                    ->maxLength(20)
                    ->regex('/^[0-9]+$/'),
            ]);
    }
}
