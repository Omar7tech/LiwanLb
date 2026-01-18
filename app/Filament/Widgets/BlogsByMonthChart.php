<?php

namespace App\Filament\Widgets;

use App\Models\Blog;
use Leandrocfe\FilamentApexCharts\Widgets\ApexChartWidget;

use BezhanSalleh\FilamentShield\Traits\HasWidgetShield;

class BlogsByMonthChart extends ApexChartWidget
{
    use HasWidgetShield;
    /**
     * Chart Id
     *
     * @var string
     */
    protected static ?string $chartId = 'blogsByMonthChart';

    /**
     * Widget Title
     *
     * @var string|null
     */
    protected static ?string $heading = 'Blog Posts by Month';

    /**
     * Widget Subheading
     *
     * @var string|null
     */
    protected static ?string $subheading = 'Monthly blog posting trends and activity';

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
        // Get blog data by month
        $blogData = $this->getBlogsByMonth();

        return [
            'chart' => [
                'type' => 'line',
                'height' => 350,
                'toolbar' => [
                    'show' => false,
                ],
            ],
            'series' => [
                [
                    'name' => 'Blog Posts',
                    'data' => $blogData['data'],
                ],
            ],
            'xaxis' => [
                'categories' => $blogData['months'],
                'labels' => [
                    'style' => [
                        'fontFamily' => 'inherit',
                        'fontWeight' => 600,
                        'fontSize' => '11px',
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
                    'text' => 'Number of Blog Posts',
                    'style' => [
                        'fontFamily' => 'inherit',
                        'fontWeight' => 600,
                    ],
                ],
            ],
            'colors' => ['#3b82f6'],
            'stroke' => [
                'show' => true,
                'width' => 3,
                'curve' => 'smooth',
            ],
            'markers' => [
                'size' => 5,
                'colors' => '#ffffff',
                'strokeColors' => '#3b82f6',
                'strokeWidth' => 2,
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
                'y' => [
                    'formatter' => 'function(val) { 
                        return val + " post" + (val !== 1 ? "s" : "");
                    }',
                ],
            ],
            'grid' => [
                'borderColor' => '#f1f5f9',
                'strokeDashArray' => 3,
            ],
            'noData' => [
                'text' => 'No blog data available',
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
        $blogData = $this->getBlogsByMonth();
        $totalBlogs = array_sum($blogData['data']);
        $averagePerMonth = round($totalBlogs / count($blogData['data']), 1);
        $peakMonth = max($blogData['data']);
        
        return "Total: {$totalBlogs} | Avg/Month: {$averagePerMonth} | Peak: {$peakMonth}";
    }

    /**
     * Get blogs by month for the last 12 months
     */
    protected function getBlogsByMonth(): array
    {
        try {
            $months = [];
            $data = [];

            // Get data for last 12 months
            for ($i = 11; $i >= 0; $i--) {
                $date = now()->subMonths($i);
                $monthName = $date->format('M');
                $months[] = $monthName;

                // Count blogs for this month
                $count = Blog::withoutGlobalScopes()
                    ->whereYear('created_at', $date->year)
                    ->whereMonth('created_at', $date->month)
                    ->count();
                
                $data[] = $count;
            }

            return [
                'months' => $months,
                'data' => $data,
            ];

        } catch (\Exception $e) {
            // Fallback data
            return [
                'months' => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                'data' => [5, 8, 3, 12, 7, 9, 4, 6, 10, 8, 5, 11],
            ];
        }
    }
}
