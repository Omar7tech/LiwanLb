<?php

namespace App\Filament\Resources\DesignDeliveryStandards;

use App\Filament\Resources\DesignDeliveryStandards\Pages\CreateDesignDeliveryStandard;
use App\Filament\Resources\DesignDeliveryStandards\Pages\EditDesignDeliveryStandard;
use App\Filament\Resources\DesignDeliveryStandards\Pages\ListDesignDeliveryStandards;
use App\Filament\Resources\DesignDeliveryStandards\Pages\ViewDesignDeliveryStandard;
use App\Filament\Resources\DesignDeliveryStandards\Schemas\DesignDeliveryStandardForm;
use App\Filament\Resources\DesignDeliveryStandards\Schemas\DesignDeliveryStandardInfolist;
use App\Filament\Resources\DesignDeliveryStandards\Tables\DesignDeliveryStandardsTable;
use App\Models\DesignDeliveryStandard;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use UnitEnum;

class DesignDeliveryStandardResource extends Resource
{
    protected static ?string $model = DesignDeliveryStandard::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedShieldCheck;

    protected static UnitEnum|string|null $navigationGroup = 'Content Management';

    protected static ?string $navigationLabel = 'Features';

    public static function form(Schema $schema): Schema
    {
        return DesignDeliveryStandardForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return DesignDeliveryStandardInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return DesignDeliveryStandardsTable::configure($table);
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
            'index' => ListDesignDeliveryStandards::route('/'),
            'create' => CreateDesignDeliveryStandard::route('/create'),
            'view' => ViewDesignDeliveryStandard::route('/{record}'),
            'edit' => EditDesignDeliveryStandard::route('/{record}/edit'),
        ];
    }
}
