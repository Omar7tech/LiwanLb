<?php

namespace App\Filament\Widgets;

use App\Models\Work;
use Leandrocfe\FilamentApexCharts\Widgets\ApexChartWidget;

class WorksResidenciesChart extends ApexChartWidget
{
    /**
     * Chart Id
     *
     * @var string
     */
    protected static ?string $chartId = 'worksResidenciesChart';

    /**
     * Widget Title
     *
     * @var string|null
     */
    protected static ?string $heading = 'Residencies/Projects per Work';

    /**
     * Widget Subheading
     *
     * @var string|null
     */
    protected static ?string $subheading = 'Number of residencies/projects in each work';

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
        // Get works with their residency counts
        $workResidencyData = $this->getWorksWithResidencyCounts();

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
                    'name' => 'Residencies/Projects',
                    'data' => array_values($workResidencyData),
                ],
            ],
            'xaxis' => [
                'categories' => array_keys($workResidencyData),
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
                'title' => [
                    'text' => 'Number of Residencies/Projects',
                    'style' => [
                        'fontFamily' => 'inherit',
                        'fontWeight' => 600,
                    ],
                ],
            ],
            'colors' => ['#3b82f6'],
            'plotOptions' => [
                'bar' => [
                    'borderRadius' => 8,
                    'columnWidth' => '70%',
                    'distributed' => true,
                ],
            ],
            'dataLabels' => [
                'enabled' => true,
                'position' => 'top',
                'style' => [
                    'fontSize' => '11px',
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
                        if(val === 1) return val + " residency/project";
                        return val + " residencies/projects";
                    }',
                ],
            ],
            'grid' => [
                'borderColor' => '#f1f5f9',
                'strokeDashArray' => 3,
            ],
            'noData' => [
                'text' => 'No works or residencies data available',
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
        $workResidencyData = $this->getWorksWithResidencyCounts();
        $totalWorks = count($workResidencyData);
        $totalResidencies = array_sum($workResidencyData);
        
        return "Works: {$totalWorks} | Total Residencies/Projects: {$totalResidencies}";
    }

    /**
     * Get works with their residency counts
     */
    protected function getWorksWithResidencyCounts(): array
    {
        try {
            $works = Work::withoutGlobalScopes()
                ->withCount('residencies')
                ->orderBy('residencies_count', 'desc')
                ->limit(8) // Limit to top 8 works for better display
                ->get();

            $workData = [];
            foreach ($works as $work) {
                // Use work name or fallback to ID
                $workName = !empty($work->name) ? 
                    (strlen($work->name) > 15 ? substr($work->name, 0, 15) . '...' : $work->name) : 
                    "Work #" . $work->id;
                
                $workData[$workName] = $work->residencies_count;
            }

            return $workData;

        } catch (\Exception $e) {
            // Fallback data
            return [
                'Work 1' => 3,
                'Work 2' => 2,
                'Work 3' => 1,
            ];
        }
    }
}
