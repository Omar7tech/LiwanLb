<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>404 - Page Not Found</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Cairo', sans-serif;
        }
    </style>
</head>
<body class="bg-gray-50 min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4 py-8">
    <!-- Background Decoration -->
    <div class="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div class="absolute -top-20 -left-20 w-40 h-40 sm:w-64 sm:h-64 bg-red-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div class="absolute top-0 -right-20 w-40 h-40 sm:w-64 sm:h-64 bg-red-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div class="absolute -bottom-32 left-20 w-40 h-40 sm:w-64 sm:h-64 bg-red-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
    </div>

    <div class="bg-white/80 backdrop-blur-lg p-6 sm:p-8 md:p-10 rounded-2xl shadow-2xl text-center max-w-lg w-full z-10 border border-white/20">
        <div class="mb-6 sm:mb-8 flex justify-center">
            <img src="{{ asset('images/logo.png') }}" alt="Logo" class="h-16 sm:h-20 md:h-24 w-auto object-contain drop-shadow-md">
        </div>
        
        <div class="mb-6">
            <h1 class="text-6xl sm:text-7xl md:text-8xl font-bold text-red-500 mb-2">404</h1>
            <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 sm:mb-4 tracking-tight">Page Not Found</h2>
        </div>
        
        <p class="text-gray-600 mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed">
            Oops! The page you're looking for doesn't exist. <br class="hidden sm:inline">
            It might have been moved or deleted.
        </p>

        <a href="{{ route('home') }}" class="inline-block bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl">
            Go Back Home
        </a>
    </div>

    <style>
        .animate-blob {
            animation: blob 7s infinite;
        }
        .animation-delay-2000 {
            animation-delay: 2s;
        }
        .animation-delay-4000 {
            animation-delay: 4s;
        }
        @keyframes blob {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
            100% { transform: translate(0px, 0px) scale(1); }
        }
    </style>
</body>
</html>
