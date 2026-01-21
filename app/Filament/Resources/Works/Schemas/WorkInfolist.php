<?php

namespace App\Filament\Resources\Works\Schemas;

use Filament\Infolists\Components\IconEntry;
use Filament\Infolists\Components\SpatieMediaLibraryImageEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class WorkInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Media')
                    ->schema([
                        SpatieMediaLibraryImageEntry::make('image')
                            ->hiddenLabel()
                            ->conversion('webp')
                            ->collection('images')
                            ->columnSpanFull(),
                    ])->columnSpanFull(),

                Section::make('Basic Information')
                    ->schema([
                        TextEntry::make('name')
                            ->label('Internal Name')
                            ->weight('bold')
                            ->size('lg'),
                        TextEntry::make('arabic_name')
                            ->label('Arabic Name')
                            ->weight('bold')
                            ->size('lg')
                            ->color('success'),
                        TextEntry::make('title')
                            ->label('Display Title')
                            ->placeholder('Uses name')
                            ->weight('bold')
                            ->size('lg')
                            ->color('primary'),
                        TextEntry::make('visual_text')
                            ->label('Overlay Text')
                            ->columnSpanFull(),
                        TextEntry::make('slug')
                            ->color('gray')
                            ->icon('heroicon-o-link'),
                    ])
                    ->columns(2)
                    ->columnSpanFull(),

                Section::make('Status & Timestamps')
                    ->schema([
                        IconEntry::make('active')
                            ->boolean()
                            ->label('Active Status'),
                        TextEntry::make('created_at')
                            ->dateTime()
                            ->color('gray'),
                        TextEntry::make('updated_at')
                            ->dateTime()
                            ->color('gray'),
                    ])
                    ->columns(3)
                    ->columnSpanFull(),
            ]);
    }
}
