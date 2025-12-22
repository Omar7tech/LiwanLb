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
        // Enhanced bot detection
        if ($this->input('fax') || $this->input('website') || $this->input('url')) {
            abort(403, 'Spam detected.');
        }

        // Timestamp validation with stricter timing
        if ($this->has('timestamp')) {
            $submissionTime = (int) $this->input('timestamp');
            $timeDiff = time() - $submissionTime;
            
            if ($timeDiff < 5 || $timeDiff > 3600) { // 5 seconds to 1 hour
                abort(403, 'Invalid submission timing.');
            }
        }

        // IP-based rate limiting
        $ip = $this->ip();
        $recentSubmissions = Inquiry::where('ip_address', $ip)
            ->where('created_at', '>', now()->subMinutes(30))
            ->count();
        
        if ($recentSubmissions >= 5) {
            abort(429, 'Too many submissions. Please try again later.');
        }

        // Enhanced phone sanitization
        if ($this->has('phone')) {
            $phone = preg_replace('/[^0-9+]/', '', $this->input('phone'));
            $this->merge(['phone' => $phone]);
        }

        // Strong XSS protection and input sanitization
        $this->merge([
            'full_name' => $this->sanitizeInput($this->input('full_name') ?? ''),
            'project_type' => $this->sanitizeInput($this->input('project_type') ?? ''),
            'project_location' => $this->sanitizeInput($this->input('project_location') ?? ''),
            'notes' => $this->sanitizeInput($this->input('notes') ?? ''),
            'type' => in_array($this->input('type'), ['client', 'partner']) ? $this->input('type') : 'client',
            'ip_address' => $ip,
            'user_agent' => substr($this->userAgent(), 0, 500),
        ]);
    }

    /**
     * Enhanced input sanitization
     */
    private function sanitizeInput(string $input): string
    {
        // Remove HTML tags and encode special characters
        $cleaned = strip_tags($input);
        $cleaned = htmlspecialchars($cleaned, ENT_QUOTES | ENT_HTML5, 'UTF-8');
        
        // Remove potentially dangerous characters
        $cleaned = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/', '', $cleaned);
        
        // Limit length
        return substr(trim($cleaned), 0, 1000);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'full_name' => ['required', 'string', 'max:255', 'regex:/^[a-zA-Z\s\-\'\.]+$/'],
            'phone' => ['required', 'string', 'max:20', 'regex:/^\+[1-9][0-9]{6,14}$/'],
            'email' => ['nullable', 'email', 'max:255', 'regex:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/'],
            'project_type' => ['nullable', 'string', 'max:255', 'regex:/^[a-zA-Z0-9\s\-\'\.]+$/'],
            'project_location' => ['nullable', 'string', 'max:255', 'regex:/^[a-zA-Z0-9\s\-\'\.,]+$/'],
            'notes' => ['nullable', 'string', 'max:1000', 'regex:/^[a-zA-Z0-9\s\-\'\.,!?;:()]+$/'],
            'type' => ['required', 'string', 'in:client,partner'],
            'timestamp' => ['required', 'numeric', 'min:' . (time() - 3600), 'max:' . time()],
            'ip_address' => ['nullable', 'string', 'max:45', 'regex:/^[0-9.:a-fA-F]+$/'],
            'user_agent' => ['nullable', 'string', 'max:500'],
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
            $ip = $this->ip();

            // Enhanced phone number limit with time window
            if ($phone) {
                $phoneInquiryCount = Inquiry::where('phone', $phone)
                    ->where('created_at', '>', now()->subDays(7))
                    ->count();

                if ($phoneInquiryCount >= 3) {
                    $validator->errors()->add(
                        'phone',
                        'Submission limit reached for this phone number. Please contact us directly.'
                    );
                }
            }

            // Enhanced email limit with time window
            if ($email) {
                $emailInquiryCount = Inquiry::where('email', $email)
                    ->where('created_at', '>', now()->subDays(7))
                    ->count();

                if ($emailInquiryCount >= 3) {
                    $validator->errors()->add(
                        'email',
                        'Submission limit reached for this email address. Please contact us directly.'
                    );
                }
            }

            // Check for suspicious patterns
            $fullName = $this->input('full_name', '');
            $notes = $this->input('notes', '');
            
            // Detect repeated characters (common in spam)
            if (preg_match('/(.)\1{4,}/', $fullName) || preg_match('/(.)\1{4,}/', $notes)) {
                $validator->errors()->add('full_name', 'Invalid input detected.');
            }

            // Detect excessive capitalization
            if (mb_strtoupper($fullName) === $fullName && strlen($fullName) > 10) {
                $validator->errors()->add('full_name', 'Invalid name format.');
            }

            // Detect URLs in notes
            if (preg_match('/https?:\/\//', $notes)) {
                $validator->errors()->add('notes', 'URLs are not allowed in notes.');
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
            'project_type.required' => 'Project type is required.',
            'project_type.max' => 'Project type cannot exceed 255 characters.',
            'project_location.max' => 'Project location cannot exceed 255 characters.',
            'notes.max' => 'Notes cannot exceed 1000 characters.',
        ];
    }
}
