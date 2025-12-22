<?php

namespace App\Filament\Resources\Projects\Resources\ProjectUpdates\Schemas;

use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\SpatieMediaLibraryFileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Hidden;

use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Illuminate\Support\Facades\Auth;

class ProjectUpdateForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->columns(2)
            ->schema([
                Section::make('Update Details')
                    ->schema([
                        TextInput::make('name')
                            ->maxLength(255)
                            ->columnSpanFull(),
                            
                        Textarea::make('description')
                            ->maxLength(65535)
                            ->columnSpanFull()
                            ->rows(4)
                            ->extraInputAttributes(['rows' => 6])
                            ->nullable(),
                            
                        DatePicker::make('date')
                            ->required()
                            ->default(now())
                            ->displayFormat('M d, Y')
                            ->closeOnDateSelection(),
                            
                        Hidden::make('updated_by')
                            ->default(fn () => Auth::id())
                            ->dehydrated(),
                    ])
                    ->columnSpan(1),
                    
                Section::make('Media')
                    ->schema([
                        SpatieMediaLibraryFileUpload::make('images')
                            ->label('Upload Images')
                            ->disk('public')
                            ->visibility('public')
                            ->directory('project-updates')
                            ->image()
                            ->multiple()
                            ->reorderable()
                            ->panelLayout('grid')
                            ->downloadable()
                            ->openable()
                            ->imageEditor()
                            ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/jpg', 'image/webp'])
                            ->maxParallelUploads(5)
                            ->conversion('webp')
                            ->collection('project_update_images')
                            ->imageEditorAspectRatios([
                                null,
                                '16:9',
                                '4:3',
                                '1:1',
                                '3:4',
                            ])
                            ->previewable()
                            ->maxSize(2048)
                            ->helperText('📸 Upload up to 5 images (max 2MB each)')
                            ->columnSpanFull(),
                    ])
                    ->columnSpan(1),
            ]);
    }
}
