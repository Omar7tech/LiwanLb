<?php

namespace App\Filament\Resources\Residencies;

use App\Filament\Resources\Residencies\Pages\ManageResidencies;
use App\Models\Residency;
use BackedEnum;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Forms\Components\SpatieMediaLibraryFileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\SpatieMediaLibraryImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Table;
use UnitEnum;
class ResidencyResource extends Resource
{
    protected static ?string $model = Residency::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedHomeModern;
    protected static UnitEnum|string|null $navigationGroup = 'Content Management';
    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                SpatieMediaLibraryFileUpload::make('image')
                    ->label('Upload Images')
                    ->disk('public')
                    ->visibility('public')
                    ->directory('blogs')
                    ->image()
                    ->downloadable()
                    ->openable()
                    ->imageEditor()
                    ->conversion('webp')
                    ->collection('images')
                    ->imageEditorAspectRatios([
                        null,
                        '16:9',
                        '4:3',
                        '1:1',
                        '3:4',
                    ])
                    ->maxSize(2048)
                    ->helperText('📸 Upload image (max 2MB)')
                    ->columnSpanFull()
                    ->collection('images'),
                TextInput::make('name')
                    ->required(),
                Toggle::make('active')
                    ->required(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                SpatieMediaLibraryImageColumn::make('image')
                    ->conversion('webp')
                    ->collection('images'),
                TextColumn::make('name')
                    ->searchable(),
                ToggleColumn::make('active'),
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([

            ])->reorderable('order')->defaultSort('order', 'asc')
            ->recordActions([
                EditAction::make(),
                DeleteAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => ManageResidencies::route('/'),
        ];
    }
}
