<?php

namespace App\Http\Controllers;

use App\Models\UserInventory;
use App\Models\Ingredient;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;

class UserInventoryController extends Controller
{

    use AuthorizesRequests;

    public function index()
    {
        $inventory = UserInventory::with('ingredient')
            ->where('user_id', auth()->id())
            ->latest()
            ->paginate(10);

        return response()->json($inventory);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'ingredient_id' => 'required|exists:ingredients,id',
            'quantity' => 'required|numeric|min:0',
            'unit' => 'required|string|max:50',
            'expiration_date' => 'nullable|date|after:today',
            'location' => 'nullable|string|max:100',
        ]);

        $validated['user_id'] = auth()->id();

        $inventory = UserInventory::create($validated);

        return response()->json(['message' => 'Ingrediente agregado al inventario', 'inventory' => $inventory], 201);
    }

    public function show(UserInventory $inventory)
    {
        $this->authorize('view', $inventory);
        return response()->json($inventory->load('ingredient'));
    }

    public function update(Request $request, UserInventory $inventory)
    {
        $this->authorize('update', $inventory);

        $validated = $request->validate([
            'ingredient_id' => 'required|exists:ingredients,id',
            'quantity' => 'required|numeric|min:0',
            'unit' => 'required|string|max:50',
            'expiration_date' => 'nullable|date',
            'location' => 'nullable|string|max:100',
        ]);

        $inventory->update($validated);

        return response()->json(['message' => 'Inventario actualizado', 'inventory' => $inventory]);
    }

    public function destroy(UserInventory $inventory)
    {
        $this->authorize('delete', $inventory);

        $inventory->delete();

        return response()->json(['message' => 'Elemento eliminado del inventario']);
    }
}
