<?php

namespace App\Filament\Resources\Testimonials\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;

use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Mokhosh\FilamentRating\Components\Rating;

class TestimonialForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->columns(2)
            ->components([
                Section::make('Testimonial Information')
                    ->description('Enter the customer testimonial details')
                    ->schema([
                        TextInput::make('name')
                            ->required()
                            ->maxLength(255)
                            ->placeholder('Customer name'),

                        Textarea::make('testimonial')
                            ->required()
                            ->rows(5)
                            ->columnSpanFull()
                            ->placeholder('Enter the testimonial text...'),

                        \Filament\Forms\Components\Select::make('work_id')
                            ->label('Related Work (Optional)')
                            ->relationship('work', 'name')
                            ->searchable()
                            ->preload()
                            ->nullable()
                            ->helperText('Associate this testimonial with a specific work'),
                    ])
                    ->columnSpan(2),

                Section::make('Rating & Status')
                    ->description('Set the rating and visibility')
                    ->schema([
                        Rating::make('rating')
                            ->required()
                            ->default(1)
                            ->helperText('Rating must be between 0 and 5'),

                        Toggle::make('active')
                            ->label('Active')
                            ->default(true)
                            ->helperText('Show this testimonial on the website'),
                    ])
                    ->columns(2)
                    ->columnSpan(2),
            ]);
    }
}
