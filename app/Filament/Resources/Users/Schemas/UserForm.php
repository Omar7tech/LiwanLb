<?php

namespace App\Filament\Resources\Users\Schemas;

use Filament\Forms\Components\DateTimePicker;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;

use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Utilities\Get;
use Filament\Schemas\Schema;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class UserForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('User Information')
                    ->schema([
                        TextInput::make('name')
                            ->required()
                            ->maxLength(255),
                        TextInput::make('username')
                            ->required()
                            ->unique(ignoreRecord: true)
                            ->maxLength(255)
                            ->live()
                            ->afterStateUpdated(function ($state, Get $get, callable $set) {
                                $password = (string) $get('password');
                                $roleIds = (array) $get('roles');

                                if ($state === '' || $password === '') {
                                    return;
                                }

                                $roleNames = Role::whereIn('id', $roleIds)->pluck('name')->all();
                                $isClient = in_array('client', $roleNames, true);
                                $loginUrl = $isClient
                                    ? route('login')
                                    : route('filament.admin.auth.login');

                                $set('credentials_note', sprintf(
                                    "Hello from Liwan LB,\n\nThis is your credentials to login.\n\nPress here to login:\n%s\n\nUsername: %s\nPassword: %s",
                                    $loginUrl,
                                    (string) $state,
                                    $password,
                                ));
                            }),
                        TextInput::make('email')
                            ->label('Email address')
                            ->email()
                            ->unique(ignoreRecord: true)
                            ->maxLength(255),
                        TextInput::make('phoneNumber')
                            ->label('Phone Number')
                            ->tel()
                            ->unique(ignoreRecord: true)
                            ->maxLength(255),
                    ])->columns(2),

                Section::make('Security')
                    ->schema([
                        TextInput::make('password')
                            ->password()
                            ->live()
                            ->afterStateUpdated(function ($state, Get $get, callable $set) {
                                $username = (string) $get('username');
                                $roleIds = (array) $get('roles');

                                if ($username === '' || $state === '') {
                                    return;
                                }

                                $roleNames = Role::whereIn('id', $roleIds)->pluck('name')->all();
                                $isClient = in_array('client', $roleNames, true);
                                $loginUrl = $isClient
                                    ? route('login')
                                    : route('filament.admin.auth.login');

                                $set('credentials_note', sprintf(
                                    "Hello from Liwan LB,\n\nThis is your credentials to login.\n\nPress here to login:\n%s\n\nUsername: %s\nPassword: %s",
                                    $loginUrl,
                                    $username,
                                    (string) $state,
                                ));
                            })
                            ->dehydrateStateUsing(fn ($state) => filled($state) ? Hash::make($state) : null)
                            ->dehydrated(fn ($state) => filled($state))
                            ->required(fn (string $context): bool => $context === 'create')
                            ->maxLength(255)
                            ->revealable(),
                    ]),

                Section::make('Credentials')
                    ->schema([
                        Textarea::make('credentials_note')
                            ->label('Credentials (copy & send to user)')
                            ->rows(3)
                            ->nullable(),
                    ]),

                Section::make('Roles & Permissions')
                    ->schema([
                        Select::make('roles')
                            ->relationship('roles', 'name', fn ($query) => $query->where('name', '!=', 'super_admin'))
                            ->multiple()
                            ->preload()
                            ->searchable()
                            ->required()
                            ->disabled(fn () => !auth()->user()?->hasRole('super_admin')),
                    ])
                    ->visible(fn () => auth()->user()?->hasRole('super_admin')),
            ]);
    }
}
