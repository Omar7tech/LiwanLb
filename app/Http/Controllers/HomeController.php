<?php

namespace App\Http\Controllers;

use App\Http\Resources\DesignDeliveryStandardListResource;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $designDeliveryStandards = \App\Models\DesignDeliveryStandard::where('active', true)->orderBy('order')->get();
        return Inertia::render(
            'welcome',
            ['designDeliveryStandards' => fn() => DesignDeliveryStandardListResource::collection($designDeliveryStandards)],
        );

    }
}
