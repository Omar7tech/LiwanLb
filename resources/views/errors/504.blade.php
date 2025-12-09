<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>504 - Gateway Timeout</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap" rel="stylesheet">
    <style>body{font-family:'Cairo',sans-serif;}</style>
</head>
<body class="bg-gray-50 min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4 py-8">
    <div class="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div class="absolute -top-20 -left-20 w-40 h-40 sm:w-64 sm:h-64 bg-violet-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div class="absolute top-0 -right-20 w-40 h-40 sm:w-64 sm:h-64 bg-violet-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div class="absolute -bottom-32 left-20 w-40 h-40 sm:w-64 sm:h-64 bg-violet-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
    </div>
    <div class="bg-white/80 backdrop-blur-lg p-6 sm:p-8 md:p-10 rounded-2xl shadow-2xl text-center max-w-lg w-full z-10 border border-white/20">
        <div class="mb-6 sm:mb-8 flex justify-center">
            <img src="{{ asset('images/logo.png') }}" alt="Logo" class="h-16 sm:h-20 md:h-24 w-auto object-contain drop-shadow-md">
        </div>
        <div class="mb-6">
            <h1 class="text-6xl sm:text-7xl md:text-8xl font-bold text-violet-500 mb-2">504</h1>
            <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 sm:mb-4 tracking-tight">Gateway Timeout</h2>
        </div>
        <p class="text-gray-600 mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed">
            The server, while acting as a gateway or proxy, did not receive a timely response <br class="hidden sm:inline">
            from an upstream server it needed to access to complete the request.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button onclick="window.location.reload()" class="inline-block bg-violet-500 hover:bg-violet-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl">
                Try Again
            </button>
            <a href="{{ route('home') }}" class="inline-block bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-6 py-3 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl">
                Go Home
            </a>
        </div>
    </div>
    <style>
        .animate-blob{animation:blob 7s infinite;}
        .animation-delay-2000{animation-delay:2s;}
        .animation-delay-4000{animation-delay:4s;}
        @keyframes blob{
            0%{transform:translate(0,0) scale(1);}
            33%{transform:translate(30px,-50px) scale(1.1);}
            66%{transform:translate(-20px,20px) scale(0.9);}
            100%{transform:translate(0,0) scale(1);}
        }
    </style>
</body>
</html>
