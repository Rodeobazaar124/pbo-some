<?php

use App\Models\User;
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
        Schema::create('tvs', function (Blueprint $table) {
            $table->id();
            $table->string('slug');
            $table->string('image')->default('[]');
            $table->string('name');
            $table->integer('volume')->default(25);
            $table->boolean('status')->default(0);
            $table->foreignIdFor(User::class)->constrained();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tvs');
    }
};
