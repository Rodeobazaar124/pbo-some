<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\tv>
 */
class LampFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = 'Lampu ' . fake()->name();
        return [
            'name' => $name,
            'slug' => \Illuminate\Support\Str::slug($name),
            'status' => fake()->boolean(),
            'timer' => fake()->time(),
            'user_id' => 1,
        ];
    }
}
