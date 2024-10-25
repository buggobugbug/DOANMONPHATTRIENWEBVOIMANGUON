<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

// API LẤY THÔNG TIN SẢN PHẨM THEO ID
use App\Http\Controllers\SanPhamController;

Route::apiResource('san_pham', SanPhamController::class);


// ĐĂNG KÝ ĐĂNG NHẬP API
use App\Http\Controllers\AuthController;

Route::post('/register', [AuthController::class, 'register']); // Đăng ký
Route::post('/login', [AuthController::class, 'login']); // Đăng nhập
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum'); // Đăng xuất
