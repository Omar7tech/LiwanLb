<?php

namespace App\Settings;

use Spatie\LaravelSettings\Settings;

class GeneralSettings extends Settings
{
    public bool $site_active = true;
    public static function group(): string
    {
        return 'general';
    }
}
