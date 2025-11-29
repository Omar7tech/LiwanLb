<?php

namespace App\Filament\Resources\Works\Resources\Residencies\Widgets;

use App\Models\Residency;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class ResidencyStats extends BaseWidget
{
    protected function getStats(): array
    {
        return [
            Stat::make('Total Residencies', Residency::withoutGlobalScopes()->count())
                ->description('All residencies')
                ->descriptionIcon('heroicon-m-home-modern')
                ->color('primary'),
            Stat::make('Active Residencies', Residency::withoutGlobalScopes()->where('active', true)->count())
                ->description('Visible residencies')
                ->descriptionIcon('heroicon-m-check-circle')
                ->color('success'),
            Stat::make('Inactive Residencies', Residency::withoutGlobalScopes()->where('active', false)->count())
                ->description('Hidden residencies')
                ->descriptionIcon('heroicon-m-x-circle')
                ->color('danger'),
        ];
    }
}
