<?php

namespace App\Filament\Resources\Works\Resources\Residencies\Resources\ResidencyContents\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\SpatieMediaLibraryImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Table;

class ResidencyContentsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                SpatieMediaLibraryImageColumn::make('image')
                    ->label('Image')
                    ->conversion('webp')
                    ->collection('images')
                    ->circular()
                    ->defaultImageUrl(url('/images/placeholder.png')),
                

                

                
                TextColumn::make('content')
                    ->label('Content')
                    ->html()
                    ->limit(50)
                    ->toggleable(isToggledHiddenByDefault: true)
                    ->wrap(),
                
                TextColumn::make('order')
                    ->label('Order')
                    ->numeric()
                    ->sortable()
                    ->badge()
                    ->color('primary'),
                
                ToggleColumn::make('active')
                    ->label('Active')
                    ->sortable(),
                
                TextColumn::make('residency.name')
                    ->label('Residency')
                    ->searchable()
                    ->sortable()
                    ->toggleable(),
                
                TextColumn::make('created_at')
                    ->label('Created')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                
                TextColumn::make('updated_at')
                    ->label('Updated')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
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
            ])
            ->reorderable('order')
            ->defaultSort('order', 'asc');
    }
}
