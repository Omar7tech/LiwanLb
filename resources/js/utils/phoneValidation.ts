// Phone number validation and formatting utilities

export interface PhoneValidationResult {
    isValid: boolean;
    formatted?: string;
    error?: string;
    country?: string;
}

// Country code patterns and formats
const COUNTRY_PATTERNS = {
    // North America
    US: {
        pattern: /^\+1(\d{10})$/,
        format: '+1 (XXX) XXX-XXXX',
        example: '+1 (555) 123-4567',
        validator: /^\+1[2-9]\d{2}[2-9]\d{6}$/,
    },
    CA: {
        pattern: /^\+1(\d{10})$/,
        format: '+1 (XXX) XXX-XXXX',
        example: '+1 (416) 555-0199',
        validator: /^\+1[2-9]\d{2}[2-9]\d{6}$/,
    },
    
    // Europe
    GB: {
        pattern: /^\+44(\d{10})$/,
        format: '+44 XXXX XXXXXX',
        example: '+44 2071 234567',
        validator: /^\+44[1-9]\d{9}$/,
    },
    DE: {
        pattern: /^\+49(\d{10,11})$/,
        format: '+49 XXX XXXXXXX',
        example: '+49 30 12345678',
        validator: /^\+49[1-9]\d{9,10}$/,
    },
    FR: {
        pattern: /^\+33(\d{9})$/,
        format: '+33 X XX XX XX XX',
        example: '+33 1 42 86 83 26',
        validator: /^\+33[1-9]\d{8}$/,
    },
    
    // Middle East
    SA: {
        pattern: /^\+966(\d{9})$/,
        format: '+966 5X XXX XXXX',
        example: '+966 50 123 4567',
        validator: /^\+9665\d{8}$/,
    },
    AE: {
        pattern: /^\+971(\d{8,9})$/,
        format: '+971 XX XXX XXXX',
        example: '+971 50 123 4567',
        validator: /^\+971[2-9]\d{7,8}$/,
    },
    
    // Asia
    IN: {
        pattern: /^\+91(\d{10})$/,
        format: '+91 XXXXX XXXXX',
        example: '+91 98765 43210',
        validator: /^\+91[6-9]\d{9}$/,
    },
    
    // General international pattern (fallback)
    INTL: {
        pattern: /^\+(\d{1,3})(\d{6,14})$/,
        format: '+XXX XXXXXXXXXX',
        example: '+XX XXX XXX XXXX',
        validator: /^\+\d{1,3}\d{6,14}$/,
    }
};

// Common phone number sanitization
export const sanitizePhoneNumber = (input: string): string => {
    // Remove all non-digit and non-plus characters
    return input.replace(/[^\d+]/g, '');
};

// Simple phone number validation (no strict regex)
export const validatePhoneNumber = (input: string): PhoneValidationResult => {
    const sanitized = sanitizePhoneNumber(input);
    
    // Check if it's empty (allowed)
    if (!sanitized) {
        return {
            isValid: true,
            formatted: '',
        };
    }
    
    // Basic length check (8-20 characters)
    if (sanitized.length < 8) {
        return {
            isValid: false,
            error: 'Phone number is too short (minimum 8 characters)'
        };
    }
    
    if (sanitized.length > 20) {
        return {
            isValid: false,
            error: 'Phone number is too long (maximum 20 characters)'
        };
    }
    
    // Must contain at least some digits
    if (!/\d/.test(sanitized)) {
        return {
            isValid: false,
            error: 'Phone number must contain at least one digit'
        };
    }
    
    return {
        isValid: true,
        formatted: sanitized,
    };
};

// Format phone number for display
export const formatPhoneNumber = (phone: string, country: string = 'INTL'): string => {
    const sanitized = sanitizePhoneNumber(phone);
    const config = COUNTRY_PATTERNS[country as keyof typeof COUNTRY_PATTERNS] || COUNTRY_PATTERNS.INTL;
    
    if (country === 'INTL') {
        // Simple formatting for international numbers
        const match = sanitized.match(/^\+(\d{1,3})(\d{6,14})$/);
        if (match) {
            const [, countryCode, number] = match;
            return `+${countryCode} ${number.slice(0, 3)} ${number.slice(3, 6)} ${number.slice(6)}`;
        }
        return sanitized;
    }
    
    // Country-specific formatting
    const match = sanitized.match(config.pattern);
    if (match) {
        const baseNumber = match[1];
        switch (country) {
            case 'US':
            case 'CA':
                return `+1 (${baseNumber.slice(0, 3)}) ${baseNumber.slice(3, 6)}-${baseNumber.slice(6)}`;
            case 'GB':
                return `+44 ${baseNumber.slice(0, 4)} ${baseNumber.slice(4)}`;
            case 'DE':
                return `+49 ${baseNumber.slice(0, 3)} ${baseNumber.slice(3)}`;
            case 'FR':
                return `+33 ${baseNumber.slice(0, 1)} ${baseNumber.slice(1, 3)} ${baseNumber.slice(3, 5)} ${baseNumber.slice(5, 7)} ${baseNumber.slice(7)}`;
            case 'SA':
                return `+966 ${baseNumber.slice(0, 1)} ${baseNumber.slice(1, 4)} ${baseNumber.slice(4, 8)}`;
            case 'AE':
                return `+971 ${baseNumber.slice(0, 2)} ${baseNumber.slice(2, 5)} ${baseNumber.slice(5)}`;
            case 'IN':
                return `+91 ${baseNumber.slice(0, 5)} ${baseNumber.slice(5)}`;
            default:
                return sanitized;
        }
    }
    
    return sanitized;
};

// Simple phone input formatting (no auto-formatting)
export const formatPhoneInput = (input: string, previousValue: string): string => {
    const sanitized = sanitizePhoneNumber(input);
    
    // If user is deleting, don't auto-format
    if (sanitized.length < previousValue.replace(/[^\d+]/g, '').length) {
        return sanitized;
    }
    
    // Just return sanitized input (no automatic formatting)
    return sanitized;
};

// Get phone number examples for help text
export const getPhoneExamples = (): string[] => {
    return [
        '+961 1 234 567 (Lebanon)',
        '+961 3 123 456 (Lebanon Mobile)',
        '+1 (555) 123-4567 (US/Canada)',
        '+44 2071 234567 (UK)',
        '+33 1 42 86 83 26 (France)',
        '+49 30 12345678 (Germany)',
        '+966 50 123 4567 (Saudi Arabia)',
        '+971 50 123 4567 (UAE)',
        '+91 98765 43210 (India)'
    ];
};
