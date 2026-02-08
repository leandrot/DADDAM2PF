<?php

namespace App\Http\Controllers;

use App\Models\Ingredient;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class DashboardController extends Controller
{
    /**
     * Get dashboard statistics.
     */
    public function stats(Request $request): JsonResponse
    {
        return response()->json([
            'ingredients_count' => Ingredient::count(),
            'inventory_count' => \App\Models\UserInventory::where('user_id', $request->user()->id)->count(),
            'stores_count' => \App\Models\Store::count(),
        ]);
    }
}
