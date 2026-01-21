<?php

namespace App\Filament\Resources\Works\Schemas;


use Filament\Forms\Components\SpatieMediaLibraryFileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class WorkForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Basic Information')
                    ->description('Configure the work category name and display title')
                    ->schema([
                        TextInput::make('name')
                            ->label('Internal Name')
                            ->required()
                            ->maxLength(255)
                            ->helperText('Used for identification (e.g., "Home", "Estate")')
                            ->columnSpan(1),
                        TextInput::make('arabic_name')
                            ->label('Arabic Name')
                            ->required()
                            ->maxLength(255)
                            ->helperText('Arabic name for the work category')
                            ->columnSpan(1),
                        TextInput::make('title')
                            ->label('Display Title')
                            ->maxLength(255)
                            ->helperText('Public-facing title (e.g., "Liwan For Every Home"). Leave empty to use the name.')
                            ->placeholder('Leave empty to use name')
                            ->nullable()
                            ->columnSpan(1),
                        TextInput::make('visual_text')
                            ->label('Overlay Text')
                            ->maxLength(255)
                            ->columnSpanFull(),
                    ])
                    ->columns(2)
                    ->columnSpanFull(),

                Section::make('Media')
                    ->description('Upload representative image for this work category')
                    ->schema([
                        SpatieMediaLibraryFileUpload::make('image')
                            ->label('Category Image')
                            ->disk('public')
                            ->visibility('public')
                            ->directory('works')
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
                            ->helperText('📸 Upload image (max 2MB, will be converted to WebP)')
                            ->columnSpanFull(),
                    ])
                    ->columnSpanFull(),

                Section::make('Settings')
                    ->description('Control visibility and status')
                    ->schema([
                        Toggle::make('active')
                            ->label('Active')
                            ->helperText('Only active work categories will be displayed on the website')
                            ->default(true)
                            ->required(),
                    ])
                    ->columnSpanFull(),
            ]);
    }
}
