<?php

namespace App\Filament\Resources\Works\Widgets;

use App\Models\Work;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class WorkStats extends BaseWidget
{
    protected function getStats(): array
    {
        return [
            Stat::make('Total Works', Work::withoutGlobalScopes()->count())
                ->description('All works in database')
                ->descriptionIcon('heroicon-m-rectangle-stack')
                ->color('primary'),
            Stat::make('Active Works', Work::withoutGlobalScopes()->where('active', true)->count())
                ->description('Currently visible works')
                ->descriptionIcon('heroicon-m-check-circle')
                ->color('success'),
            Stat::make('Inactive Works', Work::withoutGlobalScopes()->where('active', false)->count())
                ->description('Hidden works')
                ->descriptionIcon('heroicon-m-x-circle')
                ->color('danger'),
        ];
    }
}
