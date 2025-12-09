<?php

namespace App\Filament\Resources\Blogs\Schemas;

use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\SpatieMediaLibraryFileUpload;
use Filament\Schemas\Components\Section; // Only using Section
use Filament\Schemas\Schema;

class BlogForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                // 1. Primary Metadata Section (Default 1-column layout)
                Section::make('📝 Post Details')
                    ->description('Set the post title and publishing status.')
                    // Removed columns(1) as it's the default, but explicitly listing components
                    ->components([
                        // Original TextInput (Full Width)
                        TextInput::make('title')
                            ->required(),

                        // Original Toggle (Full Width - Stacks below the Title)
                        Toggle::make('active')
                            ->required()
                            ->label('Post is Active / Publish')
                            ->inline(false) // Ensures it takes vertical space cleanly
                            ->default(true),
                    ])->columnSpanFull(),

                // --- 2. Featured Image Section (Full Width) ---
                Section::make('🖼️ Featured Image')
                    ->description('Upload the main image for the blog post.')
                    // Full width is inherent when columns(1) or no columns are specified
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
                            ->collection(collection: 'images')
                            ->imageEditorAspectRatios([
                                null,
                                '16:9',
                                '4:3',
                                '1:1',
                                '3:4',
                            ])
                            ->maxSize(2048)
                            ->helperText('📸 Upload image (max 2MB)')
                            ->columnSpanFull(),
                    ])->columnSpanFull(),

                Section::make('✍️ Article Content')
                    ->description('Write the main article and provide an SEO summary.')
                    ->components([
                        // Original RichEditor (Full Width)
                        RichEditor::make('content')
                            ->toolbarButtons([
                                ['bold', 'italic', 'underline', 'highlight', 'details', 'strike', 'subscript', 'superscript', 'link'],
                                ['clearFormatting'],
                                ['h1', 'h2', 'h3', 'alignStart', 'alignCenter', 'alignEnd', 'lead'],
                                ['blockquote', 'codeBlock', 'bulletList', 'orderedList'],
                                ['table'],
                                ['undo', 'redo'],
                            ])
                            ->columnSpanFull(),

                        // Original Textarea (Full Width)
                        Textarea::make('description')
                            ->label('Summary Description')
                            ->helperText('A brief summary of the post (ideal for SEO and excerpts).')
                            ->columnSpanFull(),
                    ])->columnSpanFull(),
            ]);
    }
}
