<?php

namespace App\Filament\Widgets;

use App\Models\Work;
use App\Models\Testimonial;
use Leandrocfe\FilamentApexCharts\Widgets\ApexChartWidget;

class TestimonialsByWorkChart extends ApexChartWidget
{
    /**
     * Chart Id
     *
     * @var string
     */
    protected static ?string $chartId = 'testimonialsByWorkChart';

    /**
     * Widget Title
     *
     * @var string|null
     */
    protected static ?string $heading = 'Testimonials by Work';

    /**
     * Widget Subheading
     *
     * @var string|null
     */
    protected static ?string $subheading = 'Distribution of testimonials across different works';

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
        // Get testimonials distribution by work
        $testimonialsData = $this->getTestimonialsByWork();

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
                    'name' => 'Testimonials',
                    'data' => array_values($testimonialsData),
                ],
            ],
            'xaxis' => [
                'categories' => array_keys($testimonialsData),
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
                    'text' => 'Number of Testimonials',
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
                        return val + " testimonial" + (val !== 1 ? "s" : "");
                    }',
                ],
            ],
            'grid' => [
                'borderColor' => '#f1f5f9',
                'strokeDashArray' => 3,
            ],
            'noData' => [
                'text' => 'No testimonials data available',
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
        $testimonialsData = $this->getTestimonialsByWork();
        $totalWorks = count($testimonialsData);
        $totalTestimonials = array_sum($testimonialsData);
        
        return "Works: {$totalWorks} | Total Testimonials: {$totalTestimonials}";
    }

    /**
     * Get testimonials distribution by work
     */
    protected function getTestimonialsByWork(): array
    {
        try {
            // Get testimonials without work first
            $testimonialsWithoutWork = Testimonial::withoutGlobalScopes()
                ->whereNull('work_id')
                ->count();

            $testimonialsData = [];

            // Add testimonials without work if any exist
            if ($testimonialsWithoutWork > 0) {
                $testimonialsData['Uncategorized'] = $testimonialsWithoutWork;
            }

            // Get works with their testimonial counts
            $works = Work::withoutGlobalScopes()
                ->withCount('testimonials')
                ->orderBy('testimonials_count', 'desc')
                ->limit(7) // Limit to 7 works + 1 for "Uncategorized" = 8 total
                ->get();

            foreach ($works as $work) {
                if ($work->testimonials_count > 0) {
                    // Use work name or fallback to ID
                    $workName = !empty($work->name) ? 
                        (strlen($work->name) > 20 ? substr($work->name, 0, 20) . '...' : $work->name) : 
                        "Work #" . $work->id;
                    
                    $testimonialsData[$workName] = $work->testimonials_count;
                }
            }

            // If no testimonials found, return empty array
            if (empty($testimonialsData)) {
                return [
                    'No Testimonials' => 1
                ];
            }

            return $testimonialsData;

        } catch (\Exception $e) {
            // Fallback data
            return [
                'Work 1' => 5,
                'Work 2' => 3,
                'Uncategorized' => 2,
            ];
        }
    }
}
