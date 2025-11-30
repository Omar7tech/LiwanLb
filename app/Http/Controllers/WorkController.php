<?php

namespace App\Http\Controllers;

use App\Http\Resources\FaqListResource;
use App\Http\Resources\ResidencyListResource;
use App\Http\Resources\WorkListResource;
use App\Models\Faq;
use App\Models\Residency;
use App\Models\Work;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WorkController extends Controller
{
    public function index()
    {
        
        return Inertia::render('work/index', [
            'works' => fn() => WorkListResource::collection(Work::all())
        ]);
    }

    public function show(Work $work){
        return Inertia::render('work/show', [
            'work' => $work
        ]);
    }
}
