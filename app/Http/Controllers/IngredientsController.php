<?php

namespace App\Http\Controllers;

use App\Models\Ingredient;
use Illuminate\Http\Request;

class IngredientsController extends Controller
{
    public function index(Request $request)
    {
        if ($request->has('all')) {
            return response()->json(['data' => Ingredient::orderBy('name')->get()]);
        }
        $ingredients = Ingredient::latest()->paginate(10);
        return response()->json($ingredients);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string|max:100',
            'description' => 'nullable|string',
            'image' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('ingredients', 'public');
            $validated['image'] = $path;
        }

        $ingredient = Ingredient::create($validated);

        return response()->json(['message' => 'Ingrediente creado con éxito', 'ingredient' => $ingredient], 201);
    }

    public function show(Ingredient $ingredient)
    {
        return response()->json($ingredient);
    }

    public function update(Request $request, Ingredient $ingredient)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string|max:100',
            'description' => 'nullable|string',
            'image' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('image')) {
            // Eliminar imagen anterior si existe
            if ($ingredient->image) {
                \Storage::disk('public')->delete($ingredient->image);
            }
            $path = $request->file('image')->store('ingredients', 'public');
            $validated['image'] = $path;
        }

        $ingredient->update($validated);

        return response()->json(['message' => 'Ingrediente actualizado con éxito', 'ingredient' => $ingredient]);
    }

    public function destroy(Ingredient $ingredient)
    {
        if ($ingredient->image) {
            \Storage::disk('public')->delete($ingredient->image);
        }
        $ingredient->delete();

        return response()->json(['message' => 'Ingrediente eliminado con éxito']);
    }
}
