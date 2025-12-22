<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreInquiryRequest;
use App\Models\Inquiry;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

class InquiryController extends Controller
{
    public function store(StoreInquiryRequest $request)
    {
        // CSRF protection is automatically handled by Laravel's web middleware group
        
        try {
            $validated = $request->validated();
            
            // Additional security checks
            if ($this->isSuspiciousSubmission($validated, $request)) {
                Log::warning('Suspicious inquiry submission blocked', [
                    'ip' => $request->ip(),
                    'validated_data' => $this->sanitizeLogData($validated)
                ]);
                abort(403, 'Suspicious activity detected.');
            }

            // Final data sanitization before database insertion
            $sanitizedData = $this->sanitizeInquiryData($validated);

            // Log the inquiry for security monitoring
            Log::info('New inquiry submission', [
                'ip' => $request->ip(),
                'user_agent' => substr($request->userAgent(), 0, 100),
                'phone' => substr($sanitizedData['phone'], 0, 10) . '***',
                'email' => $sanitizedData['email'] ?? 'not provided',
                'type' => $sanitizedData['type']
            ]);

            // Create the inquiry with sanitized data using DB transaction
            DB::transaction(function () use ($sanitizedData) {
                Inquiry::create($sanitizedData);
            });

            // Redirect back with success message
            return redirect()->back()
                ->with('success', 'Your inquiry has been submitted successfully! We will contact you soon.');

        } catch (\Exception $e) {
            // Log the error for security monitoring
            Log::error('Inquiry submission failed', [
                'error' => $e->getMessage(),
                'ip' => $request->ip(),
                'trace' => $e->getTraceAsString()
            ]);

            return redirect()->back()
                ->with('error', 'There was an issue submitting your inquiry. Please try again.')
                ->withInput();
        }
    }

    /**
     * Check for suspicious submission patterns
     */
    private function isSuspiciousSubmission(array $data, $request): bool
    {
        // Check for rapid submissions from same IP
        $recentCount = Inquiry::where('ip_address', $request->ip())
            ->where('created_at', '>', now()->subMinutes(1))
            ->count();
        
        if ($recentCount >= 2) {
            return true;
        }

        // Check for blocked IPs (you can implement this in a separate service)
        $blockedIps = []; // Add your blocked IPs here
        if (in_array($request->ip(), $blockedIps)) {
            return true;
        }

        // Check for suspicious content patterns
        $suspiciousPatterns = [
            '/test/i',
            '/spam/i',
            '/xxx/i',
            '/casino/i',
            '/loan/i',
            '/viagra/i',
            '/cialis/i'
        ];

        $textFields = [$data['full_name'] ?? '', $data['notes'] ?? ''];
        foreach ($textFields as $field) {
            foreach ($suspiciousPatterns as $pattern) {
                if (preg_match($pattern, $field)) {
                    return true;
                }
            }
        }

        return false;
    }

    /**
     * Sanitize inquiry data before database insertion
     */
    private function sanitizeInquiryData(array $data): array
    {
        return [
            'full_name' => substr(trim($data['full_name']), 0, 255),
            'phone' => substr(preg_replace('/[^0-9+]/', '', $data['phone']), 0, 20),
            'email' => isset($data['email']) ? substr(strtolower(trim($data['email'])), 0, 255) : null,
            'project_type' => isset($data['project_type']) ? substr(trim($data['project_type']), 0, 255) : null,
            'project_location' => isset($data['project_location']) ? substr(trim($data['project_location']), 0, 255) : null,
            'notes' => isset($data['notes']) ? substr(trim($data['notes']), 0, 1000) : null,
            'type' => in_array($data['type'], ['client', 'partner']) ? $data['type'] : 'client',
            'ip_address' => substr($data['ip_address'], 0, 45),
            'user_agent' => substr($data['user_agent'], 0, 500),
        ];
    }

    /**
     * Sanitize data for logging (remove sensitive information)
     */
    private function sanitizeLogData(array $data): array
    {
        $sanitized = $data;
        if (isset($sanitized['phone'])) {
            $sanitized['phone'] = substr($sanitized['phone'], 0, 6) . '***';
        }
        if (isset($sanitized['email'])) {
            $sanitized['email'] = substr($sanitized['email'], 0, 3) . '***@' . substr(strstr($sanitized['email'], '@'), 1);
        }
        return $sanitized;
    }
}
