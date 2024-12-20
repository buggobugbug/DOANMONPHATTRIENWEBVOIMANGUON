<?php

use Illuminate\Http\Request;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ManufacturerController;
use App\Http\Controllers\ProductController;

// Route đăng ký
Route::post('/register', [AuthController::class, 'register']);

// Route đăng nhập
Route::post('/login', [AuthController::class, 'login']);

// Route đăng xuất (yêu cầu token xác thực)
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::get('/admin/dashboard', [AdminController::class, 'dashboard']);
});


// CÁC ROUTE LIÊN QUAN ĐẾN SẢN PHẨM
Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::apiResource('categories', CategoryController::class);
    Route::apiResource('manufacturers', ManufacturerController::class);
    Route::apiResource('products', ProductController::class);
});

Route::get('categories', [CategoryController::class, 'index']);
Route::get('manufacturers', [ManufacturerController::class, 'index']);
Route::get('products', [ProductController::class, 'index']);
Route::get('products/{id}', [ProductController::class, 'show']);
