<?php

namespace App\Filament\Resources\Works\Resources\Residencies\Resources\ResidencyContents\Schemas;

use Filament\Schemas\Components\Section;
use Filament\Forms\Components\SpatieMediaLibraryFileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class ResidencyContentForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Content Information')
                    ->description('Add the main content details for this residency section')
                    ->icon('heroicon-o-document-text')
                    ->schema([
                        TextInput::make('title')
                            ->label('Title')
                            ->maxLength(255)
                            ->placeholder('Enter section title')
                            ->helperText('Main heading for this content section'),
                        
                        TextInput::make('subtitle')
                            ->label('Subtitle')
                            ->maxLength(255)
                            ->placeholder('Enter section subtitle')
                            ->helperText('Optional subheading for additional context'),
                        
                        Textarea::make('content')
                            ->label('Content')
                            ->rows(5)
                            ->placeholder('Enter the main content text...')
                            ->helperText('Detailed description or information for this section')
                            ->columnSpanFull(),
                    ])
                    ->columns(2)
                    ->collapsible(),

                Section::make('Media')
                    ->description('Upload images for this content section')
                    ->icon('heroicon-o-photo')
                    ->schema([
                        SpatieMediaLibraryFileUpload::make('image')
                            ->label('Content Image')
                            ->disk('public')
                            ->visibility('public')
                            ->directory('residency-content')
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
                            ->helperText('📸 Upload image (max 2MB). Recommended size: 1200x800px')
                            ->columnSpanFull(),
                    ])
                    ->collapsible(),

                Section::make('Settings')
                    ->description('Configure display and ordering settings')
                    ->icon('heroicon-o-cog-6-tooth')
                    ->schema([
                        TextInput::make('order')
                            ->label('Display Order')
                            ->numeric()
                            ->default(0)
                            ->required()
                            ->minValue(0)
                            ->helperText('Lower numbers appear first'),
                        
                        Toggle::make('active')
                            ->label('Active')
                            ->default(true)
                            ->required()
                            ->helperText('Only active content will be displayed on the website')
                            ->inline(false),
                    ])
                    ->columns(2)
                    ->collapsible(),
            ]);
    }
}
