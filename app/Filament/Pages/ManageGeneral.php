<?php

namespace App\Filament\Pages;

use App\Settings\GeneralSettings;
use BackedEnum;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Pages\SettingsPage;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use UnitEnum;

class ManageGeneral extends SettingsPage
{
    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedCog6Tooth;

    protected static string $settings = GeneralSettings::class;

    protected static ?string $navigationLabel = 'General Settings';

    protected static ?string $title = 'General Settings';

    protected static UnitEnum|string|null $navigationGroup = 'Settings';

    public function form(Schema $schema): Schema
    {
        return $schema
            ->columns(1)
            ->components([
                Section::make('Website Status')
                    ->description('Control the overall availability of your website')
                    ->schema([
                        Toggle::make('site_active')
                            ->label('Website Active')
                            ->helperText('When disabled, the website will show a maintenance page to visitors')
                            ->default(true)
                            ->inline(false)
                            ->required(),
                    ])
                    ->icon('heroicon-o-globe-alt')
                    ->collapsible(),
            ]);
    }
}
