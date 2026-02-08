<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Store;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class StoreController extends Controller
{
    public function index()
    {
        // Lista paginada de tiendas
        return response()->json(Store::paginate(15));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name'        => 'required|string|max:255',
            'description' => 'nullable|string',
            'address'     => 'required|string|max:255',
            'latitude'    => 'required|numeric|between:-90,90',
            'longitude'   => 'required|numeric|between:-180,180',
            'schedule'    => 'nullable|string',
        ]);

        $store = Store::create($data);

        return response()->json($store, Response::HTTP_CREATED);
    }

    public function show(Store $store)
    {
        return response()->json($store);
    }

    public function update(Request $request, Store $store)
    {
        $data = $request->validate([
            'name'        => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'address'     => 'sometimes|required|string|max:255',
            'latitude'    => 'sometimes|required|numeric|between:-90,90',
            'longitude'   => 'sometimes|required|numeric|between:-180,180',
            'schedule'    => 'nullable|string',
        ]);

        $store->update($data);

        return response()->json($store);
    }

    public function destroy(Store $store)
    {
        $store->delete();

        return response()->noContent();
    }
}
