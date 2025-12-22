<?php

namespace App\Filament\Resources\Works\Resources\Residencies\Schemas;

use Filament\Forms\Components\SpatieMediaLibraryFileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class ResidencyForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Media')
                    ->schema([
                        SpatieMediaLibraryFileUpload::make('image')
                            ->label('Upload Images')
                            ->disk('public')
                            ->visibility('public')
                            ->directory('residencies')
                            ->image()
                            ->downloadable()
                            ->openable()
                            ->imageEditor()
                            ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/jpg', 'image/webp'])
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
                    ])->columnSpanFull(),
                Section::make('Details')
                    ->schema([
                        TextInput::make('name')
                            ->required(),
                        Toggle::make('active')
                            ->required(),
                    ])->columnSpanFull(),
            ]);
    }
}
