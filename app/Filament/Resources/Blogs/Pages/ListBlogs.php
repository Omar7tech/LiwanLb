<?php

namespace App\Filament\Resources\Blogs\Pages;

use App\Filament\Resources\Blogs\BlogResource;
use App\Models\Blog;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;
use Illuminate\Database\Eloquent\Builder;
use Filament\Schemas\Components\Tabs\Tab;

class ListBlogs extends ListRecords
{
    protected static string $resource = BlogResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }

    public function getTabs(): array
    {
        return [
            'all' => Tab::make()
                ->badge(Blog::query()->withoutGlobalScopes()->count()),
            'active' => Tab::make('Active / Published')

                ->badgeColor('success')
                ->icon('heroicon-o-check-circle')
                ->modifyQueryUsing(fn(Builder $query) => $query->withoutGlobalScopes()->where('active', true))
                ->badge(Blog::query()->where('active', true)->count()),
            'inactive' => Tab::make('Inactive / Draft')
                ->icon('heroicon-o-x-circle')
                ->badgeColor('danger')
                ->modifyQueryUsing(fn(Builder $query) => $query->where('active', false))
                ->badge(Blog::query()->withoutGlobalScopes()->where('active', false)->count()),
        ];
    }
}
