<?php

namespace App\Filament\Resources\Projects\Resources\ProjectUpdates\Resources\UpdateComments\Pages;

use App\Filament\Resources\Projects\Resources\ProjectUpdates\Resources\UpdateComments\UpdateCommentResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditUpdateComment extends EditRecord
{
    protected static string $resource = UpdateCommentResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
