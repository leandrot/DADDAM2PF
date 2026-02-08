<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('stores', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->string('address');
            // Latitud: 10 dígitos en total, 8 decimales (ej. 40.712776)
            $table->decimal('latitude', 10, 8);
            // Longitud: 11 dígitos en total, 8 decimales (ej. -74.005974)
            $table->decimal('longitude', 11, 8);
            $table->text('schedule')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('stores');
    }
};
