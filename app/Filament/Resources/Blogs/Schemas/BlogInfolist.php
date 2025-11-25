<?php

namespace App\Filament\Resources\Blogs\Schemas;

use Filament\Infolists\Components\IconEntry;
use Filament\Infolists\Components\SpatieMediaLibraryImageEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;


class BlogInfolist
{
    public static function configure(Schema $schema): Schema
    {

        return $schema
            ->components([
                TextEntry::make('title'),

                SpatieMediaLibraryImageEntry::make('image')
                    ->placeholder('No Image'),
                TextEntry::make('description')
                    ->placeholder('-')
                    ->columnSpanFull(),
                

                IconEntry::make('active')
                    ->boolean(),
                TextEntry::make('created_at')
                    ->dateTime()
                    ->placeholder('-'),
                TextEntry::make('updated_at')
                    ->dateTime()
                    ->placeholder('-'),
            ]);
    }
}
