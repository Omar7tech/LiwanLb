<?php

namespace App\Filament\Resources\CostStudies;

use App\Filament\Resources\CostStudies\Pages\CreateCostStudy;
use App\Filament\Resources\CostStudies\Pages\EditCostStudy;
use App\Filament\Resources\CostStudies\Pages\ListCostStudies;
use App\Filament\Resources\CostStudies\Schemas\CostStudyForm;
use App\Filament\Resources\CostStudies\Tables\CostStudiesTable;
use App\Models\CostStudy;
use BackedEnum;
use UnitEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class CostStudyResource extends Resource
{
    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedUserGroup;
    protected static UnitEnum|string|null $navigationGroup = 'Merketing';
    protected static ?string $model = CostStudy::class;


    public static function form(Schema $schema): Schema
    {
        return CostStudyForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return CostStudiesTable::configure($table);
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
            'index' => ListCostStudies::route('/'),
        ];
    }
}
