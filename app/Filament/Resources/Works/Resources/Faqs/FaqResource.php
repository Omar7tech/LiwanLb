<?php

namespace App\Filament\Resources\Works\Resources\Faqs;

use App\Filament\Resources\Works\Resources\Faqs\Pages\CreateFaq;
use App\Filament\Resources\Works\Resources\Faqs\Pages\EditFaq;
use App\Filament\Resources\Works\Resources\Faqs\Pages\ListFaqs;
use App\Filament\Resources\Works\Resources\Faqs\Pages\ViewFaq;
use App\Filament\Resources\Works\Resources\Faqs\Schemas\FaqForm;
use App\Filament\Resources\Works\Resources\Faqs\Schemas\FaqInfolist;
use App\Filament\Resources\Works\Resources\Faqs\Tables\FaqsTable;
use App\Filament\Resources\Works\WorkResource;
use App\Models\Faq;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class FaqResource extends Resource
{
    protected static ?string $model = Faq::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedQuestionMarkCircle;

    protected static ?string $parentResource = WorkResource::class;

    

    public static function form(Schema $schema): Schema
    {
        return FaqForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return FaqInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return FaqsTable::configure($table);
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
            'index' => ListFaqs::route('/'),
            'create' => CreateFaq::route('/create'),
            'view' => ViewFaq::route('/{record}'),
            'edit' => EditFaq::route('/{record}/edit'),
        ];
    }
}
