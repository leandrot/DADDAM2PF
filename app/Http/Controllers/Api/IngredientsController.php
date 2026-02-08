<?php

namespace App\Http\Controllers\Api;

use App\Models\Ingredient;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class IngredientsController extends Controller
{
    public function index()
    {
        // Paginado; cambiar a ->get() si se prefieren todos
        return response()->json(Ingredient::paginate(15));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255|unique:ingredients',
            'category' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|string',
        ]);

        $ingredient = Ingredient::create($data);

        return response()->json($ingredient, Response::HTTP_CREATED);
    }

    public function show(Ingredient $ingredient)
    {
        return response()->json($ingredient);
    }

    public function update(Request $request, Ingredient $ingredient)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255|unique:ingredients,name,' . $ingredient->id,
            'category' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|string',
        ]);

        $ingredient->update($data);

        return response()->json($ingredient);
    }

    public function destroy(Ingredient $ingredient)
    {
        $ingredient->delete();

        return response()->noContent(); // 204
    }
}
