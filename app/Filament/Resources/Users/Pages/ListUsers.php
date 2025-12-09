<?php

namespace App\Filament\Resources\Users\Pages;

use App\Filament\Resources\Users\UserResource;
use App\Models\User;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;
use Filament\Schemas\Components\Tabs\Tab;
use Illuminate\Database\Eloquent\Builder;
use Spatie\Permission\Models\Role;

class ListUsers extends ListRecords
{
    protected static string $resource = UserResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }

    public function getTabs(): array
    {
        $tabs = [
            'all' => Tab::make()
                ->badge(
                    User::query()
                        ->withoutGlobalScopes()
                        ->whereDoesntHave('roles', fn ($q) => $q->where('name', 'super_admin'))
                        ->count()
                ),
        ];

        Role::query()
            ->where('name', '!=', 'super_admin')
            ->orderBy('name')
            ->get()
            ->each(function (Role $role) use (&$tabs) {
                $tabs[$role->name] = Tab::make(ucfirst($role->name))
                    ->modifyQueryUsing(fn (Builder $query) =>
                        $query->withoutGlobalScopes()
                            ->whereHas('roles', fn ($q) => $q->where('name', $role->name))
                    )
                    ->badge(
                        User::query()
                            ->withoutGlobalScopes()
                            ->whereHas('roles', fn ($q) => $q->where('name', $role->name))
                            ->count()
                    );
            });

        return $tabs;
    }
}
