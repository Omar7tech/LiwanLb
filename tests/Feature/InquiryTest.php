<?php

use App\Models\Inquiry;

test('inquiry can be submitted with valid data', function () {
    $data = [
        'full_name' => 'John Doe',
        'phone' => '+1234567890',
        'email' => 'john@example.com',
        'project_type' => 'Residential',
        'project_location' => 'New York',
        'notes' => 'Looking for a modern design',
    ];

    $response = $this->post(route('inquiry.store'), $data);

    $response->assertRedirect();
    $response->assertSessionHas('success');

    $this->assertDatabaseHas('inquiries', [
        'full_name' => 'John Doe',
        'email' => 'john@example.com',
    ]);
});

test('inquiry requires full name', function () {
    $data = [
        'phone' => '+1234567890',
        'email' => 'john@example.com',
    ];

    $response = $this->post(route('inquiry.store'), $data);

    $response->assertSessionHasErrors('full_name');
});

test('inquiry requires phone', function () {
    $data = [
        'full_name' => 'John Doe',
        'email' => 'john@example.com',
    ];

    $response = $this->post(route('inquiry.store'), $data);

    $response->assertSessionHasErrors('phone');
});

test('inquiry requires valid email', function () {
    $data = [
        'full_name' => 'John Doe',
        'phone' => '+1234567890',
        'email' => 'invalid-email',
    ];

    $response = $this->post(route('inquiry.store'), $data);

    $response->assertSessionHasErrors('email');
});

test('inquiry can be submitted with only required fields', function () {
    $data = [
        'full_name' => 'Jane Smith',
        'phone' => '+9876543210',
        'email' => 'jane@example.com',
    ];

    $response = $this->post(route('inquiry.store'), $data);

    $response->assertRedirect();
    $this->assertDatabaseHas('inquiries', [
        'full_name' => 'Jane Smith',
        'email' => 'jane@example.com',
        'project_type' => null,
        'project_location' => null,
        'notes' => null,
    ]);
});

test('phone number can submit up to 3 inquiries', function () {
    $phone = '+1111111111';

    // Submit 3 inquiries with the same phone number
    for ($i = 1; $i <= 3; $i++) {
        $data = [
            'full_name' => "User {$i}",
            'phone' => $phone,
            'email' => "user{$i}@example.com",
        ];

        $response = $this->post(route('inquiry.store'), $data);
        $response->assertRedirect();
        $response->assertSessionHas('success');
    }

    // Verify all 3 inquiries were created
    expect(Inquiry::where('phone', $phone)->count())->toBe(3);
});

test('phone number cannot submit more than 3 inquiries', function () {
    $phone = '+2222222222';

    // Create 3 existing inquiries
    Inquiry::factory()->count(3)->create(['phone' => $phone]);

    // Try to submit a 4th inquiry
    $data = [
        'full_name' => 'User 4',
        'phone' => $phone,
        'email' => 'user4@example.com',
    ];

    $response = $this->post(route('inquiry.store'), $data);

    $response->assertSessionHasErrors('phone');
    $response->assertSessionHasErrorsIn('default', [
        'phone' => 'This phone number has already been used for the maximum number of inquiries (3). Please contact us directly for additional requests.'
    ]);

    // Verify the 4th inquiry was not created
    expect(Inquiry::where('phone', $phone)->count())->toBe(3);
});

test('email address can submit up to 3 inquiries', function () {
    $email = 'test@example.com';

    // Submit 3 inquiries with the same email address
    for ($i = 1; $i <= 3; $i++) {
        $data = [
            'full_name' => "User {$i}",
            'phone' => "+333333333{$i}",
            'email' => $email,
        ];

        $response = $this->post(route('inquiry.store'), $data);
        $response->assertRedirect();
        $response->assertSessionHas('success');
    }

    // Verify all 3 inquiries were created
    expect(Inquiry::where('email', $email)->count())->toBe(3);
});

test('email address cannot submit more than 3 inquiries', function () {
    $email = 'blocked@example.com';

    // Create 3 existing inquiries
    Inquiry::factory()->count(3)->create(['email' => $email]);

    // Try to submit a 4th inquiry
    $data = [
        'full_name' => 'User 4',
        'phone' => '+4444444444',
        'email' => $email,
    ];

    $response = $this->post(route('inquiry.store'), $data);

    $response->assertSessionHasErrors('email');
    $response->assertSessionHasErrorsIn('default', [
        'email' => 'This email address has already been used for the maximum number of inquiries (3). Please contact us directly for additional requests.'
    ]);

    // Verify the 4th inquiry was not created
    expect(Inquiry::where('email', $email)->count())->toBe(3);
});

test('phone number accepts valid format', function () {
    $response = $this->post(route('inquiry.store'), [
        'full_name' => 'John Doe',
        'phone' => '+9613123456',
        'email' => 'valid-phone@example.com',
    ]);
    $response->assertSessionHasNoErrors();
});

test('phone number rejects invalid format', function () {
    $response = $this->post(route('inquiry.store'), [
        'full_name' => 'John Doe',
        'phone' => '+9613abc456',
        'email' => 'invalid-phone@example.com',
    ]);
    $response->assertSessionHasErrors('phone');
});

test('honeypot blocks spam', function () {
    $response = $this->post(route('inquiry.store'), [
        'full_name' => 'Spam Bot',
        'phone' => '+9613123456',
        'email' => 'bot@example.com',
        'fax' => 'I am a bot',
    ]);

    $response->assertStatus(403);
});

test('phone number sanitizes spaces', function () {
    $response = $this->post(route('inquiry.store'), [
        'full_name' => 'John Doe',
        'phone' => '+961 3 123 456',
        'email' => 'spaces-phone@example.com',
    ]);
    
    $response->assertSessionHasNoErrors();
    $this->assertDatabaseHas('inquiries', [
        'email' => 'spaces-phone@example.com',
        'phone' => '+9613123456', // Spaces removed
    ]);
});
