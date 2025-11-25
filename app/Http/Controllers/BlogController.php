<?php

namespace App\Http\Controllers;

use App\Http\Resources\BlogCollection;
use App\Http\Resources\BlogListResource;
use App\Http\Resources\BlogResource;
use App\Models\Blog;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BlogController extends Controller
{
    public function index()
    {
        $blogs = Blog::paginate(8);
        return Inertia::render('blogs/index', ['blogs' => fn() => BlogListResource::collection($blogs)]);
    }

    public function show(Blog $blog)
    {
        return Inertia::render('blogs/show', ['blog' => $blog->toResource()]);
    }
}
