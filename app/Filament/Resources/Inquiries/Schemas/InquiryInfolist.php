<?php

namespace App\Filament\Resources\Inquiries\Schemas;

use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class InquiryInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('full_name'),
                TextEntry::make('phone'),
                TextEntry::make('email')
                    ->label('Email address'),
                TextEntry::make('project_type'),
                TextEntry::make('project_location'),
                TextEntry::make('notes'),
                TextEntry::make('type')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'client' => 'primary',
                        'partner' => 'success',
                    }),
                TextEntry::make('ip_address')
                    ->label('IP Address'),
                TextEntry::make('user_agent')
                    ->label('User Agent')
                    ->limit(100),
                TextEntry::make('created_at')
                    ->dateTime(),
                TextEntry::make('updated_at')
                    ->dateTime(),
            ]);
    }
}
