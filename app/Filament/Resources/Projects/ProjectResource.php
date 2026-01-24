<?php

namespace App\Filament\Resources\Projects;

use App\Filament\Resources\Projects\Pages\CreateProject;
use App\Filament\Resources\Projects\Pages\EditProject;
use App\Filament\Resources\Projects\Pages\EditProjectPayment;
use App\Filament\Resources\Projects\Pages\EditProjectRequirement;
use App\Filament\Resources\Projects\Pages\ListProjects;
use App\Filament\Resources\Projects\Pages\ViewProject;
use App\Filament\Resources\Projects\RelationManagers\ProjectUpdatesRelationManager;
use App\Filament\Resources\Projects\Schemas\ProjectForm;
use App\Filament\Resources\Projects\Schemas\ProjectInfolist;
use App\Filament\Resources\Projects\Tables\ProjectsTable;
use App\Models\Project;
use BackedEnum;
use Filament\Pages\Enums\SubNavigationPosition;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Auth;

class ProjectResource extends Resource
{

    protected static ?SubNavigationPosition $subNavigationPosition = SubNavigationPosition::Top;
    protected static ?string $model = Project::class;
    protected static ?string $recordTitleAttribute = 'name';

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedDocumentChartBar;

    public static function form(Schema $schema): Schema
    {
        return ProjectForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return ProjectInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return ProjectsTable::configure($table);
    }



    public static function getPages(): array
    {
        return [
            'index' => ListProjects::route('/'),
            'create' => CreateProject::route('/create'),
            'view' => ViewProject::route('/{record}'),
            'edit' => EditProject::route('/{record}/edit'),
            'edit-requirements' => Pages\EditProjectRequirement::route('/{record}/edit/requirements'),
            'edit-payments' => Pages\EditProjectPayment::route('/{record}/edit/payments'),
            'edit-timeline' => Pages\EditProjectTimeline::route('/{record}/edit/timeline')
        ];
    }

    public static function getEloquentQuery(): Builder
    {
        $user = Auth::user();

        return parent::getEloquentQuery()
            ->withoutGlobalScopes()
            ->when($user && $user->roles && in_array('foreman', $user->roles->pluck('name')->toArray()), function (Builder $query) use ($user) {
                // Foremen can only see projects they are assigned to
                $query->whereHas('foremen', function (Builder $foremanQuery) use ($user) {
                    $foremanQuery->where('users.id', $user->id);
                });
            });
    }

    public static function getRecordSubNavigation(\Filament\Resources\Pages\Page $page): array
    {
        return $page->generateNavigationItems([
            Pages\EditProject::class,
            Resources\ProjectUpdates\Pages\ListProjectUpdates::class,
            Pages\EditProjectRequirement::class,
            Pages\EditProjectPayment::class,
            Pages\EditProjectTimeline::class
        ]);
    }




}
