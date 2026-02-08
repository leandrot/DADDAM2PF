<?php

namespace App\Http\Controllers;

use App\Models\Store;
use Illuminate\Http\Request;

class StoreController extends Controller
{
    public function index(Request $request)
    {
        if ($request->has('all')) {
            return response()->json(['data' => Store::all()]);
        }
        $stores = Store::latest()->paginate(10);
        return response()->json($stores);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'required|string|max:500',
            'latitude' => 'required|numeric|between:-90,90',
            'longitude' => 'required|numeric|between:-180,180',
            'schedule' => 'nullable|string',
            'description' => 'nullable|string',
        ]);

        $store = Store::create($validated);

        return response()->json(['message' => 'Tienda creada con éxito', 'store' => $store], 201);
    }

    public function show(Store $store)
    {
        return response()->json($store);
    }

    public function update(Request $request, Store $store)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'required|string|max:500',
            'latitude' => 'required|numeric|between:-90,90',
            'longitude' => 'required|numeric|between:-180,180',
            'schedule' => 'nullable|string',
            'description' => 'nullable|string',
        ]);

        $store->update($validated);

        return response()->json(['message' => 'Tienda actualizada con éxito', 'store' => $store]);
    }

    public function destroy(Store $store)
    {
        $store->delete();

        return response()->json(['message' => 'Tienda eliminada con éxito']);
    }
}