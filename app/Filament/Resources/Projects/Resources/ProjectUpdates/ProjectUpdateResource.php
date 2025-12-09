<?php

namespace App\Filament\Resources\Projects\Resources\ProjectUpdates;

use App\Filament\Resources\Projects\ProjectResource;
use App\Filament\Resources\Projects\Resources\ProjectUpdates\Pages\CreateProjectUpdate;
use App\Filament\Resources\Projects\Resources\ProjectUpdates\Pages\EditProjectUpdate;
use App\Filament\Resources\Projects\Resources\ProjectUpdates\Pages\ListProjectUpdates;
use App\Filament\Resources\Projects\Resources\ProjectUpdates\Pages\ViewProjectUpdate;
use App\Filament\Resources\Projects\Resources\ProjectUpdates\Schemas\ProjectUpdateForm;
use App\Filament\Resources\Projects\Resources\ProjectUpdates\Schemas\ProjectUpdateInfolist;
use App\Filament\Resources\Projects\Resources\ProjectUpdates\Tables\ProjectUpdatesTable;
use App\Models\ProjectUpdate;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class ProjectUpdateResource extends Resource
{
    protected static ?string $model = ProjectUpdate::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?string $parentResource = ProjectResource::class;

    public static function form(Schema $schema): Schema
    {
        return ProjectUpdateForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return ProjectUpdateInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return ProjectUpdatesTable::configure($table);
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
            'index' => ListProjectUpdates::route('/'),
            'create' => CreateProjectUpdate::route('/create'),
            'view' => ViewProjectUpdate::route('/{record}'),
            'edit' => EditProjectUpdate::route('/{record}/edit'),
        ];
    }
}
