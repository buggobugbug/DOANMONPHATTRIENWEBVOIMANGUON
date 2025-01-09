<?php

use Illuminate\Http\Request;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ManufacturerController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\GiohangController;

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


// Route liên quan đến người dùng
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/users', [UserController::class, 'index']);
    Route::post('/users', [UserController::class, 'store']);
    Route::get('/users/{id}', [UserController::class, 'show']);
    Route::post('/users/update/{id}', [UserController::class, 'update']);
    Route::delete('/users/{id}', [UserController::class, 'destroy']);
});

// Route liên quan đến giỏ hàng
Route::prefix('giohang')->group(function () {
    Route::get('/{manguoidung}', [GiohangController::class, 'index']); // Lấy giỏ hàng
    Route::post('/', [GiohangController::class, 'store']); // Thêm vào giỏ hàng
    Route::put('/{id}', [GiohangController::class, 'update']); // Cập nhật số lượng
    Route::delete('/{id}', [GiohangController::class, 'destroy']); // Xóa khỏi giỏ hàng
});
