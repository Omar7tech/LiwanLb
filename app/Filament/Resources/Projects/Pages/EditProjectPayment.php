<?php

namespace App\Filament\Resources\Projects\Pages;

use App\Filament\Resources\Projects\ProjectResource;
use Filament\Forms\Components\TextInput;
use Filament\Resources\Pages\EditRecord;
use BackedEnum;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class EditProjectPayment extends EditRecord
{
    protected static string $resource = ProjectResource::class;
    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-banknotes';

    protected static ?string $pluralModelLabel = 'Project Payments';
    protected static ?string $modelLabel = 'Project Payment';

    public static function getNavigationLabel(): string
    {
        return 'Project Payments';
    }

    public function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Payment Information')
                    ->description('Manage payment links and financial information for this project.')
                    ->schema([
                        TextInput::make('payment_link')
                            ->label('Payment Link')
                            ->url()
                            ->placeholder('https://docs.google.com/spreadsheets/d/...')
                            ->helperText('Excel sheet link for client payments')
                            ->columnSpanFull(),
                    ])
                    ->columnSpanFull()
            ]);
    }
}
