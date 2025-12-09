<?php

namespace App\Filament\Resources\Projects\Resources\ProjectUpdates\Schemas;

use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class ProjectUpdateInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('name')
                    ->label('Title')
                    ->placeholder('No title provided'),
                TextEntry::make('description')
                    ->placeholder('No description provided')
                    ->columnSpanFull()
                    ->markdown(),
                TextEntry::make('date')
                    ->date(),
                TextEntry::make('updater.name')
                    ->label('Updated By')
                    ->placeholder('System'),
                TextEntry::make('created_at')
                    ->dateTime(),
                TextEntry::make('updated_at')
                    ->dateTime(),
            ]);
    }
}
