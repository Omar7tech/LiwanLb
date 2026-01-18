<?php

namespace App\Filament\Resources\Projects\Pages;

use App\Filament\Resources\Projects\ProjectResource;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\RichEditor;
use Filament\Resources\Pages\EditRecord;
use BackedEnum;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
class EditProjectRequirement extends EditRecord
{

    protected static string $resource = ProjectResource::class;
    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-document-text';

    protected static ?string $pluralModelLabel = 'Project Requirements';
    protected static ?string $modelLabel = 'Project Requirement';
    public static function getNavigationLabel(): string
    {
        return 'Project Requirements';
    }


    public function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Reqirments notes for the client')
                    ->schema([
                        Repeater::make('project_notes')
                            ->schema([
                                RichEditor::make('content')
                                    ->toolbarButtons([
                                        ['bold', 'italic', 'underline', 'strike' ,'link'],
                                        ['h2', 'h3'],
                                        ['bulletList', 'orderedList'],
                                        
                                    ])->required(),
                            ])
                            ->columnSpanFull(),
                    ])
                    ->columnSpanFull()
            ]);

    }


}
