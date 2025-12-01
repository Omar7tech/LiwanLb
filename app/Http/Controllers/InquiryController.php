<?php


namespace App\Http\Controllers;

use App\Http\Requests\StoreInquiryRequest;
use App\Models\Inquiry;

class InquiryController extends Controller
{
    public function store(StoreInquiryRequest $request)
    {
        // Create the inquiry with validated data
        Inquiry::create($request->validated());

        // Redirect back with success message
        return redirect()->back()->with('success', 'Your inquiry has been submitted successfully! We will contact you soon.');
    }
}
