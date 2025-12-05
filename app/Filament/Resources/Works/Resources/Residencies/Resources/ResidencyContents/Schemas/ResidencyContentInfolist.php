<?php

namespace App\Filament\Resources\Works\Resources\Residencies\Resources\ResidencyContents\Schemas;

use Filament\Infolists\Components\IconEntry;
use Filament\Infolists\Components\SpatieMediaLibraryImageEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class ResidencyContentInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Content Information')
                    ->icon('heroicon-o-document-text')
                    ->schema([

                        

                        
                        TextEntry::make('content')
                            ->label('Content')
                            ->html()
                            ->placeholder('No content set')
                            ->columnSpanFull(),
                    ])
                    ->columns(2)
                    ->collapsible(),

                Section::make('Media')
                    ->icon('heroicon-o-photo')
                    ->schema([
                        SpatieMediaLibraryImageEntry::make('image')
                            ->label('Content Image')
                            ->conversion('webp')
                            ->collection('images')
                            ->columnSpanFull(),
                    ])
                    ->collapsible(),

                Section::make('Relationship')
                    ->icon('heroicon-o-link')
                    ->schema([
                        TextEntry::make('residency.name')
                            ->label('Residency')
                            ->badge()
                            ->color('success'),
                    ])
                    ->collapsible(),

                Section::make('Settings & Metadata')
                    ->icon('heroicon-o-cog-6-tooth')
                    ->schema([
                        TextEntry::make('order')
                            ->label('Display Order')
                            ->numeric()
                            ->badge()
                            ->color('primary'),
                        
                        IconEntry::make('active')
                            ->label('Status')
                            ->boolean()
                            ->trueIcon('heroicon-o-check-circle')
                            ->falseIcon('heroicon-o-x-circle')
                            ->trueColor('success')
                            ->falseColor('danger'),
                        
                        TextEntry::make('created_at')
                            ->label('Created At')
                            ->dateTime()
                            ->since(),
                        
                        TextEntry::make('updated_at')
                            ->label('Updated At')
                            ->dateTime()
                            ->since(),
                    ])
                    ->columns(2)
                    ->collapsible(),
            ]);
    }
}
