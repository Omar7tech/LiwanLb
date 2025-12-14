<x-filament-panels::page class="max-w-5xl mx-auto space-y-16">

    <div>
        <h1 class="text-2xl font-semibold text-gray-900 dark:text-white">
            Support
        </h1>

        <p class="mt-2 text-sm text-gray-500 dark:text-gray-400 max-w-xl">
            Contact support using one of the methods below. We aim to respond as quickly as possible.
        </p>

        <p class="mt-4 text-xs text-gray-500 italic">
            Managed by <strong>Omar Abi Farraj</strong>
        </p>
    </div>

    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

        <x-filament::card class="p-6">
            <div class="flex items-start gap-4">
                <x-filament::icon icon="heroicon-o-envelope" class="h-6 w-6 text-gray-400" />

                <div class="flex-1">
                    <h3 class="text-sm font-medium text-gray-900 dark:text-white">
                        Email
                    </h3>

                    <p class="mt-1 text-sm text-gray-500">
                        For detailed inquiries and attachments.
                    </p>

                    <div class="mt-4">
                        <x-filament::button size="sm" color="gray" tag="a" href="mailto:omar.7tech@gmail.com">
                            omar.7tech@gmail.com
                        </x-filament::button>
                    </div>
                </div>
            </div>
        </x-filament::card>

        <x-filament::card class="p-6">
            <div class="flex items-start gap-4">
                <x-filament::icon icon="heroicon-o-chat-bubble-left-right" class="h-6 w-6 text-gray-400" />

                <div class="flex-1">
                    <h3 class="text-sm font-medium text-gray-900 dark:text-white">
                        WhatsApp
                    </h3>

                    <p class="mt-1 text-sm text-gray-500">
                        Quick replies during working hours.
                    </p>

                    <div class="mt-4">
                        <x-filament::button size="sm" color="gray" tag="a"
                            href="https://wa.me/96171387946?text=Hello! I'm visiting from the LiwanLB website and I need support assistance. Could you please help me with my inquiry?"
                            target="_blank">
                            +961 71 387 946
                        </x-filament::button>
                    </div>
                </div>
            </div>
        </x-filament::card>
        <br>
        <x-filament::card class="p-6">
            <div class="flex items-start gap-4">
                <x-filament::icon icon="heroicon-o-phone" class="h-6 w-6 text-gray-400" />

                <div class="flex-1">
                    <h3 class="text-sm font-medium text-gray-900 dark:text-white">
                        Phone
                    </h3>

                    <p class="mt-1 text-sm text-gray-500">
                        Urgent or complex matters.
                    </p>

                    <div class="mt-4">
                        <x-filament::button size="sm" color="gray" tag="a" href="tel:+96171387946">
                            +961 71 387 946
                        </x-filament::button>
                    </div>
                </div>
            </div>
        </x-filament::card>

    </div>


    <div class="max-w-xl">
        <h2 class="text-sm font-medium text-gray-900 dark:text-white">
            Response times
        </h2>

        <ul class="mt-3 space-y-2 text-sm text-gray-500">
            <li>
                <strong class="text-gray-700 dark:text-gray-300">
                    WhatsApp & Phone:
                </strong>
                1–4 hours
            </li>

            <li>
                <strong class="text-gray-700 dark:text-gray-300">
                    Email:
                </strong>
                within 24 hours
            </li>
        </ul>
    </div>

    <div class="pt-8 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500">
        © {{ date('Y') }} <strong>Omar Abi Farraj</strong>
    </div>

</x-filament-panels::page>