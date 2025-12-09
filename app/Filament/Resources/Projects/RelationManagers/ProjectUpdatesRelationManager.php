<?php

namespace App\Filament\Resources\Projects\RelationManagers;

use App\Filament\Resources\Projects\Resources\ProjectUpdates\ProjectUpdateResource;
use Filament\Actions\CreateAction;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables\Table;

class ProjectUpdatesRelationManager extends RelationManager
{
    protected static string $relationship = 'projectUpdates';

    protected static ?string $relatedResource = ProjectUpdateResource::class;

    public function table(Table $table): Table
    {
        return $table
            ->headerActions([
                CreateAction::make(),
            ]);
    }
}
