<?php

namespace App\Filament\Resources\ClientReviews\Schemas;

use Filament\Forms;
use Filament\Schemas\Schema;

class ClientReviewForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Forms\Components\Select::make('client_id')
                    ->relationship('client', 'name')
                    ->required()
                    ->searchable()
                    ->preload(),
                    
                Forms\Components\Select::make('rating')
                    ->label('Rating')
                    ->options([
                        0 => '0 Stars',
                        0.5 => '0.5 Stars',
                        1 => '1 Star',
                        1.5 => '1.5 Stars',
                        2 => '2 Stars',
                        2.5 => '2.5 Stars',
                        3 => '3 Stars',
                        3.5 => '3.5 Stars',
                        4 => '4 Stars',
                        4.5 => '4.5 Stars',
                        5 => '5 Stars',
                    ])
                    ->required(),
                    
                Forms\Components\Textarea::make('review_notes')
                    ->label('Review Notes')
                    ->maxLength(1000),
            ]);
    }
}
