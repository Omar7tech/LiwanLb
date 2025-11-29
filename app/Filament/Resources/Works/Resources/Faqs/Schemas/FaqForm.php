<?php

namespace App\Filament\Resources\Works\Resources\Faqs\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class FaqForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->columns(2)
            ->components([
                Section::make('FAQ Content')
                    ->description('Enter the frequently asked question and its answer')
                    ->schema([
                        TextInput::make('question')
                            ->copyable(copyMessage: 'Copied!', copyMessageDuration: 1500)
                            ->required()
                            ->maxLength(500)
                            ->columnSpanFull()
                            ->placeholder('What is your question?'),

                        Textarea::make('answer')
                            ->required()
                            ->rows(6)
                            ->columnSpanFull()
                            ->placeholder('Provide a detailed answer...'),
                    ])
                    ->columnSpan(2),
            ]);
    }
}
