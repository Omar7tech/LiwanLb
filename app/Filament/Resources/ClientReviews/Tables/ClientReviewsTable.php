<?php

namespace App\Filament\Resources\ClientReviews\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables;
use Filament\Tables\Table;

class ClientReviewsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->defaultSort('created_at', 'desc')
            ->columns([
                Tables\Columns\TextColumn::make('client.name')
                    ->sortable(),
                    
                Tables\Columns\TextColumn::make('rating')
                    ->formatStateUsing(fn ($state) => $state . '/5')
                    ->badge()
                    ->color(fn ($state) => match($state) {
                        0 => 'danger',
                        1 => 'danger',
                        2 => 'warning',
                        3 => 'warning',
                        4 => 'secondary',
                        5 => 'success',
                    })
                    ->sortable(),
                    
                Tables\Columns\TextColumn::make('review_notes')
                    ->limit(50)
                    ->wrap(),
                    
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->recordActions([
                DeleteAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
