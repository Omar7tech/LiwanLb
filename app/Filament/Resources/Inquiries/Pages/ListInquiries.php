<?php

namespace App\Filament\Resources\Inquiries\Pages;

use App\Filament\Resources\Inquiries\InquiryResource;
use App\Models\Inquiry;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;
use Filament\Schemas\Components\Tabs\Tab;
use Illuminate\Database\Eloquent\Builder;

class ListInquiries extends ListRecords
{
    protected static string $resource = InquiryResource::class;

    protected function getHeaderActions(): array
    {
        return [
            //
        ];
    }

    public function getTabs(): array
    {
        return [
            'all' => Tab::make()
                ->badge(Inquiry::query()->count()),
            'client' => Tab::make('Client')
                ->modifyQueryUsing(fn (Builder $query) => $query->where('type', 'client'))
                ->badge(Inquiry::query()->where('type', 'client')->count()),
            'partner' => Tab::make('Partner')
                ->modifyQueryUsing(fn (Builder $query) => $query->where('type', 'partner'))
                ->badge(Inquiry::query()->where('type', 'partner')->count()),
        ];
    }
}
