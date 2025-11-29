<?php

namespace App\Filament\Resources\Works\RelationManagers;

use App\Filament\Resources\Works\Resources\Residencies\ResidencyResource;
use App\Filament\Resources\Works\Resources\Residencies\Tables\ResidenciesTable;
use Filament\Actions\CreateAction;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class ResidenciesRelationManager extends RelationManager
{
    protected static string $relationship = 'residencies';

    protected static ?string $relatedResource = ResidencyResource::class;

    public function table(Table $table): Table
    {
        return ResidenciesTable::configure($table)
            ->modifyQueryUsing(fn ($query) => $query->withoutGlobalScopes())
            ->headerActions([
                CreateAction::make(),
            ]);
    }
}
