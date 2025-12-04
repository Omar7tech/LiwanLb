<?php

namespace App\Filament\Resources\Works\Resources\Residencies\Resources\ResidencyContents;

use App\Filament\Resources\Works\Resources\Residencies\ResidencyResource;
use App\Filament\Resources\Works\Resources\Residencies\Resources\ResidencyContents\Pages;
use App\Filament\Resources\Works\Resources\Residencies\Resources\ResidencyContents\Schemas\ResidencyContentForm;
use App\Filament\Resources\Works\Resources\Residencies\Resources\ResidencyContents\Schemas\ResidencyContentInfolist;
use App\Filament\Resources\Works\Resources\Residencies\Resources\ResidencyContents\Tables\ResidencyContentsTable;
use App\Models\ResidencyContent;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class ResidencyContentResource extends Resource
{
    protected static ?string $model = ResidencyContent::class;

    protected static ?string $recordTitleAttribute = 'title';

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?string $parentResource = ResidencyResource::class;

    public static function form(Schema $schema): Schema
    {
        return ResidencyContentForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return ResidencyContentInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return ResidencyContentsTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()->withoutGlobalScopes();
    }

    public static function getParentRelationshipName(): ?string
    {
        return 'residencyContents';
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListResidencyContents::route('/'),
            'create' => Pages\CreateResidencyContent::route('/create'),
            'view' => Pages\ViewResidencyContent::route('/{record}'),
            'edit' => Pages\EditResidencyContent::route('/{record}/edit'),
        ];
    }
}
