<?php

namespace Tests\Feature;

use App\Settings\GeneralSettings;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class MaintenanceModeTest extends TestCase
{
    use RefreshDatabase;

    public function test_site_is_accessible_when_active()
    {
        GeneralSettings::fake([
            'site_active' => true,
        ]);

        $response = $this->get('/');

        $response->assertStatus(200);
    }

    public function test_site_redirects_to_maintenance_when_inactive()
    {
        GeneralSettings::fake([
            'site_active' => false,
        ]);

        $response = $this->get('/');

        $response->assertRedirect(route('maintenance'));
    }

    public function test_maintenance_page_is_accessible_when_inactive()
    {
        GeneralSettings::fake([
            'site_active' => false,
        ]);

        $response = $this->get(route('maintenance'));

        $response->assertStatus(200);
        $response->assertSee('Under Maintenance');
    }

    public function test_maintenance_page_redirects_to_home_when_active()
    {
        GeneralSettings::fake([
            'site_active' => true,
        ]);

        $response = $this->get(route('maintenance'));

        $response->assertRedirect(route('home'));
    }

    public function test_admin_panel_is_accessible_when_site_inactive()
    {
        GeneralSettings::fake([
            'site_active' => false,
        ]);

        $response = $this->get('/admin/login');

        $response->assertStatus(200);
    }
}
