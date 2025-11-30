<?php

namespace App\Filament\Resources\Works;

use App\Filament\Resources\Works\Pages\CreateWork;
use App\Filament\Resources\Works\Pages\EditWork;
use App\Filament\Resources\Works\Pages\ListWorks;
use App\Filament\Resources\Works\Pages\ViewWork;
use App\Filament\Resources\Works\RelationManagers\FaqsRelationManager;
use App\Filament\Resources\Works\RelationManagers\ResidenciesRelationManager;
use App\Filament\Resources\Works\Schemas\WorkForm;
use App\Filament\Resources\Works\Schemas\WorkInfolist;
use App\Filament\Resources\Works\Tables\WorksTable;
use App\Models\Work;
use BackedEnum;
use Filament\Pages\Enums\SubNavigationPosition;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class WorkResource extends Resource
{
    protected static ?string $model = Work::class;
    protected static ?string $recordTitleAttribute = 'name';
    protected static ?SubNavigationPosition $subNavigationPosition = SubNavigationPosition::End;
    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    public static function form(Schema $schema): Schema
    {
        return WorkForm::configure($schema);
    }

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()->withoutGlobalScopes();
    }


    public static function infolist(Schema $schema): Schema
    {
        return WorkInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return WorksTable::configure($table);
    }

    public static function getPages(): array
    {
        return [
            'index' => ListWorks::route('/'),
            'create' => CreateWork::route('/create'),
            'view' => ViewWork::route('/{record}'),
            'edit' => EditWork::route('/{record}/edit'),
        ];
    }

    public static function getRelations(): array
    {
        return [
            FaqsRelationManager::class,
            ResidenciesRelationManager::class,
        ];
    }

    public static function getRecordSubNavigation(\Filament\Resources\Pages\Page $page): array
    {
        return $page->generateNavigationItems([
            Pages\EditWork::class,
            Resources\Faqs\Pages\ListFaqs::class,
            Resources\Residencies\Pages\ListResidencies::class,
        ]);
    }
}
