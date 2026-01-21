<?php

namespace App\Filament\Resources\Projects\Schemas;


use Filament\Infolists\Components\SpatieMediaLibraryImageEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class ProjectInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Overview')
                    ->schema([
                        TextEntry::make('name')
                            ->label('Project name'),

                        SpatieMediaLibraryImageEntry::make('image')
                            ->label('Project image')
                            ->placeholder('No image')
                            ->conversion('webp')
                            ->collection('images'),

                        TextEntry::make('description')
                            ->label('Description')
                            ->placeholder('-')
                            ->columnSpanFull(),

                        TextEntry::make('payment_link')
                            ->label('Payment Link')
                            ->url(fn ($record) => $record->payment_link)
                            ->openUrlInNewTab()
                            ->placeholder('No payment link')
                            ->columnSpanFull(),
                    ])
                    ->columnSpanFull(),

                Section::make('Details')
                    ->schema([
                        TextEntry::make('start_date')
                            ->label('Start date')
                            ->date(),

                        TextEntry::make('status')
                            ->label('Status'),

                        TextEntry::make('location')
                            ->label('Location'),
                    ])
                    ->columns(3)
                    ->columnSpanFull(),

                Section::make('Relations')
                    ->schema([
                        TextEntry::make('client.name')
                            ->label('Client'),

                        TextEntry::make('foremen.name')
                            ->label('Foremen')
                            ->badge(),
                    ])
                    ->columns(2)
                    ->columnSpanFull(),

                Section::make('Meta')
                    ->schema([
                        TextEntry::make('created_at')
                            ->label('Created at')
                            ->dateTime(),

                        TextEntry::make('updated_at')
                            ->label('Last updated')
                            ->dateTime(),
                    ])
                    ->columns(2)
                    ->columnSpanFull(),
            ]);
    }
}
