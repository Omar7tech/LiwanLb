<?php

namespace App\Http\Controllers;

use App\Http\Resources\FaqListResource;
use App\Http\Resources\ResidencyListResource;
use App\Models\Faq;
use App\Models\Residency;
use App\Models\Work;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WorkController extends Controller
{
    public function index()
    {
        $faqs = FaqListResource::collection(Faq::where('active', true)->orderBy('order' , 'asc')->get());
        $residencies = Residency::where('active', true)->orderBy('order','asc')->paginate(6);
        return Inertia::render('work/index', [
            'faqs' => $faqs,
            'residencies' =>Inertia::scroll(fn() => ResidencyListResource::collection($residencies))
        ]);
    }

    public function show(Work $work){
        return Inertia::render('work/show', [
            'work' => $work
        ]);
    }
}
