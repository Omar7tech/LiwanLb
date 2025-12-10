<?php

namespace App\Filament\Resources\Projects\Resources\ProjectUpdates\RelationManagers;

use App\Filament\Resources\Projects\Resources\ProjectUpdates\Resources\UpdateComments\UpdateCommentResource;
use App\Filament\Resources\Projects\Resources\ProjectUpdates\Resources\UpdateComments\Tables\UpdateCommentsTable;
use Filament\Actions\CreateAction;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class CommentsRelationManager extends RelationManager
{
    protected static string $relationship = 'comments';

    protected static ?string $relatedResource = UpdateCommentResource::class;

    public function table(Table $table): Table
    {
        return UpdateCommentsTable::configure($table)
            ->headerActions([
                CreateAction::make(),
            ]);
    }
}
