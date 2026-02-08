<?php

use App\Http\Controllers\IngredientsController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StoreController;
use App\Http\Controllers\UserInventoryController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    Route::get('/api/user', function (Illuminate\Http\Request $request) {
            return $request->user();
        }
        );

        Route::get('/profile', [ProfileController::class , 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class , 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class , 'destroy'])->name('profile.destroy');

        // API Routes via Resource Controllers (returning JSON)
        Route::prefix('api')->group(function () {
            Route::resource('ingredients', IngredientsController::class);
            Route::resource('inventory', UserInventoryController::class);
            Route::resource('stores', StoreController::class);
        }
        );

        Route::get('/api/dashboard/stats', [\App\Http\Controllers\DashboardController::class , 'stats']);
    });

require __DIR__ . '/auth.php';

// React Catch-all Route for SPA
Route::get('/{any}', function () {
    return view('app');
})->where('any', '.*');
