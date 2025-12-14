<?php

namespace App\Filament\Pages;

use Filament\Pages\Page;
use BackedEnum;
class Support extends Page
{


    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-question-mark-circle';

    protected string $view = 'filament.pages.support';

}