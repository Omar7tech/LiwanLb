<?php

namespace App\Filament\Resources\Projects\Pages;

use App\Filament\Resources\Projects\ProjectResource;
use Filament\Actions\Action;
use Filament\Actions\DeleteAction;
use Filament\Actions\ViewAction;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Repeater\TableColumn;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Resources\Pages\EditRecord;
use BackedEnum;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Support\Enums\Alignment;
class EditProjectTimeline extends EditRecord
{
    protected static string $resource = ProjectResource::class;
    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-numbered-list';
    protected static ?string $pluralModelLabel = 'Project Timeline';
    protected static ?string $modelLabel = 'Project Timeline';

    public static function getNavigationLabel(): string
    {
        return 'Project Timeline';
    }

    public function form(Schema $schema): Schema
    {
        return $schema
            ->components([

                Repeater::make('timeline')
                    ->deleteAction(
                        fn(Action $action) => $action->requiresConfirmation(),
                    )
                    ->label('Timeline Items')
                    ->compact()
                    ->cloneable()
                    ->columns(3)
                    ->reorderableWithButtons()
                    ->schema([
                        TextInput::make('title')
                            ->required()
                            ->maxLength(50),

                        DatePicker::make('date')
                            ->nullable()
                            ->native(false),

                        Toggle::make('is_active')
                            ->label('Completed')

                            ->default(false),

                        Repeater::make('children')
                            ->deleteAction(
                                fn(Action $action) => $action->requiresConfirmation(),
                            )
                            ->label('Sub-items')
                            ->defaultItems(0)

                            ->cloneable()
                            ->reorderableWithButtons()
                            ->table([
                                TableColumn::make('Title')->markAsRequired(),
                                TableColumn::make('Date'),
                                TableColumn::make('Completed')

                            ])
                            ->compact()
                            ->schema([
                                TextInput::make('title')
                                    ->required()
                                    ->maxLength(255),

                                DatePicker::make('date')
                                    ->nullable()
                                    ->native(false),

                                Toggle::make('is_active')

                                    ->default(false),
                            ])->columns(3)
                            ->addActionAlignment(Alignment::Start)
                            ->columnSpanFull()
                            ->collapsible()
                            ->itemLabel(fn(array $state): ?string => $state['title'] ?? null),
                    ])
                    ->collapsible()
                    ->itemLabel(
                        fn(array $state): ?string =>
                        ($state['title'] ?? 'Untitled') . ($state['is_active'] ? ' ✅' : ' ❌')
                    )
                    ->columnSpanFull(),
            ]);

    }

}
