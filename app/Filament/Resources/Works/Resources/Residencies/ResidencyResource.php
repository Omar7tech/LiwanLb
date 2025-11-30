<?php

namespace App\Filament\Resources\Works\Resources\Residencies;

use App\Filament\Resources\Works\Resources\Residencies\Pages\CreateResidency;
use App\Filament\Resources\Works\Resources\Residencies\Pages\EditResidency;
use App\Filament\Resources\Works\Resources\Residencies\Pages\ListResidencies;
use App\Filament\Resources\Works\Resources\Residencies\Pages\ViewResidency;
use App\Filament\Resources\Works\Resources\Residencies\Schemas\ResidencyForm;
use App\Filament\Resources\Works\Resources\Residencies\Schemas\ResidencyInfolist;
use App\Filament\Resources\Works\Resources\Residencies\Tables\ResidenciesTable;
use App\Filament\Resources\Works\WorkResource;
use App\Models\Residency;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class ResidencyResource extends Resource
{
    protected static ?string $model = Residency::class;
    protected static ?string $recordTitleAttribute = 'name';
    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedHomeModern;

    protected static ?string $parentResource = WorkResource::class;

    public static function form(Schema $schema): Schema
    {
        return ResidencyForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return ResidencyInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return ResidenciesTable::configure($table);
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

    public static function getPages(): array
    {
        return [
            'index' => ListResidencies::route('/'),
            'create' => CreateResidency::route('/create'),
            'view' => ViewResidency::route('/{record}'),
            'edit' => EditResidency::route('/{record}/edit'),
        ];
    }
}
