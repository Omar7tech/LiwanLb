<?php

namespace App\Filament\Resources\Blogs\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;

use Filament\Tables\Columns\SpatieMediaLibraryImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Table;


class BlogsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->emptyStateHeading('No blogs yet !')
            ->emptyStateDescription('Create your first blog post to engage your audience.')
            ->columns([
                SpatieMediaLibraryImageColumn::make('image'),
                TextColumn::make('title')
                    ->searchable(),
                TextColumn::make('description')
                    ->searchable()->limit(50),
                ToggleColumn::make('active')
                ,
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
            ->recordActions([
                ViewAction::make(),
                EditAction::make(),
            ])
            ->defaultSort('created_at', 'desc')
            ->defaultSortOptionLabel('Date')
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
    
}
