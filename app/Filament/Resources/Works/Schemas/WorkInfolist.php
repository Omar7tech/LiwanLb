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
                Section::make('Details')
                    ->schema([
                        TextEntry::make('name')
                            ->weight('bold')
                            ->size('lg'),
                        TextEntry::make('slug')
                            ->color('gray'),
                        IconEntry::make('active')
                            ->boolean(),
                        TextEntry::make('created_at')
                            ->dateTime()
                            ->color('gray'),
                        TextEntry::make('updated_at')
                            ->dateTime()
                            ->color('gray'),
                    ])->columnSpanFull(),
            ]);
    }
}
