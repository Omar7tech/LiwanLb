<?php

namespace App\Filament\Resources\Projects\Resources\ProjectUpdates\Resources\UpdateComments;

use App\Filament\Resources\Projects\Resources\ProjectUpdates\ProjectUpdateResource;
use App\Filament\Resources\Projects\Resources\ProjectUpdates\Resources\UpdateComments\Pages\CreateUpdateComment;
use App\Filament\Resources\Projects\Resources\ProjectUpdates\Resources\UpdateComments\Pages\EditUpdateComment;
use App\Filament\Resources\Projects\Resources\ProjectUpdates\Resources\UpdateComments\Schemas\UpdateCommentForm;
use App\Filament\Resources\Projects\Resources\ProjectUpdates\Resources\UpdateComments\Tables\UpdateCommentsTable;
use App\Models\UpdateComment;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class UpdateCommentResource extends Resource
{
    protected static ?string $model = UpdateComment::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?string $parentResource = ProjectUpdateResource::class;

    public static function form(Schema $schema): Schema
    {
        return UpdateCommentForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return UpdateCommentsTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'create' => CreateUpdateComment::route('/create'),
            'edit' => EditUpdateComment::route('/{record}/edit'),
        ];
    }
}
