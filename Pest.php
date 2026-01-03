<?php

/*
|--------------------------------------------------------------------------
| Test Case
|--------------------------------------------------------------------------
|
| The closure you provide to your test case is bound to your application's
| container and is resolved via Laravel's service container. This allows
| you to leverage all of Laravel's facades and testing helpers.
|
*/

uses(
    Tests\TestCase::class,
    // Illuminate\Foundation\Testing\RefreshDatabase::class,
)->in('Feature');

/*
|--------------------------------------------------------------------------
| Expectations
|--------------------------------------------------------------------------
|
| Here you may define all of your "expectation" helpers, which are
| short-hand functions that make your assertions more readable
| and fluent.
|
*/

/*
|--------------------------------------------------------------------------
| Functions
|--------------------------------------------------------------------------
|
| While Pest is very powerful out-of-the-box, you may want to customize
| some of its behavior or add additional functionality. This file
| is the perfect place to do that. Feel free to add new code to this
| file without worrying about breaking anything.
|
*/
