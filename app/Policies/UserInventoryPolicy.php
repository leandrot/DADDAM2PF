<?php

namespace App\Policies;

use App\Models\User;
use App\Models\UserInventory;

class UserInventoryPolicy
{
    public function viewAny(User $user): bool
    {
        return true; // Permitir ver el listado propio
    }

    public function view(User $user, UserInventory $userInventory): bool
    {
        return $userInventory->user_id === $user->id;
    }

    public function create(User $user): bool
    {
        return true; // Permitir crear
    }

    public function update(User $user, UserInventory $userInventory): bool
    {
        return $userInventory->user_id === $user->id;
    }

    public function delete(User $user, UserInventory $userInventory): bool
    {
        return $userInventory->user_id === $user->id;
    }

    public function restore(User $user, UserInventory $userInventory): bool
    {
        return $userInventory->user_id === $user->id;
    }

    public function forceDelete(User $user, UserInventory $userInventory): bool
    {
        return $userInventory->user_id === $user->id;
    }
}
