<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Ingredient;
use App\Models\User;
use App\Models\UserInventory;
use Carbon\Carbon;

class UserInventorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Get the first user, or create one if none exists (fallback)
        $user = User::first();
        if (!$user) {
            $user = User::factory()->create();
        }

        // Get all ingredients
        $ingredients = Ingredient::all();

        if ($ingredients->count() === 0) {
            $this->command->info('No ingredients found. Run RecipeIngredientsSeeder first.');
            return;
        }

        // Take 50% of ingredients randomly
        $ingredientsToSeed = $ingredients->shuffle()->take((int)($ingredients->count() / 2));

        $locations = ['Nevera', 'Despensa', 'Congelador'];
        $units = ['g', 'ml', 'unidades', 'kg', 'L'];

        foreach ($ingredientsToSeed as $ingredient) {
            // Check if already in inventory to avoid duplicates (optional, based on requirement)
            // Here we just add, assuming we want to populate. If unique constraint exists, check first.
            $exists = UserInventory::where('user_id', $user->id)
                ->where('ingredient_id', $ingredient->id)
                ->exists();

            if (!$exists) {
                UserInventory::create([
                    'user_id' => $user->id,
                    'ingredient_id' => $ingredient->id,
                    'quantity' => rand(1, 500),
                    'unit' => $units[array_rand($units)],
                    'expiration_date' => Carbon::now()->addDays(rand(1, 180))->format('Y-m-d'),
                    'location' => $locations[array_rand($locations)],
                ]);
            }
        }
    }
}
