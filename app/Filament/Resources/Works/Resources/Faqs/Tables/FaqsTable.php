<?php

namespace App\Filament\Resources\Works\Resources\Faqs\Tables;

use Filament\Actions\Action;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Forms\Components\Select;
use Filament\Notifications\Notification;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class FaqsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('question')
                    ->searchable(),
                TextColumn::make('order')
                    ->numeric()
                    ->sortable(),
                IconColumn::make('active')
                    ->boolean(),
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
                Action::make('move')
                    ->label('Move to another Work')
                    ->icon('heroicon-o-arrow-right-circle')
                    ->form(fn (\App\Models\Faq $record) => [
                        Select::make('work_id')
                            ->label('Destination Work')
                            ->relationship('Work', 'name', modifyQueryUsing: fn (Builder $query) => $query->where('id', '!=', $record->work_id))
                            ->required()
                            ->searchable()
                            ->preload(),
                    ])
                    ->action(function (\App\Models\Faq $record, array $data): void {
                        $record->update(['work_id' => $data['work_id']]);
                        Notification::make()
                            ->title('Faq moved successfully')
                            ->success()
                            ->send();
                    }),
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
