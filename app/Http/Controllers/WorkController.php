<?php

namespace App\Http\Controllers;

use App\Http\Resources\FaqListResource;
use App\Http\Resources\ResidencyListResource;
use App\Http\Resources\WorkListResource;
use App\Http\Resources\WorkResource;
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
        $work->load(['Faqs', 'Testimonials']);
        
        return Inertia::render('work/show', [
            'work' => new WorkResource($work),
            'residencies' => Inertia::scroll(
                fn() => ResidencyListResource::collection(
                    $work->Residencies()->with('media')->paginate(6)
                )
            ),
            'testimonials' => fn() => \App\Http\Resources\TestimonialListResource::collection($work->Testimonials)
        ]);
    }
}
