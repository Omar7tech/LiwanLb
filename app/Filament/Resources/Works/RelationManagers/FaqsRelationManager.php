<?php

namespace App\Filament\Resources\Works\RelationManagers;

use App\Filament\Resources\Works\Resources\Faqs\FaqResource;
use App\Filament\Resources\Works\Resources\Faqs\Tables\FaqsTable;
use Filament\Actions\CreateAction;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class FaqsRelationManager extends RelationManager
{
    protected static string $relationship = 'faqs';

    protected static ?string $relatedResource = FaqResource::class;

    public function table(Table $table): Table
    {
        return FaqsTable::configure($table)
            ->modifyQueryUsing(fn ($query) => $query->withoutGlobalScopes())
            ->headerActions([
                CreateAction::make(),
            ]);
    }
}
