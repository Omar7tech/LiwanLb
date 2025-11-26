<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('design_delivery_standards', function (Blueprint $table) {
            $table->id();
            $table->string('english_title')->nullable();
            $table->text('english_description')->nullable();
            $table->string('arabic_title')->nullable();
            $table->text('arabic_description')->nullable();
            $table->integer('order')->default(0);
            $table->boolean('active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('design_delivery_standards');
    }
};
