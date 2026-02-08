<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class RecipeIngredientsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $ingredients = [
            // Pasta Carbonara
            ['name' => 'Espaguetis', 'category' => 'Pasta', 'description' => 'Pasta larga de sémola de trigo duro.'],
            ['name' => 'Huevos', 'category' => 'Lácteos y Huevos', 'description' => 'Huevos frescos de gallina.'],
            ['name' => 'Queso Pecorino', 'category' => 'Lácteos y Huevos', 'description' => 'Queso italiano de oveja, curado y salado.'],
            ['name' => 'Guanciale', 'category' => 'Carnes', 'description' => 'Chacina italiana preparada con careta o carrillo de cerdo.'],
            ['name' => 'Pimienta negra', 'category' => 'Especias', 'description' => 'Especia picante obtenida de los frutos secos del Piper nigrum.'],

            // Pollo al Curry
            ['name' => 'Pechuga de pollo', 'category' => 'Carnes', 'description' => 'Carne magra de pollo, sin hueso ni piel.'],
            ['name' => 'Leche de coco', 'category' => 'Despensa', 'description' => 'Leche vegetal extraída de la pulpa del coco.'],
            ['name' => 'Cebolla', 'category' => 'Verduras', 'description' => 'Hortaliza de bulbo comestible.'],
            ['name' => 'Ajo', 'category' => 'Verduras', 'description' => 'Cabeza de ajo, usada como condimento.'],
            ['name' => 'Jengibre', 'category' => 'Verduras', 'description' => 'Raíz picante y aromática.'],
            ['name' => 'Curry en polvo', 'category' => 'Especias', 'description' => 'Mezcla de especias de origen indio.'],
            ['name' => 'Cúrcuma', 'category' => 'Especias', 'description' => 'Especia aromática de color amarillo intenso.'],

            // Ensalada César
            ['name' => 'Lechuga romana', 'category' => 'Verduras', 'description' => 'Variedad de lechuga de hojas largas y robustas.'],
            ['name' => 'Pan', 'category' => 'Panadería', 'description' => 'Pan para hacer crutones.'],
            ['name' => 'Queso Parmesano', 'category' => 'Lácteos y Huevos', 'description' => 'Queso italiano de vaca, duro y granular.'],
            ['name' => 'Anchoas', 'category' => 'Pescados y Mariscos', 'description' => 'Filetes de anchoa en conserva.'],
            ['name' => 'Aceite de oliva', 'category' => 'Despensa', 'description' => 'Aceite vegetal extraído de la aceituna.'],
            // 'Yema de huevo' is likely already covered by 'Huevos' or can be treated as part of it, but adding for completeness if strict matching needed.
            // Adjusting to distinct ingredients based on common inventory usage.
        ];

        // Remove duplicates based on name
        $uniqueIngredients = collect($ingredients)->unique('name')->values()->all();

        foreach ($uniqueIngredients as $ingredient) {
            // Check if ingredient already exists to avoid duplicates during re-seeding
            $exists = DB::table('ingredients')->where('name', $ingredient['name'])->exists();

            if (!$exists) {
                DB::table('ingredients')->insert([
                    'name' => $ingredient['name'],
                    'category' => $ingredient['category'],
                    'description' => $ingredient['description'],
                    'image' => null, // Placeholder as requested
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now(),
                ]);
            }
        }
    }
}
