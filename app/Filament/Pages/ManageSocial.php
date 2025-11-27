<?php

namespace App\Filament\Pages;

use App\Settings\SocialSettings;
use BackedEnum;

use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Pages\SettingsPage;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Tabs;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;

class ManageSocial extends SettingsPage
{
    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedCog6Tooth;

    protected static string $settings = SocialSettings::class;

    protected static ?string $navigationLabel = 'Social Settings';

    protected static ?string $title = 'Social Media & Contact Settings';

    public function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Tabs::make('Social Settings')
                    ->tabs([
                        Tabs\Tab::make('Social Media')
                            ->icon('heroicon-o-share')
                            ->schema([
                                Section::make('Facebook')
                                    ->description('Configure your Facebook presence')
                                    ->icon('heroicon-o-globe-alt')
                                    ->schema([
                                        TextInput::make('facebook_url')
                                            ->label('Facebook URL')
                                            ->url()
                                            ->placeholder('https://www.facebook.com/yourpage')
                                            ->prefixIcon('heroicon-o-link')
                                            ->columnSpanFull(),
                                        Toggle::make('facebook_active')
                                            ->label('Show Facebook Link')
                                            ->inline(false)
                                            ->helperText('Display Facebook link on your website'),
                                    ])
                                    ->columns(2)
                                    ->collapsible(),

                                Section::make('Twitter')
                                    ->description('Configure your Twitter/X presence')
                                    ->icon('heroicon-o-globe-alt')
                                    ->schema([
                                        TextInput::make('twitter_url')
                                            ->label('Twitter/X URL')
                                            ->url()
                                            ->placeholder('https://twitter.com/yourhandle')
                                            ->prefixIcon('heroicon-o-link')
                                            ->columnSpanFull(),
                                        Toggle::make('twitter_active')
                                            ->label('Show Twitter Link')
                                            ->inline(false)
                                            ->helperText('Display Twitter link on your website'),
                                    ])
                                    ->columns(2)
                                    ->collapsible(),

                                Section::make('Instagram')
                                    ->description('Configure your Instagram presence')
                                    ->icon('heroicon-o-globe-alt')
                                    ->schema([
                                        TextInput::make('instagram_url')
                                            ->label('Instagram URL')
                                            ->url()
                                            ->placeholder('https://www.instagram.com/yourhandle')
                                            ->prefixIcon('heroicon-o-link')
                                            ->columnSpanFull(),
                                        Toggle::make('instagram_active')
                                            ->label('Show Instagram Link')
                                            ->inline(false)
                                            ->helperText('Display Instagram link on your website'),
                                    ])
                                    ->columns(2)
                                    ->collapsible(),

                                Section::make('YouTube')
                                    ->description('Configure your YouTube presence')
                                    ->icon('heroicon-o-globe-alt')
                                    ->schema([
                                        TextInput::make('youtube_url')
                                            ->label('YouTube URL')
                                            ->url()
                                            ->placeholder('https://www.youtube.com/@yourchannel')
                                            ->prefixIcon('heroicon-o-link')
                                            ->columnSpanFull(),
                                        Toggle::make('youtube_active')
                                            ->label('Show YouTube Link')
                                            ->inline(false)
                                            ->helperText('Display YouTube link on your website'),
                                    ])
                                    ->columns(2)
                                    ->collapsible(),
                            ]),

                        Tabs\Tab::make('Contact Information')
                            ->icon('heroicon-o-phone')
                            ->schema([
                                Section::make('Phone & WhatsApp')
                                    ->description('Configure phone contact methods')
                                    ->icon('heroicon-o-device-phone-mobile')
                                    ->schema([
                                        TextInput::make('phone_number')
                                            ->label('Phone Number')
                                            ->tel()
                                            ->placeholder('+961 70 123 456')
                                            ->prefixIcon('heroicon-o-phone')
                                            ->helperText('Include country code'),
                                        Toggle::make('phone_active')
                                            ->label('Show Phone Number')
                                            ->inline(false),
                                        TextInput::make('whatsapp_number')
                                            ->label('WhatsApp Number')
                                            ->tel()
                                            ->placeholder('+961 70 123 456')
                                            ->prefixIcon('heroicon-o-chat-bubble-left-right')
                                            ->helperText('Include country code'),
                                        Toggle::make('whatsapp_active')
                                            ->label('Show WhatsApp')
                                            ->inline(false),
                                    ])
                                    ->columns(2)
                                    ->collapsible(),

                                Section::make('Email')
                                    ->description('Configure email contact')
                                    ->icon('heroicon-o-envelope')
                                    ->schema([
                                        Repeater::make('emails')
                                            ->label('Email Addresses')
                                            ->schema([
                                                TextInput::make('email')
                                                    ->email()
                                                    ->required()
                                                    ->placeholder('contact@example.com')
                                                    ->prefixIcon('heroicon-o-envelope'),
                                            ])
                                            
                                            ->defaultItems(1)
                                            ->addActionLabel('Add another email')
                                            ->columnSpanFull(),
                                        Toggle::make('email_active')
                                            ->label('Show Email Addresses')
                                            ->inline(false),
                                    ])
                                    ->columns(2)
                                    ->collapsible(),

                                Section::make('Location')
                                    ->description('Configure physical address and location')
                                    ->icon('heroicon-o-map-pin')
                                    ->schema([
                                        TextInput::make('address')
                                            ->label('Physical Address')
                                            ->placeholder('123 Main Street, City, Country')
                                            ->prefixIcon('heroicon-o-map-pin')
                                            ->columnSpanFull(),
                                        TextInput::make('location_url')
                                            ->label('Google Maps URL')
                                            ->url()
                                            ->placeholder('https://www.google.com/maps/...')
                                            ->prefixIcon('heroicon-o-map')
                                            ->helperText('Link to your location on Google Maps')
                                            ->columnSpanFull(),
                                        Toggle::make('address_active')
                                            ->label('Show Address')
                                            ->inline(false),
                                        Toggle::make('location_active')
                                            ->label('Show Map Link')
                                            ->inline(false),
                                    ])
                                    ->columns(2)
                                    ->collapsible(),
                            ]),
                    ])
                    ->columnSpanFull()
                    ->persistTabInQueryString(),
            ]);
    }
}
