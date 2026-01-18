<?php

namespace App\Filament\Widgets;

use App\Models\Project;
use App\Models\ProjectUpdate;
use Leandrocfe\FilamentApexCharts\Widgets\ApexChartWidget;
use Filament\Widgets\ChartWidget\Concerns\HasFiltersSchema;
use Filament\Schemas\Schema;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\DatePicker;
use BezhanSalleh\FilamentShield\Traits\HasWidgetShield;

class ProjectsOverviewChart extends ApexChartWidget
{
    use HasFiltersSchema;
    use HasWidgetShield;

    /**
     * Chart Id
     *
     * @var string
     */
    protected static ?string $chartId = 'projectsOverviewChart';

    /**
     * Widget Title
     *
     * @var string|null
     */
    protected static ?string $heading = 'Projects Overview';

    /**
     * Widget Subheading
     *
     * @var string|null
     */
    protected static ?string $subheading = 'Project statistics and trends';

    /**
     * Chart height
     *
     * @var int|null
     */
    protected static ?int $contentHeight = 350;

    /**
     * Enable collapsible
     *
     * @var bool
     */
    protected static bool $isCollapsible = true;

    /**
     * Filters schema
     */
    public function filtersSchema(Schema $schema): Schema
    {
        return $schema->components([
            Select::make('period')
                ->label('Period')
                ->options([
                    '7' => 'Last 7 days',
                    '30' => 'Last 30 days',
                    '90' => 'Last 90 days',
                    '365' => 'Last year',
                ])
                ->default('30'),
                
            Select::make('chartType')
                ->label('Chart Type')
                ->options([
                    'bar' => 'Bar Chart',
                    'line' => 'Line Chart',
                    'area' => 'Area Chart',
                    'column' => 'Column Chart',
                ])
                ->default('bar'),
        ]);
    }

    /**
     * Use this method to update the chart options when the filter form is submitted.
     */
    public function updatedInteractsWithSchemas(string $statePath): void
    {
        $this->updateOptions();
    }

    /**
     * Chart options
     *
     * @return array
     */
    protected function getOptions(): array
    {
        $period = $this->filters['period'] ?? 30;
        $chartType = $this->filters['chartType'] ?? 'bar';

        // Get project statistics
        $totalProjects = Project::withoutGlobalScopes()->count();
        $activeProjects = Project::withoutGlobalScopes()->where('status', 'active')->count();
        $completedProjects = Project::withoutGlobalScopes()->where('status', 'completed')->count();
        $onHoldProjects = Project::withoutGlobalScopes()->where('status', 'on_hold')->count();
        $pendingProjects = Project::withoutGlobalScopes()->where('status', 'pending')->count();

        // Get project updates trend
        $updatesData = $this->getProjectUpdatesTrend($period);

        return [
            'chart' => [
                'type' => $chartType,
                'height' => 350,
                'toolbar' => [
                    'show' => true,
                    'tools' => [
                        'download' => true,
                        'selection' => true,
                        'zoom' => true,
                        'zoomin' => true,
                        'zoomout' => true,
                        'pan' => true,
                        'reset' => true,
                    ],
                ],
            ],
            'series' => [
                [
                    'name' => 'Projects by Status',
                    'data' => [$activeProjects, $completedProjects, $onHoldProjects, $pendingProjects],
                ],
                [
                    'name' => 'Updates Trend',
                    'data' => $updatesData,
                ],
            ],
            'xaxis' => [
                'categories' => ['Active', 'Completed', 'On Hold', 'Pending'],
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
            ],
            'colors' => ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'],
            'plotOptions' => [
                'bar' => [
                    'borderRadius' => 8,
                    'columnWidth' => '60%',
                ],
            ],
            'dataLabels' => [
                'enabled' => false,
            ],
            'legend' => [
                'show' => true,
                'position' => 'top',
                'horizontalAlign' => 'center',
                'fontFamily' => 'inherit',
                'fontSize' => '12px',
            ],
            'tooltip' => [
                'theme' => 'dark',
                'style' => [
                    'fontSize' => '12px',
                    'fontFamily' => 'inherit',
                ],
            ],
            'grid' => [
                'borderColor' => '#f1f5f9',
            ],
            'stroke' => [
                'show' => true,
                'width' => 2,
                'curve' => 'smooth',
            ],
            'fill' => [
                'type' => 'gradient',
                'gradient' => [
                    'shade' => 'light',
                    'type' => 'vertical',
                    'shadeIntensity' => 0.5,
                    'gradientToColors' => ['#10b981'],
                    'inverseColors' => false,
                    'opacityFrom' => 0.85,
                    'opacityTo' => 0.55,
                ],
            ],
        ];
    }

    /**
     * Get project updates trend data
     */
    protected function getProjectUpdatesTrend(int $period): array
    {
        $updates = ProjectUpdate::withoutGlobalScopes()
            ->where('created_at', '>=', now()->subDays($period))
            ->orderBy('created_at')
            ->get()
            ->groupBy(function($update) {
                return $update->created_at->format('Y-m-d');
            });

        $trend = [];
        $currentDate = now()->subDays($period - 1);
        
        for ($i = 0; $i < $period; $i++) {
            $date = $currentDate->copy()->addDays($i);
            $dateKey = $date->format('Y-m-d');
            $trend[] = $updates->get($dateKey, collect())->count();
        }

        return array_slice($trend, -$period > 7 ? 7 : $period);
    }

    /**
     * Get footer content
     */
    protected function getFooter(): ?string
    {
        $totalProjects = Project::withoutGlobalScopes()->count();
        $totalUpdates = ProjectUpdate::withoutGlobalScopes()->count();
        
        return "Total Projects: {$totalProjects} | Total Updates: {$totalUpdates}";
    }
}
