<?php

namespace App\Http\Controllers;

use App\Http\Resources\FaqListResource;
use App\Models\Faq;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WorkController extends Controller
{
    public function index()
    {
        $faqs = FaqListResource::collection(Faq::where('active', true)->orderBy('order' , 'asc')->get());
        return Inertia::render('work/index', [
            'faqs' => $faqs,
        ]);
    }
}
