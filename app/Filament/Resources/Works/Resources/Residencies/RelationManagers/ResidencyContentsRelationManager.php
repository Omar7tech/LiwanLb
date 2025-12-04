<?php

namespace App\Filament\Resources\Works\Resources\Residencies\RelationManagers;

use App\Filament\Resources\Works\Resources\Residencies\Resources\ResidencyContents\ResidencyContentResource;
use App\Filament\Resources\Works\Resources\Residencies\Resources\ResidencyContents\Tables\ResidencyContentsTable;
use Filament\Actions\CreateAction;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables\Table;

class ResidencyContentsRelationManager extends RelationManager
{
    protected static string $relationship = 'residencyContents';

    protected static ?string $relatedResource = ResidencyContentResource::class;

    public function table(Table $table): Table
    {
        return ResidencyContentsTable::configure($table)
            ->modifyQueryUsing(fn ($query) => $query->withoutGlobalScopes())
            ->headerActions([
                CreateAction::make(),
            ]);
    }
}
