<?php

namespace App\Filament\Resources\Works\Resources\Faqs\Widgets;

use App\Models\Faq;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class FaqStats extends BaseWidget
{
    protected function getStats(): array
    {
        return [
            Stat::make('Total FAQs', Faq::withoutGlobalScopes()->count())
                ->description('All FAQs in database')
                ->descriptionIcon('heroicon-m-question-mark-circle')
                ->color('primary'),
            Stat::make('Active FAQs', Faq::withoutGlobalScopes()->where('active', true)->count())
                ->description('Visible FAQs')
                ->descriptionIcon('heroicon-m-check-circle')
                ->color('success'),
            Stat::make('Inactive FAQs', Faq::withoutGlobalScopes()->where('active', false)->count())
                ->description('Hidden FAQs')
                ->descriptionIcon('heroicon-m-x-circle')
                ->color('danger'),
        ];
    }
}
