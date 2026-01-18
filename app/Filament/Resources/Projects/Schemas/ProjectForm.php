<?php

namespace App\Filament\Resources\Projects\Schemas;

use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\SpatieMediaLibraryFileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Auth;

class ProjectForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([

                Section::make('Project Details')
                    ->description('Basic information about the project.')
                    ->schema([
                        TextInput::make('name')
                            ->label('Project name')
                            ->placeholder('Liwan Tower')
                            ->required(),

                        DatePicker::make('start_date')
                            ->label('Start date')
                            ->required(),

                        Select::make('status')
                            ->label('Status')
                            ->options([
                                'active' => 'Active',
                                'completed' => 'Completed',
                                'on_hold' => 'On Hold',
                                'pending' => 'Pending',
                            ])
                            ->native(false)
                            ->default('pending')
                            ->required()
                            ->helperText('Select the current status of this project.'),

                        TextInput::make('location')
                            ->label('Location')
                            ->placeholder('Beirut, Lebanon')
                            ->required(),
                    ])
                    ->columns(2)
                    ->columnSpanFull(),

                // Client & foremen assignment
                Section::make('Client & Foremen')
                    ->description('Assign the client and optional foremen to this project.')
                    ->schema([
                        Select::make('client_id')
                            ->label('Client')
                            ->relationship(
                                name: 'client',
                                titleAttribute: 'name',
                                modifyQueryUsing: fn(Builder $query) => $query->role('client'),
                            )
                            ->searchable()
                            ->preload()
                            ->required()
                            ->disabled(fn() => !Auth::user()?->hasRole(['foremen', 'super_admin']))
                            ->helperText('Required. Only users with the client role are listed.'),

                        Select::make('foremen')
                            ->label('Foremen')
                            ->relationship(
                                name: 'foremen',
                                titleAttribute: 'name',
                                modifyQueryUsing: fn(Builder $query) => $query->role('foreman'),
                            )
                            ->multiple()
                            ->preload()
                            ->disabled(fn() => !Auth::user()?->hasRole(['foremen', 'super_admin']))
                            ->searchable()
                            ->default(null)
                            ->helperText('Optional: assign one or more foremen to this project.'),
                    ])
                    ->columns(2)
                    ->columnSpanFull(),

                // Media section
                Section::make('Project Media')
                    ->description('Upload images related to this project.')
                    ->schema([
                        SpatieMediaLibraryFileUpload::make('image')
                            ->label('Project images')
                            ->disk('public')
                            ->visibility('public')
                            ->directory('projects')
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
                            ->helperText('Upload image (max 2MB).')
                            ->columnSpanFull(),
                    ])
                    ->columnSpanFull(),


                Section::make('Description & Notes')
                    ->description('Add an overview or any important notes about this project.')
                    ->schema([
                        Textarea::make('description')
                            ->label('Description')
                            ->placeholder('Short overview, scope, or any relevant notes...')
                            ->default(null)
                            ->columnSpanFull(),
                    ])
                    ->columnSpanFull(),



                Section::make('Reqirments notes for the client')
                    ->schema([
                        Repeater::make('project_notes')
                            ->schema([
                                RichEditor::make('content')->required(),
                            ])
                            ->columnSpanFull(),
                    ])
                    ->columnSpanFull(),

            ]);
    }
}
