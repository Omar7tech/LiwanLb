<?php

use Spatie\LaravelSettings\Migrations\SettingsMigration;

return new class extends SettingsMigration
{
    public function up(): void
    {
        $this->migrator->add('general.site_active', true);
        $this->migrator->add('general.cost_study_ai_enabled', false);
        $this->migrator->add('general.tawk_active', false);
        $this->migrator->add('general.tawk_script', '');
    }
};
