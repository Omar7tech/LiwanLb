<?php

namespace App\Http\Controllers;

use App\Http\Resources\ResidencyResource;
use App\Models\Residency;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ResidencyController extends Controller
{
    public function show(Residency $residency)
    {
        $residency->load('residencyContents');
        return Inertia::render('residency/show', [
            'residency' => new ResidencyResource($residency),
        ]);
    }
}
