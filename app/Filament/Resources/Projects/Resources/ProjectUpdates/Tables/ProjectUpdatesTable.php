<?php

namespace App\Filament\Resources\Projects\Resources\ProjectUpdates\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class ProjectUpdatesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')
                    ->label('Title')
                    ->searchable()
                    ->placeholder('No title')
                    ->wrap(),
                TextColumn::make('description')
                    ->searchable()
                    ->limit(50)
                    ->placeholder('No description')
                    ->wrap(),
                TextColumn::make('date')
                    ->date()
                    ->sortable(),
                TextColumn::make('updater.name')
                    ->label('Updated By')
                    ->placeholder('System')
                    ->sortable(),
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->defaultSort('date', 'desc')
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
