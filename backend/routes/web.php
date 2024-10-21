<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SanPhamController;

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

// Yêu cầu xác thực (nếu có)
require __DIR__.'/auth.php';

// Route cho CRUD sản phẩm
Route::get('/', [SanPhamController::class, 'showIndex']);  // Trang chủ hiển thị sản phẩm
Route::get('/san_pham/create', [SanPhamController::class, 'create']); // Trang tạo sản phẩm
Route::post('/san_pham', [SanPhamController::class, 'store']); // Tạo sản phẩm mới
Route::get('/san_pham/{id}/edit', [SanPhamController::class, 'edit']); // Trang chỉnh sửa sản phẩm
Route::put('/san_pham/{id}', [SanPhamController::class, 'update']); // Cập nhật sản phẩm
Route::delete('/san_pham/{id}', [SanPhamController::class, 'destroy']); // Xóa sản phẩm

// Route cho API lấy sản phẩm
Route::get('/api/san_pham', [SanPhamController::class, 'index']); // API lấy danh sách sản phẩm
