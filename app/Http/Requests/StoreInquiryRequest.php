<?php

namespace App\Http\Requests;

use App\Models\Inquiry;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;

class StoreInquiryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation(): void
    {
        // Honeypot check
        if ($this->input('fax')) {
            abort(403, 'Spam detected.');
        }

        if ($this->has('phone')) {
            $this->merge([
                'phone' => str_replace(' ', '', $this->input('phone')),
            ]);
        }

        // Sanitize notes to prevent XSS
        if ($this->has('notes')) {
            $this->merge([
                'notes' => strip_tags($this->input('notes')),
            ]);
        }
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'full_name' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'string', 'max:20', 'regex:/^\+[0-9]+$/'],
            'email' => ['required', 'email', 'max:255'],
            'project_type' => ['nullable', 'string', 'max:255'],
            'project_location' => ['nullable', 'string', 'max:255'],
            'notes' => ['nullable', 'string', 'max:1000'],
        ];
    }

    /**
     * Configure the validator instance.
     */
    public function withValidator(Validator $validator): void
    {
        $validator->after(function (Validator $validator) {
            $phone = $this->input('phone');
            $email = $this->input('email');
            
            // Check phone number limit
            if ($phone) {
                $phoneInquiryCount = Inquiry::where('phone', $phone)->count();
                
                if ($phoneInquiryCount >= 3) {
                    $validator->errors()->add(
                        'phone',
                        'This phone number has already been used for the maximum number of inquiries (3). Please contact us directly for additional requests.'
                    );
                }
            }

            // Check email limit
            if ($email) {
                $emailInquiryCount = Inquiry::where('email', $email)->count();
                
                if ($emailInquiryCount >= 3) {
                    $validator->errors()->add(
                        'email',
                        'This email address has already been used for the maximum number of inquiries (3). Please contact us directly for additional requests.'
                    );
                }
            }
        });
    }

    /**
     * Get custom error messages for validation rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'full_name.required' => 'Full name is required.',
            'full_name.max' => 'Full name cannot exceed 255 characters.',
            'phone.required' => 'Phone number is required.',
            'phone.max' => 'Phone number cannot exceed 20 characters.',
            'email.required' => 'Email address is required.',
            'email.email' => 'Please provide a valid email address.',
            'email.max' => 'Email address cannot exceed 255 characters.',
            'project_type.max' => 'Project type cannot exceed 255 characters.',
            'project_location.max' => 'Project location cannot exceed 255 characters.',
            'notes.max' => 'Notes cannot exceed 1000 characters.',
        ];
    }
}
