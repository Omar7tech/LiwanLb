<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title inertia>
        @if(isset($blog))
            {{ $blog->title }} - Liwan Architecture Blog | Building Design Lebanon
        @else
            @if(request()->is('works'))
                Architecture Projects | Liwan Lebanon | Building Portfolio
            @elseif(request()->is('cost-study'))
                Cost Study Services | Construction Analysis | Liwan Architecture
            @elseif(request()->is('blogs'))
                Architecture Blog | Building Design Insights | Liwan Lebanon
            @elseif(request()->is('partner-with-us'))
                Partner With Us | Architecture Services | Liwan Lebanon
            @else
                Liwan Architecture | Modern Building Design | Lebanon
            @endif
        @endif
    </title>
    
    <!-- Enhanced SEO Meta Tags -->
    <meta name="description" inertia
        content="@if(isset($blog))
            {{ Str::limit($blog->description, 160) }}
        @else
            @if(request()->is('works'))
                Explore Liwan Architecture's portfolio of innovative building projects in Lebanon. Modern residential, commercial, and institutional architecture designs.
            @elseif(request()->is('cost-study'))
                Professional construction cost analysis and budget planning services by Liwan Architecture. Accurate project cost studies for buildings in Lebanon.
            @elseif(request()->is('blogs'))
                Read expert insights on modern architecture, building design trends, and construction innovations. Architecture blog by Liwan Lebanon team.
            @elseif(request()->is('partner-with-us'))
                Partner with Liwan Architecture for your next building project in Lebanon. Expert architects offering innovative design and construction solutions.
            @else
                Liwan Architecture - Leading architecture firm in Lebanon specializing in modern building design, sustainable construction, and innovative project management.
            @endif
        @endif">
    <meta name="keywords" inertia
        content="liwan, architecture, building design, construction, engineering, project management, modern architecture">
    <meta name="author" inertia content="Liwan Architecture">
    <meta name="robots" inertia content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
    
    <!-- Canonical URL -->
    <link rel="canonical" href="{{ url()->current() }}" inertia>
    
    <!-- Language and Geo Tags -->
    <meta name="language" content="English">
    <meta name="geo.region" content="LB">
    <meta name="geo.placename" content="Aley, Lebanon">
    <meta name="geo.position" content="33.801093;35.607649">
    <meta name="ICBM" content="33.801093,35.607649">
    
    <!-- Performance and Caching -->
    <meta http-equiv="Cache-Control" content="public, max-age=86400">
    <meta name="theme-color" content="#f2ae1d">
    <meta name="msapplication-TileColor" content="#f2ae1d">

    @if(isset($blog))
        <meta property="og:title" inertia content="{{ $blog->title }}">
        <meta property="og:description" inertia content="{{ Str::limit($blog->description, 160) }}">
        <meta property="og:type" inertia content="article">
        <meta property="og:url" inertia content="{{ url()->current() }}">
        <meta property="og:site_name" inertia content="{{ config('app.name', 'Liwan') }}">
        <meta property="og:image" inertia
            content="{{ $blog->getFirstMediaUrl('images', 'webp') ? $blog->getFirstMediaUrl('images') : asset('images/ogimage.jpeg') }}">
        <meta property="og:image:width" content="1200">
        <meta property="og:image:height" content="630">

        <meta name="twitter:card" inertia content="summary_large_image">
        <meta name="twitter:title" inertia content="{{ $blog->title }}">
        <meta name="twitter:description" inertia content="{{ Str::limit($blog->description, 160) }}">
        <meta name="twitter:image" inertia
            content="{{ $blog->getFirstMediaUrl('images', 'webp') ? $blog->getFirstMediaUrl('images') : asset('images/ogimage.jpeg') }}">
        @php
    $articleStructuredData = [
        "@context" => "https://schema.org",
        "@type" => "Article",
        "headline" => $blog->title,
        "description" => Str::limit($blog->description, 160),
        "author" => [
            "@type" => "Organization",
            "name" => "Liwan Architecture"
        ],
        "publisher" => [
            "@type" => "Organization",
            "name" => "Liwan Architecture",
            "logo" => [
                "@type" => "ImageObject",
                "url" => asset('images/logo.png')
            ]
        ],
        "datePublished" => $blog->created_at->format('Y-m-d'),
        "dateModified" => $blog->updated_at->format('Y-m-d'),
        "mainEntityOfPage" => url()->current()
    ];
@endphp

        <!-- Article Structured Data -->
        <script type="application/ld+json">
        {!! json_encode($articleStructuredData) !!}
        </script>
    @else
        <meta property="og:title" inertia content="{{ config('app.name', 'Liwan') }}">
        <meta property="og:description" inertia
            content="Liwan - Innovative architecture platform designed for modern building design and construction management">
        <meta property="og:type" inertia content="website">
        <meta property="og:url" inertia content="{{ url()->current() }}">
        <meta property="og:site_name" inertia content="{{ config('app.name', 'Liwan') }}">
        <meta property="og:image" inertia content="{{ asset('images/ogimage.jpeg') }}">
        <meta property="og:image:width" content="1200">
        <meta property="og:image:height" content="630">

        <meta name="twitter:card" inertia content="summary_large_image">
        <meta name="twitter:title" inertia content="{{ config('app.name', 'Liwan') }}">
        <meta name="twitter:description" inertia
            content="Liwan - Innovative architecture platform designed for modern building design and construction management">
        <meta name="twitter:image" inertia content="{{ asset('images/ogimage.jpeg') }}">
        
        @php
    $organizationStructuredData = [
        "@context" => "https://schema.org",
        "@type" => "Organization",
        "name" => "Liwan Architecture",
        "description" => "Innovative architecture platform designed for modern building design and construction management",
        "url" => url('/'),
        "logo" => asset('images/logo.png'),
        "sameAs" => [
            url('/')
        ]
    ];
@endphp

        <!-- Organization Structured Data -->
        <script type="application/ld+json">
        {!! json_encode($organizationStructuredData) !!}
        </script>
    @endif

    <!-- DNS Prefetch for Performance -->
    <link rel="dns-prefetch" href="//fonts.googleapis.com">
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link rel="dns-prefetch" href="//js.puter.com">
    
    <!-- Preload Critical Resources -->
    <link rel="preload" href="{{ asset('fonts/cairo.woff2') }}" as="font" type="font/woff2" crossorigin>
    
    <!-- Enhanced Favicon -->
    <link rel="icon" href="/favicon.ico" sizes="any">
    <link rel="icon" href="/favicon.svg" type="image/svg+xml">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">
    <link rel="manifest" href="{{ asset('site.webmanifest') }}">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@200..1000&display=swap" rel="stylesheet" />

    @if(app(\App\Settings\GeneralSettings::class)->cost_study_ai_enabled)
        <script src="https://js.puter.com/v2/"></script>
    @endif

    @viteReactRefresh
    @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
    @inertiaHead
</head>

<body class="cairo antialiased bg-[#FAFAFA]">
    @inertia
    @if(app(\App\Settings\GeneralSettings::class)->tawk_active && !empty(app(\App\Settings\GeneralSettings::class)->tawk_script))
        {!! app(\App\Settings\GeneralSettings::class)->tawk_script !!}
    @endif
</body>

</html>