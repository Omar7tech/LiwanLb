<?php

namespace App\Settings;

use Spatie\LaravelSettings\Settings;

class GeneralSettings extends Settings
{
    public bool $site_active = true;
    public bool $cost_study_ai_enabled = false;
    public bool $tawk_active = false;
    public string $tawk_script = '';
    
    public static function group(): string
    {
        return 'general';
    }
}
