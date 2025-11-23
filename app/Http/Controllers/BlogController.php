<?php

namespace App\Http\Controllers;

use App\Http\Resources\BlogCollection;
use App\Http\Resources\BlogListResource;
use App\Models\Blog;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BlogController extends Controller
{
    public function index()
    {

        $blogs = Blog::paginate(5);
        return Inertia::render('blogs/index', ['blogs' => BlogListResource::collection($blogs)]);
    }
}
