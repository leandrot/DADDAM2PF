<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\UserInventory;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class UserInventoryController extends Controller
{
    public function index(Request $request)
    {
        $items = UserInventory::with('ingredient')
            ->where('user_id', $request->user()->id)
            ->orderBy('created_at', 'desc')
            ->paginate(15);

        return response()->json($items);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'ingredient_id' => 'required|exists:ingredients,id',
            'quantity' => 'required|numeric|min:0',
            'unit' => 'required|string|max:50',
            'expiration_date' => 'nullable|date',
            'location' => 'nullable|string|max:255',
        ]);

        $data['user_id'] = $request->user()->id;

        $item = UserInventory::create($data);

        return response()->json($item->load('ingredient'), Response::HTTP_CREATED);
    }

    public function show(UserInventory $userInventory, Request $request)
    {
        $this->authorizeOwner($request->user()->id, $userInventory);

        return response()->json($userInventory->load('ingredient'));
    }

    public function update(Request $request, UserInventory $userInventory)
    {
        $this->authorizeOwner($request->user()->id, $userInventory);

        $data = $request->validate([
            'ingredient_id' => 'required|exists:ingredients,id',
            'quantity' => 'required|numeric|min:0',
            'unit' => 'required|string|max:50',
            'expiration_date' => 'nullable|date',
            'location' => 'nullable|string|max:255',
        ]);

        $userInventory->update($data);

        return response()->json($userInventory->load('ingredient'));
    }

    public function destroy(UserInventory $userInventory, Request $request)
    {
        $this->authorizeOwner($request->user()->id, $userInventory);

        $userInventory->delete();

        return response()->noContent();
    }

    private function authorizeOwner(int $userId, UserInventory $inventory): void
    {
        if ($inventory->user_id !== $userId) {
            abort(Response::HTTP_FORBIDDEN, 'No autorizado');
        }
    }
}
