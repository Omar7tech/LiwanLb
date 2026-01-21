<?php

namespace App\Filament\Resources\Works\Pages;

use App\Filament\Resources\Works\WorkResource;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Repeater;
use Filament\Resources\Pages\EditRecord;
use BackedEnum;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class EditWorkProcessSteps extends EditRecord
{
    protected static string $resource = WorkResource::class;
    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-cog-6-tooth';

    protected static ?string $pluralModelLabel = 'Work Process Steps';
    protected static ?string $modelLabel = 'Work Process Step';

    public static function getNavigationLabel(): string
    {
        return 'Process Steps';
    }

    public function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Process Title')
                    ->description('Main heading above the process steps on the work page.')
                    ->schema([
                        Textarea::make('process_title')
                            ->label('Process Title')
                            ->rows(2)
                            ->helperText('Main heading above the process steps on the work page.')
                            ->columnSpanFull(),
                    ])
                    ->columnSpanFull(),

                Section::make('Process Steps')
                    ->description('Define the step-by-step process for this work category.')
                    ->schema([
                        Repeater::make('process_steps')
                            ->label('Process Steps')
                            ->schema([
                                TextInput::make('title')
                                    ->label('Step Title')
                                    ->required()
                                    ->maxLength(255),
                                Textarea::make('description')
                                    ->label('Step Description')
                                    ->required()
                                    ->rows(3),
                            ])
                            ->collapsible()
                            ->defaultItems(0)
                            ->columnSpanFull(),
                    ])
                    ->columnSpanFull(),
            ]);
    }
}
