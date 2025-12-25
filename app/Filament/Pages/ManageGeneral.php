<?php

namespace App\Filament\Pages;

use App\Settings\GeneralSettings;
use BackedEnum;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Components\Section;
use Filament\Pages\SettingsPage;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use UnitEnum;

use BezhanSalleh\FilamentShield\Traits\HasPageShield;

class ManageGeneral extends SettingsPage
{
    use HasPageShield;
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
                Section::make('AI Features')
                    ->description('Control AI-powered functionality in the application')
                    ->schema([
                        Toggle::make('cost_study_ai_enabled')
                            ->label('Cost Study AI')
                            ->helperText('Enable AI functionality for cost study calculations and analysis')
                            ->default(false)
                            ->inline(false)
                            ->required(),
                    ])
                    ->icon('heroicon-o-cpu-chip')
                    ->collapsible(),
                Section::make('Tawk.to Chat')
                    ->description('Configure Tawk.to live chat widget for your website')
                    ->schema([
                        Toggle::make('tawk_active')
                            ->label('Enable Tawk.to Chat')
                            ->helperText('When enabled, the Tawk.to chat widget will be displayed on your website')
                            ->default(false)
                            ->inline(false)
                            ->required(),
                        Textarea::make('tawk_script')
                            ->label('Tawk.to Script')
                            ->helperText('Paste your Tawk.to JavaScript code here')
                            ->rows(6)
                            ->placeholder('<script type="text/javascript">...</script>')
                            ->required(fn ($get) => $get('tawk_active'))
                            ->visible(fn ($get) => $get('tawk_active')),
                    ])
                    ->icon('heroicon-o-chat-bubble-left-right')
                    ->collapsible(),
            ]);
    }
}
