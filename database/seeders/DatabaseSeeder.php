<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();
        \App\Models\User::factory()->create([
            'name' => 'Demo Account',
            'email' => 'example@mail.com',
            'password' => Hash::make('password'),
        ]);
        \App\Models\ac::factory(5)->create();
        \App\Models\tv::factory(5)->create();
        \App\Models\lamp::factory(5)->create();

    }
}
