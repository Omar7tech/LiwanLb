<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title inertia>{{ config('app.name', 'Liwan') }}</title>
    <meta name="description" inertia
        content="Liwan - Innovative architecture platform designed for modern building design and construction management">
    <meta name="keywords" inertia
        content="liwan, architecture, building design, construction, engineering, project management">
    <meta name="author" inertia content="Liwan Architecture">
    <meta name="robots" inertia content="index, follow">

    @if(isset($blog))
        <meta property="og:title" inertia content="{{ $blog->title }}">
        <meta property="og:description" inertia content="{{ Str::limit($blog->description, 160) }}">
        <meta property="og:type" inertia content="article">
        <meta property="og:url" inertia content="{{ url()->current() }}">
        <meta property="og:site_name" inertia content="{{ config('app.name', 'Liwan') }}">
        <meta property="og:image" inertia content="{{ $blog->getFirstMedia('images') ? $blog->getFirstMedia('images')->getUrl('webp') : asset('images/ogimage.jpeg') }}">
        
        <meta name="twitter:card" inertia content="summary_large_image">
        <meta name="twitter:title" inertia content="{{ $blog->title }}">
        <meta name="twitter:description" inertia content="{{ Str::limit($blog->description, 160) }}">
        <meta name="twitter:image" inertia content="{{ $blog->getFirstMedia('images') ? $blog->getFirstMedia('images')->getUrl('webp') : asset('images/ogimage.jpeg') }}">
    @else
        <meta property="og:title" inertia content="{{ config('app.name', 'Liwan') }}">
        <meta property="og:description" inertia content="Liwan - Innovative architecture platform designed for modern building design and construction management">
        <meta property="og:type" inertia content="website">
        <meta property="og:url" inertia content="{{ url()->current() }}">
        <meta property="og:site_name" inertia content="{{ config('app.name', 'Liwan') }}">
        <meta property="og:image" inertia content="{{ asset('images/ogimage.jpeg') }}">

        <meta name="twitter:card" inertia content="summary_large_image">
        <meta name="twitter:title" inertia content="{{ config('app.name', 'Liwan') }}">
        <meta name="twitter:description" inertia content="Liwan - Innovative architecture platform designed for modern building design and construction management">
        <meta name="twitter:image" inertia content="{{ asset('images/ogimage.jpeg') }}">
    @endif

    <link rel="icon" href="/favicon.ico" sizes="any">
    <link rel="icon" href="/favicon.svg" type="image/svg+xml">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">

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