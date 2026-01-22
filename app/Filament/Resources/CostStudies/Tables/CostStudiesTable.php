<?php

namespace App\Filament\Resources\CostStudies\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use App\Filament\Actions\ExportCostStudyCsvAction;
use App\Filament\Actions\ExportCostStudyPdfAction;
use Filament\Support\Enums\TextSize;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use Filament\Tables\Columns\TextColumn;

class CostStudiesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->defaultSort('created_at', 'desc')
            ->columns([
                TextColumn::make('full_name')
                    ->label('Full Name')
                    ->searchable()
                    ->size(TextSize::Large)
                    ->sortable(),
                TextColumn::make('mobile_number')
                    ->label('Mobile Number')
                    ->searchable()
                    ->copyable()
                    ->copyMessage('Mobile number copied')
                    ->copyMessageDuration(1500)
                    ->size(TextSize::Large)
                    ->icon(Heroicon::Phone)
                    ->sortable(),
                TextColumn::make('created_at')
                    ->label('Submitted At')
                    ->isoDateTime(timezone:'Asia/Beirut')
                    ->icon(Heroicon::Clock)
                    ->sortable()
                    
            ])
            ->filters([
                //
            ])
            ->recordActions([
                DeleteAction::make()
            ])
            ->toolbarActions([
                ExportCostStudyCsvAction::make(),
                ExportCostStudyPdfAction::make(),
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
