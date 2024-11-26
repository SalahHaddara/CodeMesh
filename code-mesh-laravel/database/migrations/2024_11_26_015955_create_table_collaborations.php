<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('table_collaborations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('owner_id');
            $table->foreignId('collaborator_id');
            $table->enum('role', ['viewer', 'editor', 'admin'])->default('viewer');
            $table->timestamps();

            $table->unique(['owner_id', 'collaborator_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('table_collaborations');
    }
};
