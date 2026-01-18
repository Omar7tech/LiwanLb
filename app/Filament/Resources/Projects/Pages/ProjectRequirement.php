<?php

namespace App\Filament\Resources\Projects\Pages;

use App\Filament\Resources\Projects\ProjectResource;
use Filament\Resources\Pages\Concerns\InteractsWithRecord;
use Filament\Resources\Pages\Page;
use BackedEnum;
class ProjectRequirement extends Page
{
    use InteractsWithRecord;

    protected static string $resource = ProjectResource::class;
protected static string | BackedEnum | null $navigationIcon = 'heroicon-o-document-text';
    protected string $view = 'filament.resources.projects.pages.project-requirement';

    public function mount(int|string $record): void
    {
        $this->record = $this->resolveRecord($record);
    }
}
