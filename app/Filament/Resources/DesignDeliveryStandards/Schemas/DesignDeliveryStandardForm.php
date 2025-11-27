<?php

namespace App\Filament\Resources\DesignDeliveryStandards\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class DesignDeliveryStandardForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->columns(2)
            ->components([
                Section::make('English Content')
                    ->description('Enter the title and description in English')
                    ->schema([
                        TextInput::make('english_title')
                            ->label('Title (English)')
                            ->maxLength(255)
                            ->columnSpanFull()
                            ->placeholder('Enter the standard title in English'),

                        Textarea::make('english_description')
                            ->label('Description (English)')
                            ->rows(5)
                            ->columnSpanFull()
                            ->placeholder('Describe this design delivery standard in English...'),
                    ])
                    ->columnSpan(1)
                    ->collapsible(),

                Section::make('Arabic Content')
                    ->description('أدخل العنوان والوصف بالعربية')
                    ->schema([
                        TextInput::make('arabic_title')
                            ->label('العنوان (عربي)')
                            ->maxLength(255)
                            ->columnSpanFull()
                            ->placeholder('أدخل عنوان المعيار بالعربية'),

                        Textarea::make('arabic_description')
                            ->label('الوصف (عربي)')
                            ->rows(5)
                            ->columnSpanFull()
                            ->placeholder('اكتب وصف معيار التسليم بالعربية...'),
                    ])
                    ->columnSpan(1)
                    ->collapsible(),

                Section::make('Visibility')
                    ->description('Control whether this standard is displayed')
                    ->schema([
                        Toggle::make('active')
                            ->label('Active')
                            ->default(true)
                            ->helperText('Show this design delivery standard on the website'),
                    ])
                    ->columnSpan(2),
            ]);
    }
}
