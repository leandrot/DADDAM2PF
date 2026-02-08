<?php

use App\Http\Controllers\Api\IngredientsController;
use App\Http\Controllers\Api\StoreController;
use App\Http\Controllers\Api\UploadController;
use App\Http\Controllers\Api\UserInventoryController;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('register', [AuthController::class, 'register']);
Route::post('login',    [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('user', function (Request $request) {
        return $request->user();
    });
    Route::apiResource('api-ingredients', IngredientsController::class);
    Route::apiResource('api-user-inventory', UserInventoryController::class);
    Route::apiResource('api-stores', StoreController::class);
    Route::post('uploads', [UploadController::class, 'store']);
});
