<?php

use Spatie\LaravelSettings\Migrations\SettingsMigration;

return new class extends SettingsMigration
{
    public function up(): void
    {
        $this->migrator->add('social.facebook_url', 'https://www.facebook.com/liwan.lb');
        $this->migrator->add('social.twitter_url', 'https://twitter.com/liwan_lb');
        $this->migrator->add('social.instagram_url', 'https://www.instagram.com/liwan.lb');
        $this->migrator->add('social.youtube_url', 'https://www.youtube.com/@liwanlb');
        $this->migrator->add('social.whatsapp_number', '+96170123456');
        $this->migrator->add('social.phone_number', '+96170123456');
        $this->migrator->add('social.emails', []);
        $this->migrator->add('social.address', '123 Main Street, Anytown, USA');
        $this->migrator->add('social.location_url', 'https://www.google.com/maps/place/123+Main+Street,+Anytown,+USA');

        $this->migrator->add('social.facebook_active', true);
        $this->migrator->add('social.twitter_active', true);
        $this->migrator->add('social.instagram_active', true);
        $this->migrator->add('social.youtube_active', true);
        $this->migrator->add('social.whatsapp_active', true);
        $this->migrator->add('social.phone_active', true);
        $this->migrator->add('social.email_active', true);
        $this->migrator->add('social.address_active', true);
        $this->migrator->add('social.location_active', true);
         $this->migrator->add('social.whatsapp_widget_active', true);
    }
};
