<?php

namespace App\Filament\Widgets;

use App\Models\User;
use Leandrocfe\FilamentApexCharts\Widgets\ApexChartWidget;

use BezhanSalleh\FilamentShield\Traits\HasWidgetShield;

class UsersByRolesChart extends ApexChartWidget
{
    use HasWidgetShield;
    /**
     * Chart Id
     *
     * @var string
     */
    protected static ?string $chartId = 'usersByRolesChart';

    /**
     * Widget Title
     *
     * @var string|null
     */
    protected static ?string $heading = 'Users by Roles';

    /**
     * Widget Subheading
     *
     * @var string|null
     */
    protected static ?string $subheading = 'Distribution of users across different roles';

    /**
     * Chart height
     *
     * @var int|null
     */
    protected static ?int $contentHeight = 350;

    /**
     * Chart options
     *
     * @return array
     */
    protected function getOptions(): array
    {
        // Get users by roles
        $usersByRoles = $this->getUsersByRoles();

        return [
            'chart' => [
                'type' => 'bar',
                'height' => 350,
                'toolbar' => [
                    'show' => false,
                ],
            ],
            'series' => [
                [
                    'name' => 'Users',
                    'data' => array_values($usersByRoles),
                ],
            ],
            'xaxis' => [
                'categories' => array_keys($usersByRoles),
                'labels' => [
                    'style' => [
                        'fontFamily' => 'inherit',
                        'fontWeight' => 600,
                    ],
                ],
            ],
            'yaxis' => [
                'labels' => [
                    'style' => [
                        'fontFamily' => 'inherit',
                    ],
                ],
                'min' => 0,
                'forceNiceScale' => true,
            ],
            'colors' => ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444', '#06b6d4'],
            'plotOptions' => [
                'bar' => [
                    'borderRadius' => 8,
                    'columnWidth' => '60%',
                    'distributed' => true,
                ],
            ],
            'dataLabels' => [
                'enabled' => true,
                'position' => 'top',
                'style' => [
                    'fontSize' => '12px',
                    'fontFamily' => 'inherit',
                    'fontWeight' => 600,
                    'colors' => ['#000000'],
                ],
                'offsetY' => -5,
            ],
            'legend' => [
                'show' => false,
            ],
            'tooltip' => [
                'theme' => 'dark',
                'style' => [
                    'fontSize' => '12px',
                    'fontFamily' => 'inherit',
                ],
                'y' => [
                    'formatter' => 'function(val) { 
                        if(val === 1) return val + " user";
                        return val + " users";
                    }',
                ],
            ],
            'grid' => [
                'borderColor' => '#f1f5f9',
                'strokeDashArray' => 3,
            ],
            'noData' => [
                'text' => 'No user data available',
                'align' => 'center',
                'verticalAlign' => 'middle',
                'style' => [
                    'fontSize' => '14px',
                    'fontFamily' => 'inherit',
                    'color' => '#6b7280',
                ],
            ],
        ];
    }

    /**
     * Get footer content
     */
    protected function getFooter(): ?string
    {
        $totalUsers = User::withoutGlobalScopes()->count();
        $usersByRoles = $this->getUsersByRoles();
        $roleCount = count($usersByRoles);
        
        return "Total Users: {$totalUsers} | Roles: {$roleCount}";
    }

    /**
     * Get users by roles
     */
    protected function getUsersByRoles(): array
    {
        try {
            // Get users with their roles
            $users = User::withoutGlobalScopes()
                ->with('roles')
                ->get();

            $rolesCount = [];
            
            foreach ($users as $user) {
                if ($user->roles->count() > 0) {
                    foreach ($user->roles as $role) {
                        $roleName = ucfirst($role->name);
                        $rolesCount[$roleName] = ($rolesCount[$roleName] ?? 0) + 1;
                    }
                } else {
                    $rolesCount['No Role'] = ($rolesCount['No Role'] ?? 0) + 1;
                }
            }

            // Sort by count descending
            arsort($rolesCount);

            // Limit to top 6 roles for better display
            return array_slice($rolesCount, 0, 6, true);

        } catch (\Exception $e) {
            // Fallback data
            return [
                'Admin' => 1,
                'User' => 0,
            ];
        }
    }
}
