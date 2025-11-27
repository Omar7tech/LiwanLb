<?php

namespace App\Settings;

use Spatie\LaravelSettings\Settings;

class SocialSettings extends Settings
{

    public ?string $facebook_url = 'https://www.facebook.com/liwan.lb';
    public ?string $twitter_url = 'https://twitter.com/liwan_lb';
    public ?string $instagram_url = 'https://www.instagram.com/liwan.lb';
    public ?string $youtube_url = 'https://www.youtube.com/@liwanlb';
    public ?string $whatsapp_number = '+96170123456';
    public ?string $phone_number = '+96170123456';
    public ?array $emails ;
    public ?string $address = '123 Main Street, Anytown, USA';
    public ?string $location_url = 'https://www.google.com/maps/place/123+Main+Street,+Anytown,+USA';
    public bool $facebook_active = true;
    public bool $twitter_active = true;
    public bool $instagram_active = true;
    public bool $youtube_active = true;
    public bool $whatsapp_active = true;
    public bool $phone_active = true;
    public bool $email_active = true;
    public bool $address_active = true;
    public bool $location_active = true;

    public static function group(): string
    {
        return 'social';
    }
}