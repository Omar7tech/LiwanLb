<?php

namespace App\Filament\Resources\Projects\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\SpatieMediaLibraryImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Table;

class ProjectsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                SpatieMediaLibraryImageColumn::make('image')
                    ->conversion('webp')
                    ->collection('images'),
                TextColumn::make('name')
                    ->searchable(),
                ToggleColumn::make('active'),
                TextColumn::make('start_date')
                    ->date()
                    ->sortable(),
                TextColumn::make('status')
                    ->searchable(),
                TextColumn::make('location')
                    ->searchable(),
                TextColumn::make('client.name')
                    ->label('Client')
                    ->badge()
                    ->sortable(),
                TextColumn::make('foremen.name')
                    ->label('Foremen')
                    ->badge(),
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->reorderable('order')->defaultSort('order', 'asc')
            ->filters([
                //
            ])
            ->recordActions([
                ViewAction::make(),
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
