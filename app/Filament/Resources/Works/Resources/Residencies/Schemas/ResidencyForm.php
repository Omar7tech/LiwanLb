<?php

namespace App\Filament\Resources\Works\Resources\Residencies\Schemas;

use Filament\Forms\Components\SpatieMediaLibraryFileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class ResidencyForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                SpatieMediaLibraryFileUpload::make('image')
                    ->label('Upload Images')
                    ->disk('public')
                    ->visibility('public')
                    ->directory('blogs')
                    ->image()
                    ->downloadable()
                    ->openable()
                    ->imageEditor()
                    ->conversion('webp')
                    ->collection('images')
                    ->imageEditorAspectRatios([
                        null,
                        '16:9',
                        '4:3',
                        '1:1',
                        '3:4',
                    ])
                    ->maxSize(2048)
                    ->helperText('📸 Upload image (max 2MB)')
                    ->columnSpanFull()
                    ->collection('images'),
                TextInput::make('name')
                    ->required(),
                Toggle::make('active')
                    ->required(),
            ]);
    }
}
