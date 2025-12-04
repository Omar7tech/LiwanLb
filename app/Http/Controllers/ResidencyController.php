<?php

namespace App\Http\Controllers;

use App\Models\Residency;
use Illuminate\Http\Request;

class ResidencyController extends Controller
{
    public function show(Residency $residency ){
        dd($residency);
    }
}
